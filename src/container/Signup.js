import React from 'react'
import './login.css'
import Oceans from './oceans.mp4'

export default class Signup extends React.Component {

    toLogin = () => {
        this.props.history.replace('/login')
    }
    

    render() {
        return (
            <div className="loginbg">
            <div className="login-form">
            <h2>Creat Account</h2>
            <div className="form-input">
                <input type="text" name="" placeholder="Email" />
                <div className="form-input">
                <input type="password" name="" placeholder="Password" />
                <div className="form-input">
                <input type="password" name="" placeholder="Confirm Password" />
                <div className="form-input"></div>
                <input className="sub" type="submit" name="" value="Creat" />
                <div className="form-input"></div>
                <input className="sub" type="submit" name="" value="Already Have one? Log In !" onClick={this.toLogin} />
            </div>
            <a href="#" className="forget">Forget Password</a>
             </div>
            </div>
            </div>
            <video className='bg' loop autoPlay muted>
            <source src={Oceans} type="video/mp4" />
            </video>
            </div>
        )
    }
}