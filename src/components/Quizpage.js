import React, { useEffect, useState } from "react";
import "../styles/quizpage.css";
import { getQuiz, updateScore } from "../backend_connection/api_req";
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Quizpage = ({selectedtopic,setScore1}) => {

  const navigate = useNavigate();

  const [quiz,setQuiz] = useState([]);
  const [id,setId] = useState(0);
  const [score,setScore] = useState(0);
  const [quizcompleted,setQuizCompelted] = useState(false);

   
  useEffect(()=>{
    if(selectedtopic === "null"){
      navigate("/");
    }
   if(quiz.length === 0){
        getQuiz(selectedtopic.toLowerCase(),setQuiz);     
   } 
  },[setQuiz])

  const [selected, setSelected] = useState(-1);
  

  const handleOptionClick = (id) => {
    setSelected(id);
    const radios = document.querySelectorAll('input[name="quiz-option"]');
    
    radios.forEach((radio,rid) => {
      if (rid === id+1) {
        radio.checked = true;
      } else {
        radio.checked = false;
      }
    });
  };

  const changeQuestion = () => {
    const radios = document.querySelectorAll('input[name="quiz-option"]');
    
    radios.forEach((radio, index) => {
      if (radio.checked) {
        const correctAnswerKey = `answer_${String.fromCharCode(97 + index)}_correct`;
        if (quiz[id].correct_answers[correctAnswerKey] === "true") {
          setScore(prevScore => prevScore + 10);
        }
      }
    });
  
    nextQuestion();
  };

  const nextQuestion = () => {
    if (id + 1 < quiz.length) {
        setId(prevId => prevId + 1); 
        const radios = document.querySelectorAll('input[name="quiz-option"]');
        radios.forEach(radio => {
          radio.checked = false;
        });
    } else {
      updateScore(score,setScore1);
      setQuizCompelted(true);
    }
  };

  return (
    <div>
       <Popup
     open={quizcompleted}
    modal

       >
    {close => (
      <div className="modal">
        <button className="close" onClick={()=>navigate("/")}>
          &times;
        </button>
        <div className="header"> Congradulations..! </div>
        <div className="content">
          Your Score: {score}
        </div>
      </div>
    )}
  </Popup>

      <div id="quiz-page-container">
        <div id="quiz-header">
          <div id="quiz-header-title">Title: {selectedtopic}</div>
          <div id="quiz-header-time-rem">Score: {score}</div>
        </div>
        {/* <div id="quiz-collapse-container">
          {
            quiz.length > 0 ?
                quiz.map((item,id)=>
                              <div className="quiz-option-btn" key={id}>
                                    <button>{id}</button>
                                </div>
                ) 
             :
             <></>
          }
        </div> */}

             {
              (quiz.length > 0)?(
                    <>
                        <div id="quiz-question">
                          <div id="quiz-question-text">
                            
                                  <h3>{quiz[id].question}</h3>
                                
                          </div>
                        </div>
                        <div id="quiz-options">
                          {console.log(quiz[id].answers)}
                          {Object.entries(quiz[id].answers).map(([key, ans], index) => (
                            (ans !== null)?
                            <div
                              key={key}  
                              className="quiz-option-text"
                              onClick={() => handleOptionClick(index-1)} 
                            >
                              <input type="radio" id={`quiz-input-option${index-1}`} name="quiz-option" />
                              <label htmlFor={`quiz-input-option${index-1}`}>{ans}</label>
                            </div>
                            :
                            <></>
                          ))}
                          
                           
                          {/* <div
                            className="quiz-option-text"
                            onClick={() => handleOptionClick(1)}
                          >
                            <input type="radio" id="quiz-input-option1" />
                            <label>{quiz[id].answers.answer_b}</label>
                          </div>
                          <div
                            className="quiz-option-text"
                            onClick={() => handleOptionClick(2)}
                          >
                            <input type="radio" id="quiz-input-option2" />
                            <label>{quiz[id].answers.answer_c}</label>
                          </div>
                          <div
                            className="quiz-option-text"
                            onClick={() => handleOptionClick(3)}
                          >
                            <input type="radio" id="quiz-input-option3" />
                            <label>{quiz[id].answers.answer_d}</label>
                          </div> */}
                        </div>
                        <div id="quiz-submit-button">
                          <div> 
                            <button onClick={changeQuestion}>Next</button>
                          </div>
                          {/* <button>Submit Test</button> */}
                        
                        </div>
                    </>
                  )
                  :
                  <></>
              }

      </div>
    </div>
  );
};

export default Quizpage;
