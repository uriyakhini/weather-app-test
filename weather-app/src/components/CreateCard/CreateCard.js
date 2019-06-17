import React from 'react';

import SearchBar from '../SearchBar';

import './CreateCard.css';

class CreateCard extends React.Component {
    constructor() {
        super();
        this.state = {
            active: false
        }
    }

    render() {
        let mainDivProps = {className: 'create-card'};
        if (!this.state.active){
            mainDivProps.onClick = () => {
                this.setState({active: true});
            }
        }
        return (
            <div {...mainDivProps}>
                {this.state.active ? <SearchBar/> : ''}
            </div>
        );
    }
}

export default CreateCard;
