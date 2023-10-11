import { Droppable } from "@hello-pangea/dnd";
import Item from "./Item";
import { Column as ColumnT } from "../types";
import AddItemButton from "./AddItemButton";
import { useContext } from "react";
import { KanbanContext } from "../context/KanbanContext";

type Props = {
  column: ColumnT;
  index: number;
};

export default function Column({ column, index }: Props) {
  const { data } = useContext(KanbanContext);

  const { title, taskIds, id } = column;

  return (
    <section className="bg-gray-100 flex flex-col h-fit min-h-[125px] rounded-lg py-2 px-4 max-h-[80vh] overflow-x-hidden overflow-y-auto">
      <h2 className="text-3xl font-marker font-bold mb-3 text-secondary">
        {title}
      </h2>
      <Droppable droppableId={id}>
        {(provided) => (
          <ul
            aria-label={`${column.title} column`}
            className="grow"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {taskIds.map((taskId, index) => (
              <Item
                columnId={id}
                task={data.tasks[taskId]}
                index={index}
                key={taskId}
              />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
      {index === 0 && <AddItemButton columnId={id} />}
    </section>
  );
}
