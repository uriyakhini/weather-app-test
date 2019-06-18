import React from 'react';

import SearchBar from '../SearchBar';

import './CreateCard.css';

class CreateCard extends React.Component {
    constructor() {
        super();
        this.handleLocation = this.handleLocation.bind(this);
        this.state = {
            active: false
        }
    }

    handleLocation(location) {
        this.props.onSubmit(location);
        this.setState({active: false});
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
                {this.state.active ? <SearchBar id="create-card-search" onSubmit={this.handleLocation}/> : ''}
            </div>
        );
    }
}

export default CreateCard;
