import { useContext } from "react";
import Column from "./components/Column";
import Header from "./components/Header";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { KanbanContext } from "./context/KanbanContext";

function App() {
  const { data, moveTask } = useContext(KanbanContext);
  /**
   * Perform Drag & Drop movement
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

    moveTask(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index
    );
  }

  return (
    <div>
      <Header />
      <main className="max-w-screen-xl mx-auto my-10">
        <DragDropContext onDragEnd={handleDragEnd}>
          <section className="grid grid-cols-3 gap-5 place-content-start">
            {data.columnsOrder.map((columnId) => (
              <Column key={columnId} column={data.columns[columnId]} />
            ))}
          </section>
        </DragDropContext>
      </main>
    </div>
  );
}

export default App;
