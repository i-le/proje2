import React from 'react';
import SearchBar from './SearchBar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import Header from './Header';
import CommentList from './CommentList';
import CommentAdd from './CommentAdd';
import unsplash from '../apis/unsplash';
import PicsearchBar from './PicsearchBar';
import ImageCard from './ImageCard';
import PicList from './PicList';
import UserLocation from './UserLocation.js';
import Navbar from './Navbar.js'
import Axios from 'axios';




const KEY = 'AIzaSyDJE9kiBmQ8Z568QfpqzoazgP_F6391Qqc';


class App extends React.Component {
    // 开始页面的时候为0个video， 当用户使用searchbar输入text寻找视频的时候，
    // 再用video: response.data.items传回state
    state = {
        videos: [], 
        selectedVideo: null,
        pics: [],
        userPosition: {
            latitude: 35,
            longitude: 139
          },
          weather: {},
          regionInput: ""
    } 
// defult seacrching， 在打开网页后不输入任何文字在搜索栏直接显示一些推荐视频
    componentDidMount() {
        this.onTextSubmit('Ironhack Miami')
        this.onPicSearchSubmit('beach')

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
      
              
              let pos = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              }
      
              this.setState({ userPosition: pos });
      
              //Weather Api call
              Axios.get(`http://api.weatherstack.com/current?access_key=136d3d79f53cbbbf65c4d916ac33c569&query=${this.state.userPosition.latitude},${this.state.userPosition.longitude}`).then(res => {
      
                let userWeather = {
                  temperature: res.data.current.temperature,
                  description: res.data.current.weather_descriptions[0],
                  location: res.data.location.name,
                  region: res.data.location.region,
                  country: res.data.location.country,
                  wind_speed: res.data.current.wind_speed,
                  pressure: res.data.current.pressure,
                  precip: res.data.current.precip,
                  humidity: res.data.current.humidity,
                  img: res.data.current.weather_icons
                }
                      
                       
                this.setState({ weather: userWeather });
              })
            })
          }
    }
    // 在任何时候如果有人按下回车/ 在search bar打字并submit 这个search form
    // 之后通过YouTube的api让页面跳转到youtube来寻找被search的相关视频
    // 所以需要一个回调函数，这个回调函数会在任何人想要通过searchbar搜索视频的时候被调用
    // 当有人搜索视频的时候，是一个事件
    onTextSubmit = async e => { //这个ontextsubmit 用来接受searchbar js里面 onformsubmit传递回来的search中的文本text，在以相对应的文本通过youtube api搜索相关视频
        const response = await youtube.get('/search', {
            params: {
                q: e,
                part: 'snippet',
                maxResults: 6,
                type: 'video',
                key: KEY
            }
        })
        this.setState({
            videos: response.data.items,
            selectedVideo: response.data.items[0]
        })
    }
    
    onPicSearchSubmit = async e => {
        const response = await unsplash.get('/search/photos', {
            params: {query: e}
        })
        this.setState({pics: response.data.results})
    }


    //每有一个state 就会有一个call back的回调函数
    // 每个call back的回调函数都是用来接收用户在页面输入/点击操作后传进来的数据
    // app最后再使用setState来更改原有的state，用新的（用户反馈的）来代替
    // 如何修改数据，就是如何修改state.修改了state,react 就会改变页面的内容  
        onVideoSelect = video => {
            this.setState({selectedVideo: video})
    }

        addComment = (e) => {
            this.state.comments.unshift(e)
            this.setState({e})
        }



        login = () => {
          this.props.history.replace('/login')
        }


        signup = () => {
          this.props.history.replace('/signup')
        }


        changeRegion = (value) => {
            this.setState({ regionInput: value })
          }
        
          
          changeLocation = (e) => {
        
            e.preventDefault()
        
            Axios.get(`https://api.weatherstack.com/current?access_key=136d3d79f53cbbbf65c4d916ac33c569&query=${this.state.regionInput}`).then(res => {
        
              let userWeather = {
                temperature: res.data.current.temperature,
                description: res.data.current.weather_descriptions[0],
                location: res.data.location.name,
                region: res.data.location.region,
                country: res.data.location.country,
                wind_speed: res.data.current.wind_speed,
                pressure: res.data.current.pressure,
                precip: res.data.current.precip,
                humidity: res.data.current.humidity,
                img: res.data.current.weather_icons
              }
        
              this.setState({ weather: userWeather });
        
            })
          }


    render() {
        return (
            <div>
            <div className="ui inverted vertical masthead center algned segment">
                <div className="ui container">
                <div className="ui large secondary inverted pointing menu">
                    <a className="active item" href="#">Home</a>
                    <a className="active item" href="https://youtube.com">Youtube</a>
                    <a className="active item" href="https://www.tripadvisor.com/">Tripadvisor</a>
                    <div className="right item">
                        <button className="ui inverted button" onClick={this.login}>Log In</button>
                        <button className="ui inverted button" onClick={this.signup}>Sign Up</button>
                    </div>
                </div>
                </div>
                <div className="ui text container">
                <h1 className="ui inverted header">
                    Resaxch
                </h1>
                <h2>“I wish I were travelling with you! Have a great time and make lots of wonderful memories.”</h2>
                <div className="ui huge primary button">Take a Weather 
                <i className="right arrow icon"></i>
                </div>
                </div>
            </div>

            <div className="ui vertical strip segment">
            <div className="downmid ui container" style={{marginTop: '40px'}}>
            <Navbar changeRegion={this.changeRegion} changeLocation={this.changeLocation} />
            <UserLocation weather={this.state.weather} />
            </div>
        </div>




            <div className="ui vertical stripe segment">
            <div className="midui ui container"> {/* ui container在App父类模块中， 控制整个search bar子模块使其margin 和 padding 左右*/}
               <SearchBar onTextSubmit={this.onTextSubmit} />
               <div className="ui grid">
               <div className="ui row">
               <div className="eleven wide column">
                   <VideoDetail video={this.state.selectedVideo} />
               </div>            
               <div className="five wide column">
               <VideoList onVideoSelect={this.onVideoSelect} videos={this.state.videos} />
    </div>
    </div>
    </div>
    </div>
    </div>
    
           
            



            <div className="ui vertical strip segment">
            <div className="downmid ui container" style={{marginTop: '40px'}}>
            <PicsearchBar onPicSearchSubmit={this.onPicSearchSubmit} />
            <PicList pics={this.state.pics} />
            </div>
        </div>







        <div className="ui inverted vertical footer segment">
    <div className="ui container">
      <div className="ui stackable inverted divided equal height stackable grid">
        <div className="three wide column">
          <h4 className="ui inverted header">About Us</h4>
          <div className="ui inverted link list">
            <a href="3" className="item">Map</a>
            <a href="#" className="item">Hit Hot</a>
            <a href="#" className="item">Whoa</a>
            <a href="#" className="item"></a>
          </div>
        </div>
        <div className="three wide column">
          <h4 className="ui inverted header">Contact Us</h4>
          <div className="ui inverted link list">
            <a href="https://github.com/slava123445" className="item">Viacheslav Frolov</a>
            <a href="https://github.com/i-le" className="item">Stephen Zheng</a>
            <a href="#" className="item"></a>
            <a href="#" className="item"></a>
          </div>
        </div>
        <div className="seven wide column">
          <h4 className="ui inverted header">Resaxch</h4>
          <p>Weather, Video, Picture, on your call ! All welcome to Resaxch, search and relax, and enjoy yoursleves!</p>
        </div>
      </div>
    </div>
  </div>







    </div>   
        )
    }
}

export default App;


