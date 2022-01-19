# advertising-data-etlv


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In short purpouse of this project is to get csv data with marketing campaigns, parse it, allow user to filter data and display on chart.

### What im using except react and typescript? 

1. To fetch and parse data : Papaparse https://www.papaparse.com
2. To deal with UI: MUI https://mui.com
3. To handle chart: react-chartjs-2 https://react-chartjs-2.netlify.app
4. Misc: lodash https://lodash.com
5. Tests: react-testing-library https://testing-library.com/docs/react-testing-library/intro/
6. Mock api: http-request-mock https://github.com/huturen/http-request-mock
7. Virtualisation: react-window https://react-window.vercel.app/#/examples/list/fixed-size



### Some interesting app fragments.  

1. papaparse will fetch data and call `handleOnComplete` or `handleOnError`, it will return array of objects  with fields as provided in first csv row. Inntially I was experimenting with data structure like below:
```js
{
  [datasource] : {
    [campaign] : [{core data}...]
  }
  ...
}
```
to reduce data duplicaiton and improve performance but code was to complicated and hard to read, performacne gain was not worth of it.

2. In `multipleSelect.tsx` to deal with huge amount of data in dropdown I've decided to use virtualisation.

3. In `filterForm.tsx` I've implemented logic to narrow down camapigns list basis on selected datasources and vice versa, to optimise array search by reducing number of iteration (I'm not 100% happy from UX perspective)

4. To optimise chart drawing I've decided to 'decimate' data and after that sort it by date to reduce chart paintings - in case of 1k or 30k records there is no point to show to user all points as he won't be able to distinguish them, decimated and sorted data are huge performacne booster. 




## How to run?

Developed and tested with: 
### `Node v17.1.0 and Npm 8.1.3` 

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
