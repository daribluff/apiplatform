FROM node:10.9-alpine

ENV http_proxy=http://CptLinuxWeb:LinuxWeb@bdx2-tt-proxy.tessi-techno.fr:3128
ENV https_proxy=http://CptLinuxWeb:LinuxWeb@bdx2-tt-proxy.tessi-techno.fr:3128
ENV HTTP_PROXY=http://CptLinuxWeb:LinuxWeb@bdx2-tt-proxy.tessi-techno.fr:3128
ENV HTTPS_PROXY=http://CptLinuxWeb:LinuxWeb@bdx2-tt-proxy.tessi-techno.fr:3128
ENV NO_PROXY=127.0.0.

RUN mkdir -p /usr/src/admin

WORKDIR /usr/src/admin

# Prevent the reinstallation of node modules at every changes in the source code
COPY package.json yarn.lock ./
RUN yarn install

COPY . ./

CMD yarn start
