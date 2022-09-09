<!-- PROJECT LOGO -->
<br />
<div align="center">
    <h3 align="center">DRIVENPASS - API DOCUMENTATION</h3>
  <p>
    Back-end Development Project for Driven Bootcamp course
    <br />
    <a href="https://github.com/MileneGJ/projeto19-drivenpass/blob/main/src/index.ts"><strong>Browse TypeScript code»</strong></a>
</div>

<div align="center">
  <h3>Built With</h3>

  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  
</div>

<!-- Table of Contents -->

# Table of Contents

- [Getting Started](#getting-started)
  - [Database](#database)
- [API Reference](#api-reference)
  - [Routes](#routes)
    - [Authentication](#authentication)
    - [Credentials](#credentials)
    - [Secure notes](#secure-notes)
    - [Cards](#cards)
    - [Wifi networks](#wifi-networks)
    - [Documents](#documents)

<!-- Getting Started -->

# Getting Started

This Api can be used in two different ways: by cloning the project or by running in your preferred client, such as [Insomnia](https://insomnia.rest/) or [Postman](https://www.getpostman.com/).

To clone the project, run the following command:

```git
git clone https://github.com/MileneGJ/projeto19-drivenpass.git
```

Then, navigate to the project folder and run the following command:

```git
npm install
```

Finally, start the server:

```git
npm start
```

You can now access the API's endpoints by navigating to `http://localhost:5000/` or the deployed version on `https://drivenpass-backend.herokuapp.com/`

<!-- Database -->

# Database

This project used as reference a postgres database created using Prisma. You can refer to <a href="https://github.com/MileneGJ/projeto19-drivenpass/blob/main/prisma/schema.prisma"><strong>this file</strong></a> to see the database structure

<!-- API Reference -->

# API Reference

In this section, you will find the API's endpoints and their descriptions, along with the request and response examples. All data is sent and received as JSON.

<!-- Routes -->

## Routes

### [Authentication](#authentication) _`/signup`_ or _`/signin`_

- [Create a new account](#---create-a-new-account)
- [Login with created account](#---login-with-created-account)

### [Credentials](#credentials) _`/credentials`_

- [Insert a credential](#---insert-a-credential)
- [List your credentials](#---list-your-credentials)
- [Get a credential](#---get-a-credential)
- [Delete a credential](#---delete-a-credential)

### [Secure notes](#secure-notes) _`/annotations`_

- [Insert an annotation](#---insert-an-annotation)
- [List your annotations](#---list-your-annotations)
- [Get an annotation](#---get-an-annotation)
- [Delete an annotation](#---delete-an-annotation)

### [Cards](#cards) _`/cards`_

- [Insert a card](#---insert-a-card)
- [List your cards](#---list-your-cards)
- [Get a card](#---get-a-card)
- [Delete a card](#---delete-a-card)

### [Wifi networks](#wifi-networks) _`/wifis`_

- [Insert a wifi](#---insert-a-wifi)
- [List your wifis](#---list-your-wifis)
- [Get a wifi](#---get-a-wifi)
- [Delete a wifi](#---delete-a-wifi)

### [Documents](#documents) _`/documents`_

- [Insert a document](#---insert-a-document)
- [List your documents](#---list-your-documents)
- [Get a document](#---get-a-document)
- [Delete a document](#---delete-a-document)



## Authentication

### Create a new account

###### POST _`/signup`_

#### Request

###### Body

```json
{
  "email": "john@mail.com",
  "password": "1234567890"
}
```

###### Headers

```json
{
  "Content-Type": "application/json"
}
```


#### Responses

| Status Code |      Description      |      Properties      |
| :---------: | :-------------------: | :------------------: |
|   **201**   |        Created        |      `data: {}`      |
|   **409**   |       Conflict        | `error: { message }` |
|   **422**   |     Invalid Input     | `error: { message }` |
|   **500**   | Internal Server Error | `error: { message }` |



### Login with created account

###### POST _`/signin`_

#### Request

###### Body

```json
{
  "email": "john@mail.com",
  "password": "1234567890"
}
```

###### Headers

```json
{
  "Content-Type": "application/json"
}
```


#### Responses

| Status Code |      Description      |      Properties      |
| :---------: | :-------------------: | :------------------: |
|   **200**   |           OK          |  `data: {my-token}`  |
|   **401**   |      Unauthorized     | `error: { message }` |
|   **422**   |     Invalid Input     | `error: { message }` |
|   **500**   | Internal Server Error | `error: { message }` |




## Credentials

### Insert a credential

###### POST _`/credentials`_

#### Request

###### Body

```json
{
  "title": "My website",
  "url": "https://www.mywebsite.com",
  "username": "john",
  "password": "1234"
}
```

###### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer my-token"
}
```


#### Responses

| Status Code |      Description      |      Properties      |
| :---------: | :-------------------: | :------------------: |
|   **201**   |        Created        |      `data: {}`      |
|   **401**   |      Unauthorized     | `error: { message }` |
|   **404**   |       Not Found       | `error: { message }` |
|   **409**   |       Conflict        | `error: { message }` |
|   **422**   |     Invalid Input     | `error: { message }` |
|   **500**   | Internal Server Error | `error: { message }` |



### List your credentials

###### GET _`/credentials`_

#### Request

###### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer my-token"
}
```


#### Responses

| Status Code |      Description      |        Properties       |
| :---------: | :-------------------: |   :------------------:  |
|   **200**   |           OK          |`data: {credentialArray}`|
|   **401**   |      Unauthorized     |   `error: { message }`  |
|   **404**   |       Not Found       |   `error: { message }`  |
|   **409**   |       Conflict        |   `error: { message }`  |
|   **422**   |     Invalid Input     |   `error: { message }`  |
|   **500**   | Internal Server Error |   `error: { message }`  |

Obs.: credentialArray will return the following structure:
```json
[
    {
        "id":1,
        "title": "My website",
        "url": "https://www.mywebsite.com",
        "username": "john",
        "password": "1234"
    }
    ,
    {
        "id":2,
        "title": "My second website",
        "url": "https://www.mywebsite2.com",
        "username": "john",
        "password": "1234"
    }
]
```


### Get a credential

###### GET _`/credentials/:credentialId`_

#### Request

###### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer my-token"
}
```

###### Params

```
credentialId:1
```

#### Responses

| Status Code |      Description      |        Properties       |
| :---------: | :-------------------: |   :------------------:  |
|   **200**   |           OK          | `data: {credentialObj}` |
|   **401**   |      Unauthorized     |   `error: { message }`  |
|   **404**   |       Not Found       |   `error: { message }`  |
|   **409**   |       Conflict        |   `error: { message }`  |
|   **422**   |     Invalid Input     |   `error: { message }`  |
|   **500**   | Internal Server Error |   `error: { message }`  |

Obs.: credentialObj will return the following structure:
```json
{
    "id":1,
    "title": "My website",
    "url": "https://www.mywebsite.com",
    "username": "john",
    "password": "1234"
}

```


### Delete a credential

###### DELETE _`/credentials/:credentialId`_

#### Request

###### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer my-token"
}
```

###### Params

```
credentialId:1
```


#### Responses

| Status Code |      Description      |        Properties       |
| :---------: | :-------------------: |   :------------------:  |
|   **204**   |       No Content      |        `data: {}`       |
|   **401**   |      Unauthorized     |   `error: { message }`  |
|   **404**   |       Not Found       |   `error: { message }`  |
|   **409**   |       Conflict        |   `error: { message }`  |
|   **422**   |     Invalid Input     |   `error: { message }`  |
|   **500**   | Internal Server Error |   `error: { message }`  |




## Secure Notes

### Insert an annotation

###### POST _`/annotations`_

#### Request

###### Body

```json
{
  "title": "My note",
  "text": "This is a secure note"
}
```

###### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer my-token"
}
```


#### Responses

| Status Code |      Description      |      Properties      |
| :---------: | :-------------------: | :------------------: |
|   **201**   |        Created        |      `data: {}`      |
|   **401**   |      Unauthorized     | `error: { message }` |
|   **404**   |       Not Found       | `error: { message }` |
|   **409**   |       Conflict        | `error: { message }` |
|   **422**   |     Invalid Input     | `error: { message }` |
|   **500**   | Internal Server Error | `error: { message }` |



### List your annotations

###### GET _`/annotations`_

#### Request

###### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer my-token"
}
```


#### Responses

| Status Code |      Description      |        Properties       |
| :---------: | :-------------------: |   :------------------:  |
|   **200**   |           OK          |`data: {annotationArray}`|
|   **401**   |      Unauthorized     |   `error: { message }`  |
|   **404**   |       Not Found       |   `error: { message }`  |
|   **409**   |       Conflict        |   `error: { message }`  |
|   **422**   |     Invalid Input     |   `error: { message }`  |
|   **500**   | Internal Server Error |   `error: { message }`  |

Obs.: annotationArray will return the following structure:
```json
[
    {
        "id":1,
        "title": "My note",
        "text": "This is a secure note"
    }
    ,
    {
        "id":2,
        "title": "My second note",
        "text": "This is a secure note"
    }
]
```


### Get an annotation

###### GET _`/annotations/:annotationId`_

#### Request

###### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer my-token"
}
```

###### Params

```
annotationId:1
```


#### Responses

| Status Code |      Description      |        Properties       |
| :---------: | :-------------------: |   :------------------:  |
|   **200**   |           OK          | `data: {annotationObj}` |
|   **401**   |      Unauthorized     |   `error: { message }`  |
|   **404**   |       Not Found       |   `error: { message }`  |
|   **409**   |       Conflict        |   `error: { message }`  |
|   **422**   |     Invalid Input     |   `error: { message }`  |
|   **500**   | Internal Server Error |   `error: { message }`  |

Obs.: annotationObj will return the following structure:
```json
{
    "id":1,
    "title": "My note",
    "text": "This is a secure note"
}

```


### Delete an annotation

###### DELETE _`/annotations/:annotationId`_

#### Request

###### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer my-token"
}
```

###### Params

```
annotationId:1
```


#### Responses

| Status Code |      Description      |        Properties       |
| :---------: | :-------------------: |   :------------------:  |
|   **204**   |       No Content      |        `data: {}`       |
|   **401**   |      Unauthorized     |   `error: { message }`  |
|   **404**   |       Not Found       |   `error: { message }`  |
|   **409**   |       Conflict        |   `error: { message }`  |
|   **422**   |     Invalid Input     |   `error: { message }`  |
|   **500**   | Internal Server Error |   `error: { message }`  |




## Cards

### Insert a card

###### POST _`/cards`_

#### Request

###### Body

```json
{
    "title":"My credit card",
    "number":"0000-0000-0000-0000",
    "cardholderName":"JOHN D SMITH",
    "securityCode":"123",
    "expirationDate":"12/30",
    "password":"1234",
    "isVirtual":false,
    "type":"credit"
}
```

###### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer my-token"
}
```


#### Responses

| Status Code |      Description      |      Properties      |
| :---------: | :-------------------: | :------------------: |
|   **201**   |        Created        |      `data: {}`      |
|   **401**   |      Unauthorized     | `error: { message }` |
|   **404**   |       Not Found       | `error: { message }` |
|   **409**   |       Conflict        | `error: { message }` |
|   **422**   |     Invalid Input     | `error: { message }` |
|   **500**   | Internal Server Error | `error: { message }` |



### List your cards

###### GET _`/cards`_

#### Request

###### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer my-token"
}
```


#### Responses

| Status Code |      Description      |        Properties       |
| :---------: | :-------------------: |   :------------------:  |
|   **200**   |           OK          |   `data: {cardArray}`   |
|   **401**   |      Unauthorized     |   `error: { message }`  |
|   **404**   |       Not Found       |   `error: { message }`  |
|   **409**   |       Conflict        |   `error: { message }`  |
|   **422**   |     Invalid Input     |   `error: { message }`  |
|   **500**   | Internal Server Error |   `error: { message }`  |

Obs.: cardArray will return the following structure:
```json
[   
    {
        "id":1,
        "title":"My credit card",
        "number":"0000-0000-0000-0000",
        "cardholderName":"JOHN D SMITH",
        "securityCode":"123",
        "expirationDate":"12/30",
        "password":"1234",
        "isVirtual":false,
        "type":"credit"
    }
    ,
    {
        "id":2,
        "title":"My credit and debit card",
        "number":"0010-0010-0010-0010",
        "cardholderName":"JOHN D SMITH",
        "securityCode":"123",
        "expirationDate":"12/30",
        "password":"1234",
        "isVirtual":true,
        "type":"both"
    }
]
```


### Get a card

###### GET _`/cards/:cardId`_

#### Request

###### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer my-token"
}
```

###### Params

```
cardId:1
```


#### Responses

| Status Code |      Description      |        Properties       |
| :---------: | :-------------------: |   :------------------:  |
|   **200**   |           OK          |    `data: {cardObj}`    |
|   **401**   |      Unauthorized     |   `error: { message }`  |
|   **404**   |       Not Found       |   `error: { message }`  |
|   **409**   |       Conflict        |   `error: { message }`  |
|   **422**   |     Invalid Input     |   `error: { message }`  |
|   **500**   | Internal Server Error |   `error: { message }`  |

Obs.: cardObj will return the following structure:
```json
{
    "id":1,
    "title":"My credit card",
    "number":"0000-0000-0000-0000",
    "cardholderName":"JOHN D SMITH",
    "securityCode":"123",
    "expirationDate":"12/30",
    "password":"1234",
    "isVirtual":false,
    "type":"credit"
}

```


### Delete a card

###### DELETE _`/cards/:cardId`_

#### Request

###### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer my-token"
}
```

###### Params

```
cardId:1
```

#### Responses

| Status Code |      Description      |        Properties       |
| :---------: | :-------------------: |   :------------------:  |
|   **204**   |       No Content      |        `data: {}`       |
|   **401**   |      Unauthorized     |   `error: { message }`  |
|   **404**   |       Not Found       |   `error: { message }`  |
|   **409**   |       Conflict        |   `error: { message }`  |
|   **422**   |     Invalid Input     |   `error: { message }`  |
|   **500**   | Internal Server Error |   `error: { message }`  |




## Wifi networks

### Insert a wifi

###### POST _`/wifis`_

#### Request

###### Body

```json
{
    "title":"My wifi",
    "name":"DT-LINK78234",
    "password":"12345678"
}
```

###### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer my-token"
}
```


#### Responses

| Status Code |      Description      |      Properties      |
| :---------: | :-------------------: | :------------------: |
|   **201**   |        Created        |      `data: {}`      |
|   **401**   |      Unauthorized     | `error: { message }` |
|   **404**   |       Not Found       | `error: { message }` |
|   **409**   |       Conflict        | `error: { message }` |
|   **422**   |     Invalid Input     | `error: { message }` |
|   **500**   | Internal Server Error | `error: { message }` |



### List your wifis

###### GET _`/wifis`_

#### Request

###### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer my-token"
}
```


#### Responses

| Status Code |      Description      |        Properties       |
| :---------: | :-------------------: |   :------------------:  |
|   **200**   |           OK          |   `data: {wifiArray}`   |
|   **401**   |      Unauthorized     |   `error: { message }`  |
|   **404**   |       Not Found       |   `error: { message }`  |
|   **409**   |       Conflict        |   `error: { message }`  |
|   **422**   |     Invalid Input     |   `error: { message }`  |
|   **500**   | Internal Server Error |   `error: { message }`  |

Obs.: wifiArray will return the following structure:
```json
[   
    {
        "id":1,
        "title":"My wifi",
        "name":"DT-LINK78234",
        "password":"12345678"
    }
    ,
    {
        "id":2,
        "title":"My neighbour wifi",
        "name":"DT-LINK78554",
        "password":"12345678"
    }
]
```


### Get a wifi

###### GET _`/wifis/:wifiId`_

#### Request

###### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer my-token"
}
```

###### Params

```
wifiId:1
```


#### Responses

| Status Code |      Description      |        Properties       |
| :---------: | :-------------------: |   :------------------:  |
|   **200**   |           OK          |    `data: {wifiObj}`    |
|   **401**   |      Unauthorized     |   `error: { message }`  |
|   **404**   |       Not Found       |   `error: { message }`  |
|   **409**   |       Conflict        |   `error: { message }`  |
|   **422**   |     Invalid Input     |   `error: { message }`  |
|   **500**   | Internal Server Error |   `error: { message }`  |

Obs.: wifiObj will return the following structure:
```json
{
    "id":1,
    "title":"My wifi",
    "name":"DT-LINK78234",
    "password":"12345678"
}

```


### Delete an wifi

###### DELETE _`/wifis/:wifiId`_

#### Request

###### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer my-token"
}
```

###### Params

```
wifiId:1
```


#### Responses

| Status Code |      Description      |        Properties       |
| :---------: | :-------------------: |   :------------------:  |
|   **204**   |       No Content      |        `data: {}`       |
|   **401**   |      Unauthorized     |   `error: { message }`  |
|   **404**   |       Not Found       |   `error: { message }`  |
|   **409**   |       Conflict        |   `error: { message }`  |
|   **422**   |     Invalid Input     |   `error: { message }`  |
|   **500**   | Internal Server Error |   `error: { message }`  |




## Documents

### Insert a document

###### POST _`/documents`_

#### Request

###### Body

```json
{
    "type": "RG",
    "number":"00000000-0",
    "fullName": "John Smith da Silva",
    "emissionDate": "01/01/2020",
    "expirationDate":"01/01/2030",
    "emissionInstitution":"SSP"
}
```

###### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer my-token"
}
```


#### Responses

| Status Code |      Description      |      Properties      |
| :---------: | :-------------------: | :------------------: |
|   **201**   |        Created        |      `data: {}`      |
|   **401**   |      Unauthorized     | `error: { message }` |
|   **404**   |       Not Found       | `error: { message }` |
|   **409**   |       Conflict        | `error: { message }` |
|   **422**   |     Invalid Input     | `error: { message }` |
|   **500**   | Internal Server Error | `error: { message }` |



### List your documents

###### GET _`/documents`_

#### Request

###### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer my-token"
}
```


#### Responses

| Status Code |      Description      |        Properties       |
| :---------: | :-------------------: |   :------------------:  |
|   **200**   |           OK          | `data: {documentArray}` |
|   **401**   |      Unauthorized     |   `error: { message }`  |
|   **404**   |       Not Found       |   `error: { message }`  |
|   **409**   |       Conflict        |   `error: { message }`  |
|   **422**   |     Invalid Input     |   `error: { message }`  |
|   **500**   | Internal Server Error |   `error: { message }`  |

Obs.: documentArray will return the following structure:
```json
[   
    {
        "id":1,
        "type": "RG",
        "number":"00000000-0",
        "fullName": "John Smith da Silva",
        "emissionDate": "01/01/2020",
        "expirationDate":"01/01/2030",
        "emissionInstitution":"SSP"
    }
    ,
    {
        "id":2,
        "type": "CNH",
        "number":"00000000000000",
        "fullName": "John Smith da Silva",
        "emissionDate": "01/01/2020",
        "expirationDate":"01/01/2030",
        "emissionInstitution":"SSP"
    }
]
```


### Get a document

###### GET _`/documents/:documentId`_

#### Request

###### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer my-token"
}
```

###### Params

```
documentId:1
```


#### Responses

| Status Code |      Description      |        Properties       |
| :---------: | :-------------------: |   :------------------:  |
|   **200**   |           OK          |    `data: {documentObj}`    |
|   **401**   |      Unauthorized     |   `error: { message }`  |
|   **404**   |       Not Found       |   `error: { message }`  |
|   **409**   |       Conflict        |   `error: { message }`  |
|   **422**   |     Invalid Input     |   `error: { message }`  |
|   **500**   | Internal Server Error |   `error: { message }`  |

Obs.: documentObj will return the following structure:
```json
{
    "id":1,
    "type": "RG",
    "number":"00000000-0",
    "fullName": "John Smith da Silva",
    "emissionDate": "01/01/2020",
    "expirationDate":"01/01/2030",
    "emissionInstitution":"SSP"
}

```


### Delete an document

###### DELETE _`/documents/:documentId`_

#### Request

###### Headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer my-token"
}
```

###### Params

```
documentId:1
```


#### Responses

| Status Code |      Description      |        Properties       |
| :---------: | :-------------------: |   :------------------:  |
|   **204**   |       No Content      |        `data: {}`       |
|   **401**   |      Unauthorized     |   `error: { message }`  |
|   **404**   |       Not Found       |   `error: { message }`  |
|   **409**   |       Conflict        |   `error: { message }`  |
|   **422**   |     Invalid Input     |   `error: { message }`  |
|   **500**   | Internal Server Error |   `error: { message }`  |