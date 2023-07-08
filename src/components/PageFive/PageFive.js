import React, {useEffect} from "react";
import axios from "axios";
import tick from "./tick.jpg";

const PageFive = ({name, emailId, password, followerCount, subscriberCount}) => {
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.post('http://localhost:8080/signup', {
              userid: emailId,
              password: password,
              email: emailId,
              signkey: 'abcxyz',
            });
            console.log(response.data);
    
            const token = response.data.token;
    
            const updateFollowerCount = async () => {
              try {
                const updateResponse = await axios.post(
                  'http://localhost:8080/updateFollowerCount',
                  {
                    igfollowers: followerCount,
                    ytsubscribers: subscriberCount,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
                console.log(updateResponse.data);
              } catch (error) {
                console.error(error);
              }
            };
    
            updateFollowerCount();
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
      }, []);

    return (
      <div
        className="mw5 bg-white pa2-ns mt5 dib"
        style={{ maxWidth: "30%", maxHeight:'30%' }}
      >
        <img
          src={tick}
          className="h3 w3"
          title="success icon"
          alt="tick-icon"
        />
        <div className="center"><h3 className="">Congratulations, {name}!</h3></div>
        <p style={{ color: "#C0C0C0" }}>
          You have completed the onboarding successfully!
        </p>
        <input
          className="f6 grow br2 ph3 pv2 mb2 dib white"
          style={{ borderStyle: "none", width: "100%", backgroundColor: '#664DE5' }}
          type="submit"
          value="Launch FameSphere"
        />
      </div>
    );
}

export default PageFive;