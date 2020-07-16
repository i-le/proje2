import React from 'react'
import './Weather.css'

export default function UserLocation(props) {

    const { temperature, description, location, region, country, wind_speed, pressure, precip, humidity, img } = props.weather;

    return (
        <div className="ui grid">
            <div className="ui row">
                <div className="weathercolumn">
                    <h1>{temperature}<sup>o</sup>C , {description}</h1>
                    <h4 class="ui violet inverted header">{location}</h4>
                    <p class="ui brown inverted header">{region} , {country}</p>
                </div>

                
                    <img className="mainImg" src={img} alt="weather-img" />
                
            </div>



            <div className="ui big horizontal divided list">
                <div className="item">
                    <p><b>Wind Speed</b>(km/hr)</p>
                    <h3>{wind_speed}</h3>
                </div>

                <div className="item">
                    <p><b>Preassure</b>(millibar)</p>
                    <h3>{pressure}</h3>
                </div>

                <div className="item">
                    <p><b>Precipitation</b>(mm)</p>
                    <h3>{precip}</h3>
                </div>

                <div className="item">
                    <p><b>Humidity</b>(%)</p>
                    <h3>{humidity}</h3>
                </div>
            </div>


        </div>
    )
}