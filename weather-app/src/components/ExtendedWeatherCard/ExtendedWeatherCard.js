import React from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLongArrowAltUp} from '@fortawesome/free-solid-svg-icons'
import './ExtendedWeatherCard.css';

import WeatherCard from '../WeatherCard';
import { transform } from '@babel/core';


class ExtendedWeatherCard extends WeatherCard {
    static propTypes = {
        tag: PropTypes.string,
        data: PropTypes.object,
        width: PropTypes.number
    }

    render() {
        let windStyle = {
            transform: `rotate(${this.props.data.wind.deg + 180}deg)`,
            fontSize: '16px'
        };
        return (
            <div className='current-weather-card' style={{width: this.props.width}}>
                <div className='current-tag'>{this.props.tag}</div>
                <FontAwesomeIcon className='current-weather-icon' icon={this.getWeatherIcon()}/>
                <div className='current-temp'>{this.props.data.main.temp_max |0}C&deg;</div>
                <div className='data-root'>
                    <div className='data-tag'>Humidity</div>
                    <div className='value'>{this.props.data.main.humidity}%</div>
                </div>
                <div className='data-root'>
                    <div className='data-tag'>Wind</div>
                    <div className='value'>
                        <FontAwesomeIcon style={windStyle} icon={faLongArrowAltUp}/><br/>
                        {this.props.data.wind.speed} meter/s
                    </div>
                </div>
            </div>
        );
    }
}

export default ExtendedWeatherCard;
