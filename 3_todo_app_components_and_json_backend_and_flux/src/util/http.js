let baseUrl = 'http://localhost:3001';

/**
 * This class is just a thin wrapper around native fetch.
 *
 * It takes in an "async action creator" -object that contains three action creator functions:
 * 1) action.started,
 * 2) action.completed
 * 3) action.failed.
 *
 * You could easily extend this with
 * 1) csrf-token handling
 * 2) global loading state handler
 * 3) global error handling, which can for example send frontend failures to backend for logging/analysis purposes.
 *
 * This stuff could (and perhaps should) be implemented as a middleware,
 * but on the other hand we are not writing a library..
 * It might be ok to just implement the middleware logic and call it from this utility class.
 *
 */
let Http = {

    get(action, url) {
        action.started();

        fetch(`${baseUrl}/${url}`).then(function(response) {
            if (response.ok) { // todo check that response is json
                return response.json();
            }
            throw new Error('Network response was not ok.');
        }).then(function(json) {
            action.completed(json);
        }).catch(function(error) {
            // we could call a general failure handler
            action.failed(error);
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });
    },

    post(action, url, data) {
        action.started(data);

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
            action.completed(json, data);
        }).catch(function(error) {
            // we could call a general failure handler
            action.failed(data);
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });
    },

    put(action, url, data) {
        action.started(data);

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
            action.completed(json);
        }).catch(function(error) {
            // we could call a general failure handler
            action.failed(data);
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });
    },

    delete(action, url, data) {
        action.started(data);

        fetch(`${baseUrl}/${url}`, {
            method: "DELETE"
        }).then(function(response) {
            if (response.ok) { // todo check that response is json
                return response.json();
            }
            throw new Error('Network response was not ok.');
        }).then(function(json) {
            action.completed(json, data);
        }).catch(function(error) {
            // we could call a general failure handler
            action.failed(data);
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });
    }

};