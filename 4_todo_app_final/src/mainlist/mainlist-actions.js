import Reflux from 'reflux';
import Http from '../util/http';
import {asyncAction} from '../util/action-utils';


const actions = Reflux.createActions({
    'load': asyncAction(),            // load the list of lists
});

export const actionCreator = {

    load() {
        Http.get(actions.load, `todolists`);
    }

};

export default actions;