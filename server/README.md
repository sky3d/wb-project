# wb-project

Project-R

### Build server

`npm run build`

### Run server

`npm start`

###

PORT: default 3000

### Routes

Prefix `http://localhost:3000`

| action | method | route     |
| ------ | ------ | --------- |
| health | GET    | `/health` |
| stats  | GET    | `/stats`  |

#### Renga

| action | method | route                   |
| ------ | ------ | ----------------------- |
| create | POST   | `/api/renga`            |
| update | POST   | `/api/renga/:id`        |
| list   | GET    | `/api/renga/list`       |
| verses | GET    | `/api/renga/:id/verses` |

#### Verse

| action | method | route            |
| ------ | ------ | ---------------- |
| create | POST   | `/api/verse`     |
| update | POST   | `/api/verse/:id` |
| remove | DELETE | `/api/verse/:id` |

#### Variant

| action | method | route          |
| ------ | ------ | -------------- |
| create | POST   | `/api/variant` |
