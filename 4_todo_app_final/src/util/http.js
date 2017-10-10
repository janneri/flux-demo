import {loadingActions} from '../common/LoadingIndicator';

// You might inject this from the webpack config to support different backends
let baseUrl = 'http://localhost:3001';


/**
 * This is poor mans middleware. What you do here depends heavily on context.
 * This stuff could (and perhaps should) be implemented as a middleware,
 * but on the other hand we are not writing a library ...
 *
 * You could easily extend this with:
 * 1) csrf-token handling
 * 2) global loading state handler
 * 3) global error handling, which can for example send frontend failures to backend for logging/analysis purposes.
 * 4) ...
 */
function handleStart(method, action, url, requestPayload) {
    // log the request
    if ( requestPayload ) {
        console.log(method + " " + url, requestPayload);
    } else {
        console.log(method + " " + url);
    }

    // send the general loading started action
    if ( method === 'GET' ) {
        loadingActions.loadStart()
    } else  {
        loadingActions.saveStart();
    }

    // send the action started action
    action.started(requestPayload);
}

function handleCompleted(method, action, responseJson, requestPayload) {
    if ( method === 'GET' ) {
        loadingActions.loadEnd()
    } else  {
        loadingActions.saveEnd();
    }
    action.completed(responseJson, requestPayload);
}

function handleFailed(method, action, url, error, requestPayload) {
    if ( method === 'GET' ) {
        loadingActions.loadEnd()
    } else  {
        loadingActions.saveEnd();
    }
    console.log('There has been a problem with your fetch operation: ', error);
    action.failed(requestPayload);
}


/**
 * Http is just a thin wrapper around native fetch.
 *
 * It takes in an object that contains three action creator functions:
 * 1) action.started,
 * 2) action.completed
 * 3) action.failed
 */
let Http = {

    get(action, url) {
        handleStart('GET', action, url);

        fetch(`${baseUrl}/${url}`).then(function(response) {
            if (response.ok) { // todo check that response is json
                return response.json();
            }
            throw new Error('Network response was not ok.');
        }).then(function(json) {
            handleCompleted('GET', action, json);
        }).catch(function(error) {
            handleFailed('GET', action, url, error);
        });
    },

    post(action, url, data) {
        handleStart('POST', action, url, data);

        fetch(`${baseUrl}/${url}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(function(response) {
            if (response.ok) { // todo check that response is json
                return response.json();
            }
            throw new Error('Network response was not ok.');
        }).then(function(json) {
            handleCompleted('POST', action, json, data);
        }).catch(function(error) {
            handleFailed('POST', action, url, error, data);
        });
    },

    put(action, url, data) {
        handleStart('PUT', action, url, data);

        fetch(`${baseUrl}/${url}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(function(response) {
            if (response.ok) { // todo check that response is json
                return response.json();
            }
            throw new Error('Network response was not ok.');
        }).then(function(json) {
            handleCompleted('PUT', action, json, data);
        }).catch(function(error) {
            handleFailed('PUT', action, url, error, data);
        });
    },

    delete(action, url, data) {
        handleStart('DELETE', action, url, data);

        fetch(`${baseUrl}/${url}`, {
            method: "DELETE"
        }).then(function(response) {
            if (response.ok) { // todo check that response is json
                return response.json();
            }
            throw new Error('Network response was not ok.');
        }).then(function(json) {
            handleCompleted('DELETE', action, json, data);
        }).catch(function(error) {
            handleFailed('DELETE', action, url, error, data)
        });
    }
};


export default Http;