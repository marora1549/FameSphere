import React, { useState } from 'react';
import axios from 'axios';
import "./PageTwo.css";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";

const PageTwo = ({onButtonClick, handleFollowerCount, handleName}) => {
  const [followerCount, setFollowerCount] = useState(null);
  const [igUsername, setIgUsername]  = useState("");
  const [inputError, setInputError] = useState("");

  const responseFacebook = (response) => {
    if(!igUsername){
      setInputError("Instagram username is required to proceed");
    }else{
      let accessToken = response.data.accessToken;
      handleName(response.data.name);
      if(accessToken){
        fetchInstagramData(accessToken);
      }
    }
  };
    const fetchInstagramData = async (accessToken) => {
      try {
        const response = await axios.get(
          `https://graph.facebook.com/v16.0/me/accounts?access_token=${accessToken}`
        );
        
        // Extract Instagram account ID from the response
        const pageId = response.data.data[0].id;

        const instagramResponse = await axios.get(
          `https://graph.facebook.com/v16.0/${pageId}?fields=instagram_business_account&access_token=${accessToken}`
        );
        const igAccountId = instagramResponse.data.instagram_business_account.id
                
        const igInfoResponse = await axios.get(
          `https://graph.facebook.com/v16.0/${igAccountId}?fields=business_discovery.username(${igUsername}){followers_count,username}&access_token=${accessToken}`
        );
      
        const followerCount = igInfoResponse.data.business_discovery.followers_count;
        setFollowerCount(followerCount);
        handleFollowerCount(followerCount);
      } catch (error) {
        console.error('Error fetching Instagram data:', error);
      }
    };

    const handleInputChange = (e) => {
      if(e.target.value){
        setInputError("");
      }
      setIgUsername(e.target.value);
    };

    return (
      <main
        className="pt5 black-80 center"
        style={{ maxWidth: "40%", maxHeight: "30%", margin: "auto" }}
      >
        <form className="measure">
          <h2>Let's connect your Instagram Account</h2>
          <p style={{ color: "#C0C0C0" }}>
            We only store basic details like your followers count, likes, etc.
          </p>
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <div className="mt3">
              <label
                className="left db lh-copy f6 mb1"
                htmlFor="workspace-name"
                style={{textAlign: 'left'}}
              >
                IG Account ID
              </label>
              <input
                className="f6 br2 ph3 pv2 mb2 dib black w-100"
                type="text"
                name="ig-username"
                id="ig-username"
                size="30"
                placeholder="vaibhav_01"
                style={{
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "#EAEEF5",
                }}
                value={igUsername}
            onChange={handleInputChange}
              />
              {inputError && <p style={{ color: 'red' }}>{inputError}</p>}
            </div>
            <div className="mv3">
            {followerCount?
              <div className="mt3">
              <label
                className="left db lh-copy f6 mb1"
                htmlFor="workspace-name"
                style={{textAlign: 'left'}}
              >
                IG Followers Count: {followerCount}
              </label>
              <input
                className="f6 grow br2 ph3 pv2 mb2 dib white"
                style={{ borderStyle: "none", width: "100%", backgroundColor: '#664DE5' }}
                type="submit"
                value="Next"
                onClick={() => onButtonClick("pagethree")}
              />
            </div>
            :igUsername?
            <LoginSocialFacebook
              appId="1172418496798050"
              onResolve={responseFacebook}
              scope="instagram_basic,pages_show_list,email,public_profile,instagram_manage_insights"
              disabled={true}
              isDisabled={true}
              onReject={(error) => {
                console.log(error);
              }}
            > 
              <FacebookLoginButton disabled={true}/>
            </LoginSocialFacebook>:""}
            
            </div>
          </fieldset>
        </form>
      </main>
    );
}

export default PageTwo;