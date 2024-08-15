import React, { useState } from "react";
import "../styles/dashboard.css";
import { FaPlus, FaRegWindowClose } from "react-icons/fa";
import { Link } from "react-router-dom";
import dash from "../img/dash.jpg"
import { TypeAnimation } from 'react-type-animation';

const Dashboard = ({ quiztopics , setSelectedTopic }) => {

  const handlepopupshow = () => {
    document.getElementById("uplaod-quiz-popup").style.visibility = "visible";
  };
  const handlepopuphide = () => {
    document.getElementById("uplaod-quiz-popup").style.visibility = "hidden";
  };

  const arr=["DevOps  ","Linux  ","Networking  ","Programming  ","Cloud  ","Docker  ","Kubernetes  "];
    
  return (
    <div>
      <div id="dashboard">
        <span>Hello {localStorage.getItem("username")}.!</span>
        {/* <div id="quiz-file-upload" onClick={handlepopupshow}>
          <FaPlus id="icon" />
          <span>New Quiz</span>
        </div> */}
        <div id="quiz-file-upload" >
          Scroll Down 
        </div>
        <div id="dashboard-div2">
          <div>
            <h2>Take Quiz now </h2>
            <br/>
            <span id="automatically-changing">
            <TypeAnimation
                  sequence={arr}
                  wrapper="span"
                  speed={1}
                  deletionSpeed={10}
                  style={{ fontSize: '25px', display: 'inline-block' , color:'red'}}
                  repeat={Infinity}
                />
            </span>
          </div>
          <div>
            <img width={"300px"} src={dash}/>
          </div>
        </div>
        <div id="hrrule"></div>
        <div id="dashboard-quizes">
          <span>Active Quizes</span>
          <div id="dashboard-quizes-items">
            {quiztopics.map((quiz, index) => (
              <div className="card" key={index}>
                <h3>{quiz.quiztopic}</h3>
                <h4>Duration: {quiz.time}</h4>
                <h4>Points: {quiz.points}</h4>
                <h4>Questions: {quiz.no_of_questions} Questions</h4>
                <Link to={"/quiz"}>
                  <button onClick={()=>setSelectedTopic(quiz.quiztopic)}>Attend</button>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div id="uplaod-quiz-popup">
          <div id="uplaod-quiz-popup-card">
            <FaRegWindowClose onClick={handlepopuphide} id="popup-close-icon" />
            <div id="popup-form-head">Please Fill this Form</div>
            <div>
              <label>Quiz Name</label> <input type="text" required />
            </div>
            <br />
            <div>
              <label>Time (mins)</label>
              <input type="number" required />
            </div>
            <br />
            <div>
              <label>Points</label>
              <input type="number" required />
            </div>
            <br />
            <div>
              <label>Open Till</label>
              <input type="date" required />
            </div>
            <br />
            <div>
              <label>Excel File</label>
              <input type="file" required />
            </div>
            <br />
            <button>Add Quiz</button>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default Dashboard;
