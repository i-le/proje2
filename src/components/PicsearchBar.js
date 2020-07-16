import React from 'react'

export default class PicsearchBar extends React.Component {
    
    state = {
        term: ''
    }
    
onPicSubmit = (e) => {
    e.preventDefault()
    this.props.onPicSearchSubmit(this.state.term)
}

picChange = (e) => {
    this.setState({
        term: e.target.value
    })
}

    render() {
        return (
            <div className="search-bar ui segment"> {/* ui segment 会给要做的searchbar上画一个矩形框*/}
            <form onSubmit={this.onPicSubmit} className="ui form"> {/* onsubmit会在每次searchBar这个search form被按下回车（被调用）的时候执行， 执行就是一个事件，所以要绑定一个事件函数 */}
                <div className="field">
                    <label className="ui orange label">Picture Pick</label>
                    <div className="ui icon input focus">
                    <input type="text" value={this.state.term} onChange={this.picChange} placeholder="search here" />
                    <i className="invertd circular search icon"></i> 
                </div>
                </div>
            </form>
        </div>
        );
    }
}