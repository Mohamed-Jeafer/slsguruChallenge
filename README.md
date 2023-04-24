
# Serverless Guru Challenge | AWS API Gateway CRUD REST API

This repository has been set up as a REST API Endpoint that can be called by consumer lambdas to create, read, update and delete notes.

The requirements for the developed functions can be found in this [code challenge](https://github.com/serverless-guru/code-challenges/tree/master/code-challenge-5).

## Features

The developed /create endpoint will create a new note and save it into the Note DynamoDB Table.

The `/update/{id}` endpoint will update an existing note based on the ID provided.

The `/read/{id}` endpoint will fetch existing notes based on the ID provided.

The `/delete/{id}` endpoint will delete an existing note based on the ID provided.

The `/readAll` endpoint will fetch all the notes saved in the table.

## Dependencies

The current developed code does not have any external dependencies.
 Internal dependencies are:

- Node version: `>=14.15.1`
- NPM version: `>=6.10.0`

The APIs are publicly accessible without VPC constraints, or any other form of authentications.

## Getting started

- Run the CI/CD pipeline.
- Call the API using the endpoints shown in the pipeline.

## How to call Notes API?

### Request Parameters:

#### create

`/create` is a POST endpoint does not require and path parameters or query parameters, however, the user will need to provide the following 2 properties in the body:

| **Property Name** | **Definition** |
| --- | --- |
| title | Title of the note |
| content | The actual note that is being stored |

An error will be thrown if any of the title or content are not provided.

Example request: `/create`

    {
        "body": "{\"title\":\"Shopping List\",\"content\":\"clothes\"}"
    }

#### delete

`/delete/{id}` is a delete endpoint that requires path parameters to have the ID of the note that is to be deleted.

| **Path Parameter** | **Definition** |
| --- | --- |
| id | A UUID of the note that needs to be deleted |

An error will be thrown if any of the ID is missing or invalid.

Example request: `/delete/e11bb6c9-e437-43dc-8805-12a19e5e1b23`

#### update

`/update/{id}` is a PUT endpoint does require both path parameters and body. The body is required to have both parameters, title and content.

| **Property Name** | **Definition** |
| --- | --- |
| title | Title of the note |
| content | The actual note that is being stored |

| **Path Parameter** | **Definition** |
| --- | --- |
| id | A UUID of the note that needs to be updated |

An error will be thrown if any of the title or content are not provided.

Example request: `/update/e11bb6c9-e437-43dc-8805-12a19e5e1b23`

    {
        "body": "{\"title\":\"new Shopping list\",\"content\":\"new clothes\"}"
    }

#### read

`/read/{id}` is a GET endpoint that requires path parameters to have the ID of the note that is to be fetched.

| **Path Parameter** | **Definition** |
| --- | --- |
| id | A UUID of the note that needs to be deleted |

An error will be thrown if any of the ID is missing or invalid.

Example request: `/read/e11bb6c9-e437-43dc-8805-12a19e5e1b23`

#### readAll

`/readAll/` is a GET endpoint that does not require any params.

An error will be thrown if the table is empty.

Example request: `/readAll`

### Response Body Structure:

After calling and  **awaiting**  for the API call, it will the following response:

#### Create

    {
        "title": "Shopping List",
        "content": "Banana",
        "id": "35460adf-983d-4673-a59e-fc8484043628"
    }

#### Read

    {
        "title": "Shopping List",
        "content": "Banana"
    }

#### Update

    {
        "title": "New Shopping List",
        "content": "Oranges",
        "createdAt": "2023-04-23T20:29:44.155Z",
        "id": "35460adf-983d-4673-a59e-fc8484043628",
        "updatedAt": "2023-04-23T20:39:32.297Z"
    }

#### Delete

    {
        "message": "Note deleted successfully"
    }

#### ReadAll

    [
      {
        "title": "New Shopping List",
        "content": "Oranges",
        "createdAt": "2023-04-23T20:29:44.155Z",
        "id": "35460adf-983d-4673-a59e-fc8484043628",
        "updatedAt": "2023-04-23T20:39:32.297Z"
      }
    ]

Each of the returned object may contain the following information:

| **Parameter Name** | **Definition** |
| --- | --- |
| title | String, The title of the note |
| content | String, the content of the note |
| id | String, a UUID id |
| message | Confirmation of the deleted note |

### Possible Responses:

These are the possible responses that can be returned by this API Endpoint.

#### Successful Execution:

This response will be returned after successful execution of the API Call.

- Status Code: 200 or 201 (for created note)
- Body: Stringified response objects. (As represented in _Response Body Structure_)

#### Item Not Found:

This response will be returned on the following conditions:

- Item being read is not found.
- Item being updated is not found.
- Item being deleted is not found.
- Table not found – incase if the table was accidentally deleted.

such as:
- Status Code: 404
- Body: Stringified Object: {"Message":"Item not found "}

#### Bad Request:

This response will be returned when the request does not match the expected format.

- Status Code: 400
- Body: Stringified Object: {"Message":"Missing body"}

These are the possible error messages:

- Missing body.
- Missing title or content.
- Missing path Parameters.
- Invalid ID.
- Unable to delete note.

#### Unexpected Error / Internal server error:

This response will be returned when an unexpected error happens.

- Status Code: 500
- Body: Stringified Object: {"Message":"Something went wrong, please try again later."}

These are the possible error messages:

- Unable to delete note.
- Unable to read note.
- Unable to update note.
- Unable to create note.
- Unable to retrieve the notes.
- Something went wrong, please try again later.

# Basic Example:

    import  axios  from  "axios";
     
    const  createNoteURL = ""; // Service Endpoint
    const  title = ""; // Title of the note
    const  content = ""; // content of the note
    
    const  config = {
    method:  "post",
    url:  createNoteURL,
    headers: {},
    };
    
    const  body = { title, content };
    const  response = await  axios.post(config, body);
    
    console.log(response.data);
