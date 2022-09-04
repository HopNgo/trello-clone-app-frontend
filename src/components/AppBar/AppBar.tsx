import React, { useState } from "react";
import { Form } from "react-bootstrap";
import {
  Location,
  NavigateFunction,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./AppBar.scss";
import AsyncSelect from "react-select/async";
import { findBoardByTitleApi } from "api/boardApi";

const AppBar = () => {
  const location: Location = useLocation();

  const navigate: NavigateFunction = useNavigate();

  const [titleSearchBoard, setTitleSearchBoard] = useState<string>("");

  console.log(titleSearchBoard);

  const loadOptions = (searchValue: string, callback: Function) => {
    findBoardByTitleApi(searchValue)
      .then((data) => {
        let newArray: { label: string; value: string }[] = [];
        data.forEach((item: { _id: string; title: string }) =>
          newArray.push({ label: item.title, value: item._id })
        );
        callback(newArray);
      })
      .catch((error: any) => console.log(error));
  };

  const handleSelectBoard = (selectedOption: {
    label: string;
    value: string;
  }) => {
    navigate(`boards/${selectedOption ? selectedOption.value : null}`);
  };

  if (location.pathname === "/") {
    return null;
  } else {
    return (
      <nav className="navbar-app">
        <div className="navbar-app-actions">
          <i
            className="fa fa-home navbar-app-icon"
            onClick={() => navigate("/")}
          ></i>
          <i
            className="fa fa-bars navbar-app-icon"
            onClick={() => navigate("/boards")}
          >
            Boards
          </i>
          <AsyncSelect
            className="input-board"
            classNamePrefix="react-select"
            components={{
              DropdownIndicator: () => null,
              IndicatorSeparator: () => null,
            }}
            loadOptions={loadOptions}
            cacheOptions
            placeholder="Enter title board..."
            noOptionsMessage={() => "No Board Found"}
            loadingMessage={() => "searching ..."}
            onChange={(option: any) => handleSelectBoard(option)}
          />
        </div>
        <div className="navbar-app-trello">Trello</div>
      </nav>
    );
  }
};

export default AppBar;
