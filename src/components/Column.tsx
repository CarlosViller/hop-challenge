import { Droppable } from "@hello-pangea/dnd";
import Item from "./Item";
import { Column as ColumnT } from "../types";
import AddItemButton from "./AddItemButton";
import { useContext } from "react";
import { KanbanContext } from "../context/KanbanContext";

type Props = {
  column: ColumnT;
};

export default function Column({ column }: Props) {
  const { data } = useContext(KanbanContext);

  return (
    <section className="bg-gray-100 flex flex-col h-fit min-h-[125px] rounded-lg py-2 px-4">
      <h2 className="text-3xl font-marker font-bold mb-3 text-background">
        {column.title}
      </h2>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <ul
            className="grow"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {column.taskIds.map((taskId, index) => (
              <Item
                columnId={column.id}
                task={data.tasks[taskId]}
                index={index}
                key={taskId}
              />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
      {column.id === "column-1" && <AddItemButton columnId={column.id} />}
    </section>
  );
}
