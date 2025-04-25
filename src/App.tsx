import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//import HomePage from "./HomePage";
import NewHomePage from "./NewHomePage";
import SimpleQuizPage from "./SimpleQuiz";
import DetailedQuizPage from "./DetailedQuiz";
import SimpleQuizResults from "./SimpleQuizResults";
import AboutUs from "./AboutUs"


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
      {currentPage === "simple-quiz" && <SimpleQuizPage navigateTo={navigateTo} />}
      {currentPage === "detailed-quiz" && <DetailedQuizPage navigateTo={navigateTo} />}
      {currentPage === "simple-quiz-results" && <SimpleQuizResults navigateTo={navigateTo} />}
      {currentPage === "about-us" && <AboutUs navigateTo={navigateTo} />}
      
    </>
  );
}

export default App;
