FROM node:10.9-alpine

ENV http_proxy=http://CptLinuxWeb:LinuxWeb@LYO1-TT-SQUID.tessi-techno.fr:3128
ENV https_proxy=http://CptLinuxWeb:LinuxWeb@LYO1-TT-SQUID.tessi-techno.fr:3128
ENV HTTP_PROXY=http://CptLinuxWeb:LinuxWeb@LYO1-TT-SQUID.tessi-techno.fr:3128
ENV HTTPS_PROXY=http://CptLinuxWeb:LinuxWeb@LYO1-TT-SQUID.tessi-techno.fr:3128
ENV NO_PROXY=127.0.0.

RUN mkdir -p /usr/src/client

WORKDIR /usr/src/client

RUN yarn global add @api-platform/client-generator

# Prevent the reinstallation of node modules at every changes in the source code
COPY package.json yarn.lock ./
RUN yarn install

COPY . ./

CMD CHOKIDAR_USEPOLLING=true yarn start