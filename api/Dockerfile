# the different stages of this Dockerfile are meant to be built into separate images
# https://docs.docker.com/compose/compose-file/#target

ARG PHP_VERSION=7.2
ARG NGINX_VERSION=1.15
ARG VARNISH_VERSION=6.0

FROM php:${PHP_VERSION}-fpm-alpine AS api_platform_php

ENV http_proxy=http://CptLinuxWeb:LinuxWeb@bdx2-tt-proxy.tessi-techno.fr:3128
ENV https_proxy=http://CptLinuxWeb:LinuxWeb@bdx2-tt-proxy.tessi-techno.fr:3128
ENV HTTP_PROXY=http://CptLinuxWeb:LinuxWeb@bdx2-tt-proxy.tessi-techno.fr:3128
ENV HTTPS_PROXY=http://CptLinuxWeb:LinuxWeb@bdx2-tt-proxy.tessi-techno.fr:3128
ENV HTTP_PROXY_REQUEST_FULLURI=false
ENV NO_PROXY=127.0.0.1

# persistent / runtime deps
RUN apk add --no-cache \
		acl \
		file \
		gettext \
		git \
		postgresql-client \
	;

ARG APCU_VERSION=5.1.12

RUN apk add --no-cache --virtual .build-deps \
		$PHPIZE_DEPS \
		icu-dev \
		libzip-dev \
		postgresql-dev \
		zlib-dev \
	; \
	\
	docker-php-ext-configure zip --with-libzip; \
	docker-php-ext-install -j$(nproc) \
		intl \
		pdo_pgsql \
		zip \
	; \
	set -eux; \
	pear config-set http_proxy http://CptLinuxWeb:LinuxWeb@bdx2-tt-proxy.tessi-techno.fr:3128; \
	pear  upgrade --force; \
#	pear channel-update pear.php.net; \
#	pecl channel-update ppecl.php.net; \
	pecl install \
		 apcu-${APCU_VERSION} \
	; \
	pecl clear-cache; \
	docker-php-ext-enable \
		apcu \
		opcache \
	; \
	\
	runDeps="$( \
		scanelf --needed --nobanner --format '%n#p' --recursive /usr/local/lib/php/extensions \
			| tr ',' '\n' \
			| sort -u \
			| awk 'system("[ -e /usr/local/lib/" $1 " ]") == 0 { next } { print "so:" $1 }' \
	)"; \
	apk add --no-cache --virtual .api-phpexts-rundeps $runDeps; \
	\
	apk del .build-deps

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
COPY docker/php/php.ini /usr/local/etc/php/php.ini

# https://getcomposer.org/doc/03-cli.md#composer-allow-superuser
ENV COMPOSER_ALLOW_SUPERUSER=1
RUN set -eux; \
    export HTTP_PROXY_REQUEST_FULLURI=true; \
    export HTTPS_PROXY_REQUEST_FULLURI=false; \
	composer global require "hirak/prestissimo:^0.3" --prefer-dist --no-progress --no-suggest --classmap-authoritative; \
	composer clear-cache
ENV PATH="${PATH}:/root/.composer/vendor/bin"

WORKDIR /srv/api

# build for production
ARG APP_ENV=prod

# prevent the reinstallation of vendors at every changes in the source code
COPY composer.json composer.lock ./
RUN set -eux; \
	composer install --prefer-dist --no-dev --no-autoloader --no-scripts --no-progress --no-suggest; \
	composer clear-cache

COPY . ./

RUN set -eux; \
	mkdir -p var/cache var/log; \
	composer dump-autoload --classmap-authoritative --no-dev; \
	composer run-script --no-dev post-install-cmd; \
	chmod +x bin/console; sync
VOLUME /srv/api/var

COPY docker/php/docker-entrypoint.sh /usr/local/bin/docker-entrypoint
RUN chmod +x /usr/local/bin/docker-entrypoint

ENTRYPOINT ["docker-entrypoint"]
CMD ["php-fpm"]

FROM nginx:${NGINX_VERSION}-alpine AS api_platform_nginx

COPY docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

WORKDIR /srv/api

COPY --from=api_platform_php /srv/api/public public/

FROM cooptilleuls/varnish:${VARNISH_VERSION}-alpine AS api_platform_varnish

COPY docker/varnish/conf/default.vcl /usr/local/etc/varnish/default.vcl
