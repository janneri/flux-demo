import React from 'react';

export default class TodoInput extends React.Component {

    constructor() {
        super();
        this.state = {
            value: ''
        }
    }

    onChange = (e) => {
        this.setState({value: e.target.value});
    };

    onKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.setState({value: ''});
            this.props.addTodo(this.state.value);
        }
    };

    render() {
        return <input
            type="text"
            value={this.state.value}
            onKeyPress={this.onKeyPress}
            onChange={this.onChange}
        />
    }
}