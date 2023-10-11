import { Droppable } from "@hello-pangea/dnd";
import Item from "./Item";
import { Column as ColumnT, KanbanBoardData } from "../types";
import AddItemButton from "./AddItemButton";

type Props = {
  column: ColumnT;
  tasks: KanbanBoardData["tasks"];
  addTask: (content: string) => void;
};

export default function Column({ column, tasks, addTask }: Props) {
  return (
    <section className="bg-gray-100 flex flex-col h-fit min-h-[125px] rounded-lg py-2 px-4">
      <h2 className="text-3xl font-marker font-bold mb-3 text-background">
        {column.title}
      </h2>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            className="grow"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {column.taskIds.map((taskId, index) => (
              <Item task={tasks[taskId]} index={index} key={taskId} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {column.id === "column-1" && <AddItemButton addTask={addTask} />}
    </section>
  );
}
