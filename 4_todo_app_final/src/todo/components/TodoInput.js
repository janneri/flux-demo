import React from 'react';

export default class TodoInput extends React.Component {

    constructor() {
        super();
        this.state = {
            value: '',
            msg: ''
        }
    }

    onChange = (e) => {
        this.setState({value: e.target.value});
    };

    onKeyPress = (e) => {
        if (e.key === 'Enter') {
            if ( this.props.isReadOnly ) {
                // user should wait
                this.setState(...this.state, {msg: '... please retry in a moment'});
            }
            else {
                this.setState({value: '', msg: ''});
                this.props.addTodo(this.state.value);
            }
        }
    };

    render() {
        return (
            <div>
                { this.state.msg ? <div>{this.state.msg}</div> : null }
                <input
                    type="text"
                    value={this.state.value}
                    onKeyPress={this.onKeyPress}
                    onChange={this.onChange}
                />
            </div>
        )
    }
}