import React from 'react'

export default function Navbar(props) {

    
    return (
        <div className="search-bar ui segment"> 
        <form onSubmit={(e) => { props.changeLocation(e) }} className="ui form">
            <div className="field">
                <label className="ui teal label">Weather Today</label>
                <div className="ui icon input focus">
                <input type="text" onChange={(e) => { props.changeRegion(e.target.value) }} placeholder="Select your region" />
                <i className="invertd circular search icon"></i> 
            </div>
            </div>
        </form>
    </div>
    );
}
