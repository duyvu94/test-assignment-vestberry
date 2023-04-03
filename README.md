# Book Catalogue Backend

A Node.js backend application for a book catalogue, using a PostgreSQL database and GraphQL for communication.

## Features and Data Requirements:

This application provides the following functionalities with the corresponding data requirements:

* User authentication (login and registration)
* Add, edit, and delete books - authentication needed
* View older states of a book (query a book update history and revert a book to an older state) - authentication needed
* Search books by author name or book title - no authentication needed.

## Postman Collection:

A Postman collection file, `graphql.postman_collection.json`, is included in the project root directory. This collection provides a convenient way to test the GraphQL queries and mutations.

The collection is organized into two folders: `Auth` and `NoAuth`. To test the authenticated requests:

1. Run the login request in the `NoAuth` folder.
2. Copy the access token from the response.
3. Paste the access token into the Bearer token field for the requests in the `Auth` folder.
With the access token set, you can now run all the requests in the `Auth` folder.

## Running the Project
1. Install the project dependencies by running:
```
yarn
```
2. Copy the `.env.example` file to `.env` and update the configuration settings as needed.
3. Optional: If you want to use Docker for the database, start the Docker database by running:
```
yarn db:start
```
4. Apply the database migrations by running:
```
yarn db:migrate
```
5. Start the development server by running:
```
yarn start
```
The server will be available at localhost:8000 and you can access GraphiQL at http://localhost:8000/graphql.

## Scripts

You can also use the following scripts to manage the project:

|`yarn <script>`        |Description|
|-----------------------|-----------|
|`start`                |Serves your app at `localhost:8000`|
|`db:start`             |Starts the Docker database container|
|`db:stop`              |Stops the Docker database container|
|`db:clear`             |Stops and removes the Docker database container with volumes|
|`migrate`              |Runs database migrations|
|`migrate:undo`         |Reverts all database migrations|
|`test`                 |Runs Jest tests|
|`build`                |Compiles TypeScript code|
|`lint`                 |[Lints](http://stackoverflow.com/questions/8503559/what-is-linting) the project for potential errors|
|`lint:fix`             |Lints the project and [fixes all correctable errors](http://eslint.org/docs/user-guide/command-line-interface.html#fix)|
