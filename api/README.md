Run project in development mode:

```bash
npm run start:dev
```

Lint code:

```bash
npm run lint -- --fix
```

Run unit tests

```bash
npm run test
```

Compile typescript:

```bash
npm run build
```

Run in production mode:

```bash
npm run start
```

Strucure description:

- ./config/common.yml: config for project:
  - Add clientSecret, clientId and tenantId for database connection
  - Add applicationinsights.connectionString for Application Insights logging
- ./src/adapters/: Add adapters for 3rd party services (database, keyvault, applicationinsights, blobStorage, etc.)
- ./src/api/: API code here
- ./src/api/index.ts: register routes in express app here, example (/user, /compare)
- ./src/api/routes/: register endpoint routes here. Create a file for each endpoint and register the http metods. Example (GET /dummy/:id, POST /dummy, etc.)
- ./src/api/services: register bussiness logic for each route here, create a service file for each route file. Example (./src/api/services/dummy.ts containes bussiness logic for /dummy http calls)
- ./src/lib/: Add utilily helpers here.
- ./src/models/: Add classes, interfaces and objects for data models here
- ./tests/: Add unit tests here
