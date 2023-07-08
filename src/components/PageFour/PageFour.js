import React, { useState } from "react";

const PageFour = ({onButtonClick, handlePassword}) => {
  const [password, setPassword] = useState("");
  const [inputError, setInputError] = useState("");

  const validatePassword = (e) => {
    e.preventDefault();
    if(!password){
      setInputError("Password is required to proceed");
    }else{
      handlePassword(password);
      onButtonClick("pagefive");
    }
  }

  const handleInputChange = (e) => {
    setPassword(e.target.value);
  };
  return (
    <main
      className="pt5 black-80 center"
      style={{ maxWidth: "40%", maxHeight: "30%", margin: "auto" }}
    >
      <form className="measure">
        <h2>Set Password!</h2>
        <p style={{ color: "#C0C0C0" }}>This will be used for accessing your FameSphere account</p>
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <div className="mt3">
            <label
              className="db lh-copy f6 mb1"
              htmlFor="email-id"
              style={{ textAlign: "left" }}
            >
              Password
            </label>
            <input
              className="f6 br2 ph3 pv2 mb2 dib black w-100"
              type="text"
              name="password"
              id="password"
              size="30"
              placeholder="password"
              style={{
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "#EAEEF5",
              }}
              value={password}
            onChange={handleInputChange}
            />
            {inputError && <p style={{ color: 'red' }}>{inputError}</p>}
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
            onClick={validatePassword}
          />
        </div>
      </form>
    </main>
  );
}

export default PageFour;