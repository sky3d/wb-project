# WB-Project

![Develop Build Status](https://github.com/sky3d/wb-project/actions/workflows/push-pr-develop.yml/badge.svg?branch=develop)

[Server API](https://github.com/sky3d/wb-project/blob/develop/server/README.md)

## How to run

first lunch envioroment

`yarn env:up`

then compile server and run
`yarn compile`
`yarn dev`

### Server

build `yarn build:server` or `yarn:compile`

start `yarn start:server` or `yarn dev`

## Migrations

yarn env:up
yarn compile
yarn dev

Make models changes

yarn compile

Then generate migration
`yarn migration:generate -n <name>`

Create migration
`yarn migration:create -n <name>`
