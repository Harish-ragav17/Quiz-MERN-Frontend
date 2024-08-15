import axios from "axios";

axios.defaults.withCredentials = true;

export const loginapi = (username, password, setloggedin,loginError) => {
  axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/user/login`, {
      username,
      password,
    })
    .then((response) => {
      if (response.data.response === "login sucess") {
        setloggedin(true);
        localStorage.setItem("username",response.data.data.name);
        localStorage.setItem("username_id",response.data.data.username);
      }else
      {
        loginError(response.data.response);
      }
    });
};


export const logout = (setloggedin) => {
  axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/logout`).then(() => {
    document.cookie.replace(document.cookie.startsWith("token"),"");
    setloggedin(false);
  });
};


export const getQuiz=async(topic,setQuiz)=>{
  try {
    const response = await axios.get('https://quizapi.io/api/v1/questions', {
      headers: {
        'X-Api-Key': process.env.REACT_APP_QUIZ_API
      },
      params :{
        category:topic
      },
      withCredentials: false
    });
    setQuiz(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export const getScore=async(setScore)=>{
  let username=localStorage.getItem("username_id");
  try{
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/getScore`,{username}).then((data) => {
    setScore(data.data.score);
    });
  }
  catch(err)
  {
    console.log(err);
  }
}

export const updateScore=async(score,setScore)=>{
  let username=localStorage.getItem("username_id");
  try{
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/updateScore`,{username,score}).then((data) =>{
      setScore(data.data.score);
    });
  }
  catch(err)
  {
    console.log(err);
  }
}