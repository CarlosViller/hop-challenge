import { Droppable } from "@hello-pangea/dnd";
import Item from "./Item";
import { Column as ColumnT, KanbanBoardData } from "../types";

type Props = {
  column: ColumnT;
  tasks: KanbanBoardData["tasks"];
};

export default function Column({ column, tasks }: Props) {
  return (
    <section className="border-2 border-gray-200">
      <h2 className="px-2 text-2xl font-indie font-bold mb-2">
        {column.title}
      </h2>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {column.taskIds.map((taskId, index) => (
              <Item task={tasks[taskId]} index={index} key={taskId} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </section>
  );
}
