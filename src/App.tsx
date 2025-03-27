import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./HomePage";
import SimpleQuizPage from "./SimpleQuiz";
import DetailedQuizPage from "./DetailedQuiz";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  // function that allows page navigation
  const navigateTo = (page: React.SetStateAction<string>) => {
    setCurrentPage(page);
  };

  // render based on currentpage state
  return (
    <>
      {currentPage === "home" && <HomePage navigateTo={navigateTo} />}
      {currentPage === "simple-quiz" && <SimpleQuizPage navigateTo={navigateTo} />}
      {currentPage === "detailed-quiz" && <DetailedQuizPage navigateTo={navigateTo} />}
    </>
  );
}

export default App;