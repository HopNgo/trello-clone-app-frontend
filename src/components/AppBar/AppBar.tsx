import React from "react";
import { Form } from "react-bootstrap";
import "./AppBar.scss";

const AppBar = () => {
  return (
    <nav className="navbar-app">
      <div className="navbar-app-actions">
        <i className="fa fa-bars navbar-app-icon" aria-hidden="true"></i>
        <Form.Control
          type="text"
          size="sm"
          placeholder="Enter title board..."
          className="input-board"
        />
        <i className="fa fa-search navbar-app-icon"></i>
      </div>
      <div className="navbar-app-trello">Trello Clone App By Hop Ngo</div>
    </nav>
  );
};

export default AppBar;
