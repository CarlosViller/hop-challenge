import { Draggable } from "@hello-pangea/dnd";
import { Column, Task } from "../types";
import { useContext, useState } from "react";
import ItemOptions from "./ItemOptions";
import optionsIcon from "../assets/options.svg";
import { KanbanContext } from "../context/KanbanContext";

type Props = {
  index: number;
  task: Task;
  columnId: Column["id"];
};

export default function Item({ task, index, columnId }: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { moveTask } = useContext(KanbanContext);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Draggable index={index} draggableId={task.id}>
      {(provided) => (
        <li
          className="item bg-white"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <ItemOptions
            handleClose={handleClose}
            anchorEl={anchorEl}
            currentColumnId={columnId}
            handleMove={(targetColumnId: string, targetIndex: number) => {
              moveTask(columnId, targetColumnId, index, targetIndex);
            }}
          />
          <button className="w-fit ml-auto block p-1" onClick={handleClick}>
            <img width={16} src={optionsIcon} alt="Open options" />
          </button>
          <p>{task.content}</p>
        </li>
      )}
    </Draggable>
  );
}
