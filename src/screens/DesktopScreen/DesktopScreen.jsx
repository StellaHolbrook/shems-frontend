import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

export const DesktopScreen = () => {
  return (
    <div className="desktop-screen">
      <div className="desktop-2">
        <div className="overlap-group-2">
          <img className="rectangle-3" alt="Rectangle" src="/img/rectangle-228.svg" />
          <img className="rectangle-4" alt="Rectangle" src="/img/rectangle-230.svg" />
          <img className="rectangle-5" alt="Rectangle" src="/img/rectangle-299.svg" />
          <div className="text-wrapper-3">Log In</div>
          <Link className="text-wrapper-4" to="/desktop-1">
            Sign Up
          </Link>
          <div className="text-wrapper-5">SHEMS</div>
          <img className="fi-rr-angle-small-2" alt="Fi rr angle small" src="/img/fi-rr-angle-small-down-2.svg" />
          <img className="group-2" alt="Group" src="/img/group-25.png" />
          <img className="group-3" alt="Group" src="/img/group-184.png" />
          <img className="line-2" alt="Line" src="/img/line-29.svg" />
          <img className="villa-black-dp" alt="Villa black" src="/img/villa-black-24dp.png" />
          <img className="rectangle-6" alt="Rectangle" />
          <p className="p">SMART HOME ENERGY MANAGEMENT SYSTEM</p>
          <p className="an-electricity-2">AN ELECTRICITY CONSUMPTION ANALYTICS SOFTWARE</p>
          <div className="rectangle-7" />
          <div className="rectangle-8" />
          <Link to="/desktop-13">
            <img className="vector" alt="Vector" src="/img/vector.svg" />
          </Link>
          <div className="rectangle-9" />
          <div className="rectangle-10" />
          <div className="text-wrapper-6">Password</div>
          <div className="rectangle-11" />
          <div className="text-wrapper-7">Full Name</div>
          <div className="log-in">LOG IN</div>
          <div className="text-wrapper-8">SHEMS</div>
          <img className="villa-black-2" alt="Villa black" src="/img/villa-black-24dp.png" />
          <Link className="text-wrapper-9" to="/desktop-1">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};
