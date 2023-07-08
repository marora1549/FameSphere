import React, { useState } from 'react';
import "./PageOne.css";

const PageOne = ({ onButtonClick, handleEmail}) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
    } else if (!emailPattern.test(email)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
      handleEmail(email);
      onButtonClick("pagetwo");
    }
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };


  return (
    <main
      className="pt5 black-80 center"
      style={{ maxWidth: "40%", maxHeight: "30%", margin: "auto" }}
    >
      <form className="measure">
        <h2>Welcome to FameSphere!</h2>
        <p style={{ color: "#C0C0C0" }}>Enter the Email-ID connected to your instagram account</p>
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <div className="mt3">
            <label
              className="db lh-copy f6 mb1"
              htmlFor="email-id"
              style={{ textAlign: "left" }}
            >
              Email ID
            </label>
            <input
              className="f6 br2 ph3 pv2 mb2 dib black w-100"
              type="text"
              name="email-id"
              id="email-id"
              size="30"
              placeholder="name@email.com"
              style={{
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "#EAEEF5",
              }}
              value={email}
            onChange={handleInputChange}
            />
            {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
          </div>
          
        </fieldset>
        <div>
          <input
            className="f6 grow br2 ph3 pv2 mb2 dib white"
            style={{
              borderStyle: "none",
              width: "100%",
              backgroundColor: "#664DE5",
            }}
            type="submit"
            value="Create Account"
            onClick={validateEmail}
          />
        </div>
      </form>
    </main>
  );
};

export default PageOne;
