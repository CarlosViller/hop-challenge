import { createContext, useState } from "react";
import { KanbanBoardData } from "../types";

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

type KanbanContextT = {
  data: KanbanBoardData;
  moveTask: (
    sourceColumnId: string,
    targetColumnId: string,
    sourceColumnIndex: number,
    targetColumnIndex: number
  ) => void;
  addTask: (content: string, targetColumnId: string) => void;
  deleteTask: (sourceColumnId: string, sourceColumnIndex: number) => void;
};

export const KanbanContext = createContext<KanbanContextT>(
  {} as KanbanContextT
);

export function KanbanProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<KanbanBoardData>(initialData);

  /**
   * Move elements between columns
   * @param sourceColumnId ID of the source column
   * @param targetColumnId ID of the destination column
   * @param sourceColumnIndex Element origin position in the origin column
   * @param targetColumnIndex  Target position to which the element in the target column will be moved to
   */
  function moveTask(
    sourceColumnId: string,
    targetColumnId: string,
    sourceColumnIndex: number,
    targetColumnIndex: number
  ) {
    // Create copies of both source and destination tasksIds to manipulate freely without mutating the state manually
    const newSourceIds = Array.from(data.columns[sourceColumnId].taskIds);
    const newDestinationIds =
      sourceColumnId === targetColumnId
        ? newSourceIds
        : Array.from(data.columns[targetColumnId].taskIds);

    // Remove the item from source and insert it in destination
    const [item] = newSourceIds.splice(sourceColumnIndex, 1);
    newDestinationIds.splice(targetColumnIndex, 0, item);

    // Mutate the state with the updated data
    setData((prevState) => ({
      ...prevState,
      columns: {
        ...prevState.columns,
        [sourceColumnId]: {
          ...prevState.columns[sourceColumnId],
          taskIds: newSourceIds,
        },
        [targetColumnId]: {
          ...prevState.columns[targetColumnId],
          taskIds: newDestinationIds,
        },
      },
    }));
  }

  /**
   * Create a new task in the target column
   * @param content Task's description
   * @param targetColumnId Target Column ID
   */
  function addTask(content: string, targetColumnId: string) {
    setData((prevState) => {
      const newTaskId = `task-${Object.keys(prevState.tasks).length + 1}`;
      return {
        ...prevState,
        tasks: {
          ...prevState.tasks,
          [newTaskId]: { id: newTaskId, content },
        },
        columns: {
          ...prevState.columns,
          [targetColumnId]: {
            ...prevState.columns[targetColumnId],
            taskIds: [...prevState.columns[targetColumnId].taskIds, newTaskId],
          },
        },
      };
    });
  }

  /**
   * Remove a task from a target column.
   * @param sourceColumnId
   * @param sourceColumnIndex
   */
  function deleteTask(sourceColumnId: string, sourceColumnIndex: number) {
    setData((prevState) => {
      const newColumnTasks = prevState.columns[sourceColumnId].taskIds.filter(
        (_, index) => index !== sourceColumnIndex
      );

      return {
        ...prevState,
        columns: {
          ...prevState.columns,
          [sourceColumnId]: {
            ...prevState.columns[sourceColumnId],
            taskIds: newColumnTasks,
          },
        },
      };
    });
  }

  return (
    <KanbanContext.Provider value={{ addTask, moveTask, data, deleteTask }}>
      {children}
    </KanbanContext.Provider>
  );
}
