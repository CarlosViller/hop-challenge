import { KanbanBoardData } from "./types";

export const initialData: KanbanBoardData = {
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