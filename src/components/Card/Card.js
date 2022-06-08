import React from "react";
import { Draggable } from "react-beautiful-dnd";
import "./card.scss";

export default function Card({ card, index }) {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
          <div className="card">
            <div className="card__container">
              <h1 className="card__title">{card.title}</h1>
              <p className="card__description">{card.company}</p>
              <p className="card__position">{card.designation}</p>
            </div>
            <div className="card__status">status - {card.status}</div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
