# WB-Project

![Develop Build Status](https://github.com/sky3d/wb-project/actions/workflows/push-pr-develop.yml/badge.svg?branch=develop)

## How to run

first lunch envioroment

`yarn env:up`

then compile server and run 
`yarn compile`
`yarn dev`

### Server

build `yarn compile`

start `yarn start:server`

## Migrations

Generate migration
`yarn migration:generate -n <name>`

Create migration
`yarn migration:create -n <name>`
