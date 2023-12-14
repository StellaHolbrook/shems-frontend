import React, {useState} from "react";
import { Link } from "react-router-dom";
import "./style.css";

// these functions are hooks

function GetName() {
  const [name, setName] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`name is: ${name} `);
  }
  return(
      <form  onSubmit={handleSubmit}>
        <input className="rect_form"
               type="text"
               value={name}
               onChange={(e) => setName(e.target.value)}
        />
      </form>
  )
}

const wholeUser = () => {
  const [joke, setJoke] = useState('');
  const FetchUser = async () => {
    try {
      const response = await fetch('http://localhost:1234/desktop-14', {
        method: 'PUT',
        headers: {
          "/users/register": '',
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setJoke(data[0].joke);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  useEffect(() => {
    fetchJoke();
  }, []);
  return (
      GetName(),
            GetAddress()
  );
}
export default Joke;

function GetEmail() {
  const [email, setEmail] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Email is: ${email} `);
  }
  return(
      <form onSubmit={handleSubmit}>
        <input className="rect_form"
            type="text"
            value={email}
            onChange={(e) => setName(e.target.value)}
        />
      </form>
  )
}

function GetAddress() {
  const [address, setAddress] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`address is: ${address} `);
  }
  return(
      <form onSubmit={handleSubmit}>
        <input className="rect_form"
            type="text"
            value={address}
            onChange={(e) => setName(e.target.value)}
        />
      </form>
  )
}

function GetPassword() {
  const [pword, setPword] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`password is: ${pword} `);
  }
  return(
      <form onSubmit={handleSubmit}>
        <input className="rect_form"
               type="text"
               value={pword}
               onChange={(e) => setName(e.target.value)}
        />
      </form>
  )
}

function CheckPassword() {
const [checkPword, setCheckPword] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`password is: ${checkPword} `);
  }
  return(
      <form onSubmit={handleSubmit}>
        <input className="rect_form"
               type="text"
               value={checkPword}
               onChange={(e) => setName(e.target.value)}
        />
      </form>
  )
}

export const Screen3 = () => {
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
              <div className="rectangle-26" ><GetEmail></GetEmail></div>
              <div className="text-wrapper-33">Email Address</div>
              <div className="rectangle-27" ><GetAddress></GetAddress></div>
                <div className="text-wrapper-34">Billing Address</div>
              <div className="rectangle-28" ><GetName></GetName></div>
              <div className="text-wrapper-35">Full Name</div>
                <div className="sign-up">SIGN UP</div>
                <div className="text-wrapper-36">SHEMS</div>
                <img className="villa-black-5" alt="Villa black" src="/img/villa-black-24dp.png" />
              <div className="rectangle-29" ><CheckPassword></CheckPassword></div>
                <div className="text-wrapper-37">Retype Password</div>
                <div className="rectangle-30" ><GetPassword></GetPassword></div>
                <div className="text-wrapper-38">Password</div>
                <div className="text-wrapper-39">Sign Up</div>
                <Link className="rectangle-31" to="/desktop-1" />
                <div className="text-wrapper-40">Sign Up</div>
                <div className="rectangle-31" />
            </div>
          </div>
        </div>
      </div>
  );
};
