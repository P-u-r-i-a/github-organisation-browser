# Github Organisation Browser

This project is a single page application (SPA) using ReactJS and Github Restful API.

This application retrieves the details of the requested organisation available on GitHub including:

* Avatar
* Description
* Location
* Website URL
* Github URL
* Total number of repositories  

It also presents a list of all the repositories available on Github and their details such as:
* Name
* Description
* GitHub URL
* Whether it is a fork
* Star Count
* Watchers Count
* License (if there is one)
* Language

In addition, it allows you to filter and sort the repository list with a few options like whether it is a forked repository or not and etc.

## Change the organisation detail

You can easily change the organisation by changing the following part in the constructor method in RepositroyBrowser.js file.

`this.state = { ...  , orgName: 'new-org-name', ... };`

For example, to get Microsoft repositories details, you need to have something like:

`orgName: 'microsoft'`


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


