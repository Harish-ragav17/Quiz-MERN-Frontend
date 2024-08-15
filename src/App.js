import "./App.css";
import { redirect, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import Quizpage from "./components/Quizpage";
import Login from "./components/Login";

function App() {
  const [Score,setScore] = useState(0);

  useEffect(() => {
  
   if(document.cookie !== "token=" && document.cookie !== "")
   {
    setloggedin(true);
   }else
   {
    redirect("/");
    setloggedin(false);
    
   }
  }, []);
 
  const [loggedin, setloggedin] = useState(false);
  const [selectedtopic,setSelectedTopic] = useState("null");
  const [quiztopics, setquiztopics] = useState([
    {
      quiztopic: "Linux",
      no_of_questions: "20",
      points: "200",
    },
    {
      quiztopic: "DevOps",
      no_of_questions: "20",
      points: "200",
    },
    // {
    //   quiztopic: "Networking",
    //   no_of_questions: "20",
    //   points: "200",
    // },
    // {
    //   quiztopic: "Cloud",
    //   no_of_questions: "20",
    //   points: "200",
    // },
    // {
    //   quiztopic: "Kubernetes",
    //   no_of_questions: "20",
    //   points: "200",
    // }
    
  ]);

  return (
    <div className="App">
      <Routes>
        {loggedin ? (
          <Route path="/" element={<Header loggedin={loggedin} setloggedin={setloggedin} Score={Score} setScore={setScore}/>}>
            <Route path="/" element={<Dashboard quiztopics={quiztopics} setSelectedTopic={setSelectedTopic} />} />
             <Route path="/quiz" element={<Quizpage selectedtopic={selectedtopic} setScore1={setScore}/>} />
          </Route>
        ) : (
          <Route path="/" element={<Login setloggedin={setloggedin} />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
