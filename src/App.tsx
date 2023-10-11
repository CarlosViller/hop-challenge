import { useState } from "react";
import Column from "./components/Column";
import Header from "./components/Header";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { KanbanBoardData } from "./types";

const initialData: KanbanBoardData = {
  tasks: {
    "task-1": { id: "task-1", content: "Llamada de equipo" },
    "task-2": {
      id: "task-2",
      content: "Implementar sistema de seguimiento de paquetes",
    },
    "task-3": { id: "task-3", content: "Realizar monitoreo del logs" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Sin realizar",
      taskIds: ["task-1", "task-2"],
    },
    "column-2": {
      id: "column-2",
      title: "En progreso",
      taskIds: ["task-3"],
    },
    "column-3": {
      id: "column-3",
      title: "Terminado",
      taskIds: [],
    },
  },
  columnsOrder: ["column-1", "column-2", "column-3"],
};

function App() {
  const [data, setData] = useState<KanbanBoardData>(initialData);

  /**
   * Move elements between columns
   * @param result
   * @returns
   */
  function handleDragEnd(result: DropResult) {
    const { destination, source } = result;

    // Check if the item was dragged into a valid column and into a different position
    if (
      !destination ||
      (source.index === destination.index &&
        source.droppableId === destination.droppableId)
    ) {
      return;
    }

    // Create copies of both source and destination tasksIds to manipulate freely without mutating the state manually
    const newSourceIds = Array.from(data.columns[source.droppableId].taskIds);
    const newDestinationIds =
      source.droppableId === destination.droppableId
        ? newSourceIds
        : Array.from(data.columns[destination.droppableId].taskIds);

    // Remove the item from source and insert it in destination
    const [item] = newSourceIds.splice(source.index, 1);
    newDestinationIds.splice(destination.index, 0, item);

    // Mutate the state with the updated data
    setData((prevState) => ({
      ...prevState,
      columns: {
        ...prevState.columns,
        [source.droppableId]: {
          ...prevState.columns[source.droppableId],
          taskIds: newSourceIds,
        },
        [destination.droppableId]: {
          ...prevState.columns[destination.droppableId],
          taskIds: newDestinationIds,
        },
      },
    }));
  }

  return (
    <div>
      <Header />
      <main className="max-w-screen-xl mx-auto my-10">
        <DragDropContext onDragEnd={handleDragEnd}>
          <section className="grid grid-cols-3 gap-5 place-content-start">
            {data.columnsOrder.map((columnId) => (
              <Column
                key={columnId}
                column={data.columns[columnId]}
                tasks={data.tasks}
                addTask={(content: string) => {
                  setData((prevState) => {
                    const newTaskId = "task" + prevState.tasks.length;
                    return {
                      ...prevState,
                      tasks: {
                        ...prevState.tasks,
                        [newTaskId]: { id: newTaskId, content },
                      },
                      columns: {
                        ...prevState.columns,
                        [columnId]: {
                          ...prevState.columns[columnId],
                          taskIds: [
                            ...prevState.columns[columnId].taskIds,
                            newTaskId,
                          ],
                        },
                      },
                    };
                  });
                }}
              />
            ))}
          </section>
        </DragDropContext>
      </main>
    </div>
  );
}

export default App;
