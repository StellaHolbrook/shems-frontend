//LoginButton.js
import React, { Component } from 'react';
import md5 from 'md5';

// const LoginButton = () => {
//     const { loginWithRedirect, isAuthenticated } = useAuth0();
//     if (!isAuthenticated) {
//         return <button className="btn btn-primary
//             mx-5 my-5 px-4"
//                        onClick={() => loginWithRedirect()}>
//             Log In</button>;
//     }
// };
//
// export default LoginButton;

class Login extends Component{

    // initiate state
    constructor(props) {
        super(props);
        this.state = {
            username: 'username',
            password: 'password',
        }
    }


    /* the rest of the code ... */

handleInputChange = (event) => {
    const target = event.target;
    let value = event.target.value;
    const name = target.name;


    if (target.name === "password") {
        document.getElementById(name).type = "password";
        value = md5(event.target.value);
    }


    this.setState({
        [name]: value
    });
}

    setEmptyValue = (event) => {
        const name = event.target.name
        document.getElementById(name).value = "";
    }
    render(){
    return (<div></div>)   }
}
export default Login;