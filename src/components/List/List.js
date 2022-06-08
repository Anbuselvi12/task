import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Card from "../Card/Card";
import Title from "../Title/Title";
import "./list.scss";

export default function List({ list, index }) {
  return (
    <Draggable draggableId={list.id} index={index}>
      {(groupProvided) => (
        <div {...groupProvided.draggableProps} ref={groupProvided.innerRef}>
          <div className="list-cards" {...groupProvided.dragHandleProps}>
            <div className="title-list">
              <Title title={list.title} listId={list.id} />
            </div>
            <div className="container-cards">
              <Droppable droppableId={list.id} type="task">
                {(childProvided) => (
                  <div ref={childProvided.innerRef} {...childProvided.droppableProps} className="card-container">
                    {list.cards.map((card, cardIndex) => (
                      <Card key={card.id} card={card} index={cardIndex} listId={list.id} />
                    ))}
                    {childProvided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
