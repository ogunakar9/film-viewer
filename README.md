# Film Viewer App

To install Yarn please follow this link, [how to install yarn?](https://yarnpkg.com/getting-started/install).
By running commands right below, you will be able to work with Film Viewer locally,

```
git clone git@github.com:ogunakar9/film-viewer.git
cd film-viewer
yarn install
```

## Create Environment Variable

After navigating to the root directory, run the command below and create a .env file to hold the environment variables.

```
touch .env
```

Inside the .env file create the variable that holds your API key as such:

```
REACT_APP_API_KEY = "YOUR_API_KEY"
```

## Available Scripts

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
