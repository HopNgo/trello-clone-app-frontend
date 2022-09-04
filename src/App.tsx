import AppBar from "components/AppBar/AppBar";
import BoardPage from "page/BoardPage/BoardPage";
import WelcomePage from "page/WelcomePage/WelcomePage";
import WorkPage from "page/WorkPage/WorkPage";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppBar />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path={"/boards"} element={<BoardPage />} />
          <Route path={"/boards/:boardId"} element={<WorkPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
