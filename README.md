This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). <br/>
[markdown guide](https://www.markdownguide.org/)

https://github.com/irenelim/todo-app1.git

## Installation
just plug and play: `https://my-todo-499b5.web.app`

## install from git
`git clone https://github.com/irenelim/todo-app1.git`

`npm install`

`npm start`

### Deploy to Firebase
https://www.robinwieruch.de/firebase-deploy-react-js
 - my-todo

### Build with
* create-react-app
* [react-router](https://github.com/ReactTraining/react-router)
* [material ui](https://material-ui.com/components/)
* [rechart](http://recharts.org/en-US/examples/TwoSimplePieChart)

#### phase 2
* [immutable state - immer](https://github.com/immerjs/immer)
* [material-table](https://github.com/mbrn/material-table)
example (https://material-ui.com/components/tables/#material-table)

### colours
* header #537178
* button #5285EC
* input fill #EEF1F8, no border
* label / placeholder #7A7D7E
* chartFill = "#E8ECEC";
* statisticTxt #8F9EA2

### truncate / ellipsis
 `truncateCell: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    },`

### search component
[search](https://material-ui.com/components/autocomplete/#search-input)

#### API LOGIN (https://dev.teledirectasia.com:3092/docs/)
`POST https://dev.teledirectasia.com:3092/login` <br /> 
`param {
  "name": "Jan Doe",
  (ID) "apiKey": "78f009a758d96757" 
}`
<br />
response: 
`{
  "msg": "401: Incorrect apiKey"
}`
`{
  "msg": "User logged in successfully",
  "token": {
    "name": "Jan Doe",
    "token": "6cf3477c1a90f91077377f04" *** Authorize key / token ***
  },
  "image": "/images/profile.jpg"
}`

#### API Dashboard
`GET https://dev.teledirectasia.com:3092/dashboard`
response:
`200 OK 
{
  "msg": "Dashboard data was retrieved successfully.",
  "tasksCompleted": 0,
  "totalTasks": 0,
  "latestTasks": []
}
{
  "tasksCompleted": 10,
  "totalTasks": 19,
  "latestTasks": [
    {
      "name": "Refactor something",
      "completed": false
    }
  ]
}`
`401 unAuthorize {
  "msg": "401: Bearer token is not specified."
}`

#### API Tasks: Get All Tasks
`GET https://dev.teledirectasia.com:3092/tasks`
response: array or {msg}
`
{
  "msg": "Tasks were listed successfully.",
  "tasks": []
}

[
  {
    "name": "Refactor something",
    "completed": false
  }
]`

#### API Tasks: Add new task
`POST https://dev.teledirectasia.com:3092/tasks`
`param {
  "name": "Refactor something"
}
`response {
  "name": "Refactor something",
  "completed": false
}`
`data.task: {
completed: false
createdAt: "2020-06-12T07:12:17.590Z"
createdBy: "5ee0ad4495466c2105a19286"
name: "read"
updatedAt: "2020-06-12T07:12:17.590Z"
__v: 0
_id: "5ee32ad195466c2105a1929e"
}`

#### API Tasks: Edit task {id(string)}
Edit a task by ID, Use this to mark complete or edit a task name
`PUT https://dev.teledirectasia.com:3092/tasks/1`
`data.task: {
completed: false
createdAt: "2020-06-12T07:12:17.590Z"
createdBy: "5ee0ad4495466c2105a19286"
name: "read"
updatedAt: "2020-06-12T07:12:17.590Z"
__v: 0
_id: "5ee32ad195466c2105a1929e"
}`

#### API Tasks: Delete task {id(string)}
`DELETE https://dev.teledirectasia.com:3092/tasks/1`
{
  "msg": "Category was deleted successfully",
  "task": {
    "completed": true,
    "_id": "5ee32ad195466c2105a1929e",
    "name": "read",
    "createdBy": "5ee0ad4495466c2105a19286",
    "createdAt": "2020-06-12T07:12:17.590Z",
    "updatedAt": "2020-06-13T11:27:51.462Z",
    "__v": 0
  }
}

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Next
- [X] [useMediaQuery](https://material-ui.com/components/use-media-query/)
- [ ] reducer to immerReducer