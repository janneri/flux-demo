import React from 'react';
import Reflux from 'reflux';
import {actionCreator} from '../mainlist-actions';
import MainlistStore from '../mainlist-store';
import {Link } from 'react-router-dom'

function MainListItem({todolist: {id, name}}) {
    return (
        <div>
            <Link to={{ pathname: '/todos/'+id }}>{name}</Link>
        </div>
    );
}

function MainListPage({todolists}) {
    return (
        <div>

            {
                todolists.map(todolist => (
                    <MainListItem
                        key={todolist.id}
                        todolist={todolist}
                    />
                ))
            }
        </div>
    )
}

export default class MainListPageConnected extends Reflux.Component {

    componentDidMount() {
        actionCreator.load();
    }

    constructor(props) {
        super(props);
        // will connect and sync this component's state with the store state
        this.store = MainlistStore;
    }

    render() {
        return (
            <MainListPage todolists={this.state.todolists} />
        )
    };
}