import { Droppable } from "@hello-pangea/dnd";
import Item from "./Item";
import { Column as ColumnT, KanbanBoardData } from "../types";

type Props = {
  column: ColumnT;
  tasks: KanbanBoardData["tasks"];
};

export default function Column({ column, tasks }: Props) {
  return (
    <section className="border-2 border-gray-200 flex flex-col h-fit min-h-[125px] rounded-lg py-2 px-4">
      <h2 className="text-3xl font-marker font-bold mb-2">
        {column.title}
      </h2>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div className="grow" ref={provided.innerRef} {...provided.droppableProps}>
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
