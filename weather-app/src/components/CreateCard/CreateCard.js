import React from 'react';

import './CreateCard.css';

class CreateCard extends React.Component {
    constructor() {
        super();
        this.state = {
            active: false
        }
    }

    render() {
        return (
            <div className='create-card'>
            </div>
        );
    }
}

export default CreateCard;
