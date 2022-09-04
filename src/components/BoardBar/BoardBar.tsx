import React from "react";
import "./BoardBar.scss";

interface BoardBarProps {
  title: string;
}

const BoardBar: React.FC<BoardBarProps> = ({ title }) => {
  return <nav className="navbar-board">{title}</nav>;
};

export default BoardBar;
