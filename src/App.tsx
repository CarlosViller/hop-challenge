import { useState } from "react";
import Column from "./components/Column";
import Header from "./components/Header";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { KanbanBoardData } from "./types";

const initialData: KanbanBoardData = {
  tasks: {
    "task-1": { id: "task-1", content: "hola" },
    "task-2": { id: "task-2", content: "chao" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Sin realizar",
      taskIds: ["task-1", "task-2"],
    },
  },
  columnsOrder: ["column-1"],
};

function App() {
  const [data, setData] = useState<KanbanBoardData>(initialData);
  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination || source.index === destination.index) return;

    const newIds = Array.from(data.columns[source.droppableId].taskIds);

    const [item] = newIds.splice(source.index, 1);
    newIds.splice(destination.index, 0, item);

    setData((prevState) => ({
      ...prevState,
      columns: {
        ...prevState.columns,
        [source.droppableId]: {
          ...prevState.columns[source.droppableId],
          taskIds: newIds,
        },
      },
    }));
  };

  return (
    <div>
      <Header />
      <main className="max-w-screen-xl mx-auto my-10">
        <DragDropContext onDragEnd={handleDragEnd}>
          <section className="grid grid-cols-3 gap-5">
            {data.columnsOrder.map((columnId) => (
              <Column
                key={columnId}
                column={data.columns[columnId]}
                tasks={data.tasks}
              />
            ))}
          </section>
        </DragDropContext>
      </main>
    </div>
  );
}

export default App;
