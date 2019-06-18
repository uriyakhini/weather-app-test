import React from 'react';
import Script from 'react-load-script';

import API_KEYS from '../../api-keys.conf';

const PLACES_API_URL = `https://maps.googleapis.com/maps/api/js?key=${API_KEYS.google}&libraries=places`;

class SearchBar extends React.Component {
    constructor() {
        super();
        this.handleLoad = this.handleLoad.bind(this);
        this.handleLocationSelect = this.handleLocationSelect.bind(this);
    }

    handleLoad(){
        /*global google*/
        var options = { types: ['(cities)'] }; 
        this.autocomplete = new google.maps.places.Autocomplete(
                                document.getElementById('main-search-bar'),
                                options); 
        this.autocomplete.addListener('place_changed',
                                      this.handleLocationSelect);
    }

    parseLocation(location){
        let parsedLocation = location[0].long_name;

        // Add country code for weathermap api. If none is provided, only the city name is used.
        if (location.length >= 3){
            parsedLocation += `,${location[location.length - 1].short_name}`
        }
    
        return parsedLocation;
    }

    handleLocationSelect(){
        let locationObject = this.autocomplete.getPlace();
        let location = locationObject.address_components;

        if (location) {
            this.props.onSubmit(this.parseLocation(location));
        }
    }

    render() {
        return (
            <div>
                <Script url={PLACES_API_URL} onLoad={this.handleLoad}/>
                <input id='main-search-bar' placeholder='location'/>
            </div>
        );
    }
}

export default SearchBar;
