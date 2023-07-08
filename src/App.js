import Logo from "./components/Logo/Logo";
import PageOne from "./components/PageOne/PageOne";
import PageTwo from "./components/PageTwo/PageTwo";
import PageThree from "./components/PageThree/PageThree";
import PageFour from "./components/PageFour/PageFour";
import PageFive from "./components/PageFive/PageFive";
import "./App.css";
import React, { useState } from "react";
import tachyons from "tachyons";
import MultiStepProgressBar from "./components/MultiStepProgressBar/MultiStepProgressBar";

function App() {
  const [page, setPage] = useState("pageone");
  const [emailId, setEmailId] = useState(null);
  const [name, setName] = useState(null);
  const [followerCount, setFollowerCount] = useState(null);
  const [subscriberCount, setSubscriberCount] = useState(null);
  const [password, setPassword] = useState(null);

  const nextPage = (page) => {
    setPage(page);
  };

  const handleName = (name) => {
    setName(name);
  }

  const handleEmail = (email) => {
    console.log(email);
    setEmailId(email);
  };

  const handleFollowerCount = (count) => {
    setFollowerCount(count);
  };

  const handleSubscriberCount = (count) => {
    setSubscriberCount(count);
  };

  const handlePassword = (password) => {
    setPassword(password);
  }

  const nextPageNumber = (pageNumber) => {
    switch (pageNumber) {
      case "1":
        setPage("pageone");
        break;
      case "2":
        if(emailId){
          setPage("pagetwo");
        }
        break;
      case "3":
        if(emailId && followerCount){
          setPage("pagethree");
        }
        break;
      case "4":
        if(name && followerCount && emailId){
          setPage("pagefour");
        }  
        break;
      case "5":
        if(name && followerCount && emailId && password){
          setPage("pagefive");
        }
      default:
        setPage("1");
    }
  };
  return (
    <div className="App">
      <Logo />
      <MultiStepProgressBar page={page} onPageNumberClick={nextPageNumber} />
      {
        {
          pageone: <PageOne onButtonClick={nextPage} handleEmail={handleEmail}/>,
          pagetwo: <PageTwo onButtonClick={nextPage} handleFollowerCount={handleFollowerCount} handleName={handleName}/>,
          pagethree: <PageThree onButtonClick={nextPage} handleSubscriberCount={handleSubscriberCount}/>,
          pagefour: <PageFour onButtonClick={nextPage} handlePassword={handlePassword}/>,
          pagefive: <PageFive name={name} emailId={emailId} password={password} followerCount={followerCount} subscriberCount={subscriberCount}/>
        }[page]
      }
    </div>
  );
}

export default App;
