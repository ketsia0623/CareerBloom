import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//import HomePage from "./HomePage";
import NewHomePage from "./NewHomePage";
//import SimpleQuizPage from "./SimpleQuiz";
import NewSimpleQuizPage from "./NewSimpleQuiz";
//import DetailedQuizPage from "./DetailedQuiz";
import NewDetailedQuizPage from "./NewDetailedQuiz";
//import SimpleQuizResults from "./SimpleQuizResults";
import NewSimpleQuizResults from "./NewSimpleQuizResults";
//import AboutUs from "./AboutUs"
import NewAboutUs from "./NewAboutUs";
import NewDetailedQuizResults from "./NewDetailedQuizResults"; 


function App() {
  const [currentPage, setCurrentPage] = useState("home");

  // function that allows page navigation
  const navigateTo = (page: React.SetStateAction<string>) => {
    setCurrentPage(page);
  };

  // render based on currentPage state
  return (
    <>
      {currentPage === "home" && <NewHomePage navigateTo={navigateTo} />}
      {currentPage === "simple-quiz" && <NewSimpleQuizPage navigateTo={navigateTo} />}
      {currentPage === "detailed-quiz" && <NewDetailedQuizPage navigateTo={navigateTo} />}
      {currentPage === "simple-quiz-results" && <NewSimpleQuizResults navigateTo={navigateTo} />}
      {currentPage === "detailed-quiz-results" && <NewDetailedQuizResults navigateTo={navigateTo} />}
      {currentPage === "about-us" && <NewAboutUs navigateTo={navigateTo} />}
      
    </>
  );
}

export default App;
