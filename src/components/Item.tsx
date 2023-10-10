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
          className="border-[1px] p-2 rounded-lg border-gray-200 my-2"
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
