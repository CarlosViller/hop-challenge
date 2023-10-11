import { Draggable } from "@hello-pangea/dnd";
import { Task } from "../types";

type Props = {
  index: number;
  task: Task;
};

export default function Item({ task, index }: Props) {
  return (
    <Draggable index={index} draggableId={task.id}>
      {(provided) => (
        <p
          className="item bg-white"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {task.content}
        </p>
      )}
    </Draggable>
  );
}
