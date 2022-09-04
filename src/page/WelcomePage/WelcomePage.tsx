import { useLocation, useNavigate, NavigateFunction } from "react-router-dom";
import "./WelcomePage.scss";

const WelcomePage = () => {
  const location = useLocation();
  console.log(location);

  const navigate: NavigateFunction = useNavigate();

  return (
    <div className="welcome-page">
      <div className="welcome-page-greeting">
        <p>WELCOME TO</p>
        <p>MY TRELLO CLONE APP</p>
      </div>
      <button className="welcome-page-btn" onClick={() => navigate("/boards")}>
        GET STARTED
      </button>
      <div className="welcome-page-line"></div>
      <p className="welcome-page-createdBy">Created By: Ngo Hop</p>
    </div>
  );
};

export default WelcomePage;
