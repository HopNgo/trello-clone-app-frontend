import CardColumn from "components/CardColumn/CardColumn";
import React from "react";
import "./BoardContent.scss";

const BoardContent = () => {
  return (
    <div className="board-content">
      <CardColumn />
      <CardColumn />
      <CardColumn />
      <CardColumn />
      <CardColumn />
      <CardColumn />
      <CardColumn />
    </div>
  );
};

export default BoardContent;
