# TechLog - Server

Server Framework: [Express](https://www.npmjs.com/package/express)
Database Framework: [Mongoose](https://www.npmjs.com/package/mongoose)
Database: Mongodb

## Setup

**Install dependencies**

```zsh
npm install
```

**.env setup** in a local .env setup the following variables for your machine (replace ? symbols)

```.env
PORT=?
HOST=?
MONGO_URL=?
MONGO_REPORTS=?
```

## REST API

### Reports `/reports`

Report Schema:

```json
{
  "_id": uuid
  "reportId": number,
  "title": string,
	"description": string,
	"tags": string[],
	"steps": string[]
	"images": string[]
}
```

- `GET /reports` - Array of all reports
- `GET /reports/:id` - Single Report by ID
- `POST /reports` - Post Report, return posted report
- `PUT /reports` - update report
- `DELETE /reports/:id` - delete report by ID, return deleted report.

