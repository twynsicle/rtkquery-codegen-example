# Code Generation in React with RTK Query

An example repository demonstrating the code generation capabilities of RTK Query.
For more information, see the accompanying blog post here: (add link)

### Tools
Server
* FastAPI
* MySQL
* Docker
* Docker-compose

Frontend
* React
* Redux Toolkit
* RTK Query
* Jest
* Vite

Code generation is performed using the `@rtk-query/codegen-openapi` package.

### Getting Started

The server is hosted at `localhost:8000`
```
cd server
docker-compose up --build
```

The frontend is hosted at `localhost:5173`
```
npm install
npm run start
```

To regenerate the code generation
```
npm run generate-client
```

To run the tests
Coverage is output to `/coverage`
```
npm run test
```

