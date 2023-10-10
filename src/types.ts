export type KanbanBoardData = {
  tasks: Record<string, Task>;
  columns: Record<string, Column>;
  columnsOrder: Column["id"][];
};

export type Task = {
  id: string;
  content: string;
};

export type Column = {
  id: string;
  title: string;
  taskIds: Task["id"][];
};
