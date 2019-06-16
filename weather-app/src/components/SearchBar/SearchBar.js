import React from 'react';

class SearchBar extends React.Component {
    constructor() {
        super();
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.state = {
            value: ''
        }
    }

    handleKeyPress(e) {
        var key = e.which || e.key;
        return key === 13 ? this.props.onEnter(this.state.value) : '';   
    }

    render() {
        return (
            <input placeholder='location'
             onChange={e => this.setState({value: e.target.value})}
             onKeyPress={e => this.handleKeyPress(e)}/>
        );
    }
}

export default SearchBar;