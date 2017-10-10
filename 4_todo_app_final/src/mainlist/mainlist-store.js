import Reflux from 'reflux';
import actions from './mainlist-actions';

export default class TodoStore extends Reflux.Store {

    constructor() {
        super();
        this.state = {
            todolists: []
        };
        this.listenables = actions;
    }

    onLoadCompleted(data) {
        this.setState({todolists: data});
    }

}