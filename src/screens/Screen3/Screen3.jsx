//import React, {useState} from "react";
import React,{ Component } from 'react'
import { Link } from "react-router-dom";
import "./style.css";

//    trying both different -- class Form extends Component {
//export class Form extends Component {
export class Screen3 extends Component {

  constructor(props) {
    super(props)
    this.state = {email: '', address: '', name: '', password: ""}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // requestOptions = {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ postName: 'React updates ' })
  // };

  handleSubmit(event) {
    //const {email, name, address, password} = this.state
    event.preventDefault()
    // alert(`
    //   ____Your Details____\n
    //   Email : ${email}
    //   Name : ${name}
    //   Address : ${address}
    //   Password :${password}
    // `);
    fetch(this.props.formAction,{body: JSON.stringify({email: this.state.email,
      address: this.state.address, name: this.state.name, password: this.state.password})
    })
    this.setState({}); // if the time allows for it, reset state.
  }

  handleChange(event) {           // this should be all that is required to handle changes
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
      return (
          <div className="screen-3">
            <div className="desktop-wrapper">
              <div className="desktop-4">
                <div className="overlap-group-4">
                  <img className="rectangle-20" alt="Rectangle" src="/img/rectangle-228.svg" />
                  <img className="rectangle-21" alt="Rectangle" src="/img/rectangle-230.svg" />
                  <img className="rectangle-22" alt="Rectangle" src="/img/rectangle-299.svg" />
                  <div className="text-wrapper-30">Log In</div>
                  <div className="text-wrapper-31">Sign Up</div>
                  <div className="text-wrapper-32">SHEMS</div>
                  <img className="fi-rr-angle-small-4" alt="Fi rr angle small" src="/img/fi-rr-angle-small-down-2.svg" />
                  <img className="group-5" alt="Group" src="/img/group-25-1.png" />
                  <img className="group-6" alt="Group" src="/img/group-184.png" />
                  <img className="line-4" alt="Line" src="/img/line-29.svg" />
                  <img className="villa-black-4" alt="Villa black" src="/img/villa-black-24dp.png" />
                  <img className="rectangle-23" alt="Rectangle" src="/img/rectangle-303.png" />
                  <p className="smart-home-eergy">SMART HOME ENERGY MANAGEMENT SYSTEM</p>
                  <p className="an-electricity-3">AN ELECTRICITY CONSUMPTION ANALYTICS SOFTWARE</p>
                  <div className="rectangle-24" />
                  <div className="rectangle-25" />
                  <Link to="/desktop-13">
                    <img className="vector-2" alt="Vector" src="/img/vector.svg" />
                  </Link>
                  <div> className="Form" </div>
                  <form onSubmit={this.handleSubmit}>
                    <input className="rectangle-26" name={'email'} placeholder={''}
                           value={this.state.email} onChange={this.handleChange}></input>
                    <div className="text-wrapper-33">Email Address</div>
                    <input className="rectangle-27" name={'address'} placeholder={''}
                           value={this.state.address} onChange={this.handleChange}></input>
                    <div className="text-wrapper-34">Billing Address</div>
                    <input className="rectangle-28" name={'name'} placeholder={''}
                           value={this.state.name} onChange={this.handleChange}></input>
                    <div className="text-wrapper-35">Full Name</div>
                    <div className="sign-up">SIGN UP</div>
                    <div className="text-wrapper-36">SHEMS</div>
                    <img className="villa-black-5" alt="Villa black" src="/img/villa-black-24dp.png"/>
                    <input className="rectangle-29" name={'password'} placeholder={''}
                           value={this.state.password} onChange={this.handleChange}></input>
                    <div className="text-wrapper-37" >Retype Password</div>
                    <input className="rectangle-30" name={'password'} placeholder={''}
                           value={this.state.password} onChange={this.handleChange}></input>
                    <div className="text-wrapper-38">Password</div>
                    <div className="text-wrapper-39">Sign Up</div>
                    <Link className="rectangle-31" to="/desktop-1" />
                    <button className="text-wrapper-40">Sign Up</button>
                    <div className="text-wrapper-40">Sign Up</div>
                  </form>
                </div>
              </div>
            </div>
          </div>
      );
    };
  }



//exporting this  causes an error - wrong type of export?-->
Screen3.defaultProps ={
  action: ' http://127.0.0.1:8000/users/register',   // my api address
  method: 'post'
};

//module.exports = Screen3
// module.exports = Form;