import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

export const Desktop = () => {
  return (
    <div className="desktop">
      <div className="overlap-group-wrapper">
        <div className="overlap-group">
          <div className="overlap">
            <img className="rectangle" alt="Rectangle" src="/img/rectangle-230.svg" />
            <img className="img" alt="Rectangle" src="/img/rectangle-299.svg" />
            <Link className="text-wrapper" to="/desktop-15">
              Log In
            </Link>
            <Link className="div" to="/desktop-14">
              Sign Up
            </Link>
            <img className="fi-rr-angle-small" alt="Fi rr angle small" src="/img/fi-rr-angle-small-down-1.svg" />
            <img className="group" alt="Group" src="/img/group-25-1.png" />
            <img className="line" alt="Line" src="/img/line-29.svg" />
            <img className="rectangle-2" alt="Rectangle" src="/img/rectangle-303.png" />
            <p className="smart-home-energy">SMART HOME ENERGY MANAGEMENT SYSTEM</p>
            <p className="an-electricity">AN ELECTRICITY CONSUMPTION ANALYTICS SOFTWARE</p>
          </div>
          <div className="text-wrapper-2">SHEMS</div>
          <div className="villa-black-wrapper">
            <img className="villa-black" alt="Villa black" src="/img/villa-black-24dp.png" />
          </div>
        </div>
      </div>
    </div>
  );
};
