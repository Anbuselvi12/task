import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import List from "../components/List/List";
import "./home.scss";

const initialState = {
  lists: {
    "list-1": {
      id: "list-1",
      title: "Open",
      cards: [
        {
          id: "1",
          title: "Arul",
          company: "Software Giant",
          designation: "Web developer",
          status: "join immediately",
        },
        {
          id: "2",
          title: "Lucky",
          company: "Element Web Development",
          designation: "Senior Web Developer",
          status: "Serving notice period",
        },
        {
          id: "3",
          title: "Gokul",
          company: "Macro Mobile Solutions",
          designation: "System Architect",
          status: "join within 1 month",
        },
      ],
    },

    "list-2": {
      id: "list-2",
      title: "Screening assessment",
      cards: [
        {
          id: "4",
          title: "Aruna",
          company: "Astray Applications",
          designation: "Programmer Analyst",
          status: "join immediately",
        },
        {
          id: "5",
          title: "Rithik",
          company: "Interstellar Software",
          designation: "Programmer Analyst",
          status: "Serving notice period",
        },
      ],
    },
    "list-3": {
      id: "list-3",
      title: "Technical round",
      cards: [
        {
          id: "6",
          title: "Vicky",
          company: "7th Tower Software",
          designation: ".NET Developer",
          status: "join immediately",
        },
        {
          id: "7",
          title: "Balaji",
          company: "Launchpad Web Developers",
          designation: "UI developer",
          status: "Serving notice period",
        },
      ],
    },
    "list-4": {
      id: "list-4",
      title: "Closed",
      cards: [
        {
          id: "8",
          title: "Anbu",
          company: "Ringer Software Co.",
          designation: "Application Developer",
          status: "join immediately",
        },
        {
          id: "9",
          title: "Selvi",
          company: "Ringer Software Co.",
          designation: "Application Developer",
          status: "Serving notice period",
        },
      ],
    },
  },
  listIds: ["list-1", "list-2", "list-3", "list-4"],
};

export default function Home() {
  const [data, setData] = useState(initialState);
  const [query, setQuery] = useState("");

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (type === "list") {
      const newListIds = data.listIds;

      newListIds.splice(source.index, 1);
      newListIds.splice(destination.index, 0, draggableId);

      const newState = {
        ...data,
        listIds: newListIds,
      };
      setData(newState);
      window.localStorage.setItem("dataKanban", JSON.stringify(newState));

      return;
    }

    const sourceList = data.lists[source.droppableId];
    const destinationList = data.lists[destination.droppableId];
    const draggingCard = sourceList.cards.filter((card) => card.id === draggableId)[0];

    if (source.droppableId === destination.droppableId) {
      sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, draggingCard);

      const newState = {
        ...data,
        lists: {
          ...data.lists,
          [sourceList.id]: destinationList,
        },
      };
      setData(newState);
      window.localStorage.setItem("dataKanban", JSON.stringify(newState));
    } else {
      sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, draggingCard);

      const newState = {
        ...data,
        lists: {
          ...data.lists,
          [sourceList.id]: sourceList,
          [destinationList.id]: destinationList,
        },
      };

      setData(newState);
      window.localStorage.setItem("dataKanban", JSON.stringify(newState));
    }
  };

  const FilteredData = (list) => {
    let data = JSON.parse(JSON.stringify(list));
    if (query !== "" && list.cards) {
      data.cards = list.cards.filter((e) => {
        return e.title.toLowerCase().includes(query.toLocaleLowerCase());
      });
    }
    return data;
  };

  return (
    <>
      <div className="search-container">
        <input
          type="search"
          className="search"
          placeholder="Search..."
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="app" type="list" direction="horizontal">
          {(provided) => (
            <div className="wrapper" ref={provided.innerRef} {...provided.droppableProps}>
              {data.listIds.map((listId, index) => {
                const list = data.lists[listId];
                return <List list={FilteredData(list)} key={listId} index={index} />;
              })}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}
