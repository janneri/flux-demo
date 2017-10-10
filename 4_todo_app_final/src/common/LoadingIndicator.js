import React from 'react';
import Reflux from 'reflux';


export const loadingActions = Reflux.createActions([
    'loadStart',
    'loadEnd',
    'saveStart',
    'saveEnd'
]);


export class LoadingStore extends Reflux.Store {

    constructor() {
        super();
        this.state = {
            loadCount: 0,
            saveCount: 0
        };
        this.listenables = loadingActions;
    }


    loadStart() {
        let newLoadCount = this.state.loadCount + 1;
        this.setState({loadCount: newLoadCount});
    }

    loadEnd() {
        let newLoadCount = this.state.loadCount - 1;
        this.setState({loadCount: newLoadCount});
    }

    saveStart() {
        let newSaveCount = this.state.saveCount + 1;
        this.setState({saveCount: newSaveCount});
    }

    saveEnd() {
        let newSaveCount = this.state.saveCount - 1;
        this.setState({saveCount: newSaveCount});
    }

}

export default class LoadingIndicator extends Reflux.Component {

    constructor(props) {
        super(props);
        this.store = LoadingStore;
    }

    render() {
        if ( this.state.loadCount ) {
            return <span>Loading ...</span>;
        }
        else if ( this.state.saveCount ) {
            return <span>Saving changes ...</span>;
        }
        else {
            return null;
        }
    }
}