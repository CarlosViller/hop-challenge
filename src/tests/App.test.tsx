import { render, screen, within } from "@testing-library/react";
import App from "../App";
import { KanbanProvider } from "../context/KanbanContext";
import { describe, expect, test } from "vitest/dist/index.js";
import userEvent from "@testing-library/user-event";
import { initialData } from "../constants";

describe("Kanban board", () => {
  test("Render App", () => {
    render(
      <KanbanProvider>
        <App />
      </KanbanProvider>
    );
  });

  test("Añadir nueva tarjeta", async () => {
    render(
      <KanbanProvider>
        <App />
      </KanbanProvider>
    );

    await userEvent.click(screen.getByRole("button", { name: "Añadir task" }));

    await userEvent.type(
      screen.getByPlaceholderText("Añade tu tarea aquí"),
      "Esta es mi nueva tarea"
    );

    await userEvent.click(
      screen.getByRole("button", { name: "Confirm task creation" })
    );

    expect(screen.getByText("Esta es mi nueva tarea")).toBeInTheDocument();
  });
  test("Eliminar tarjeta", async () => {
    render(
      <KanbanProvider>
        <App />
      </KanbanProvider>
    );

    // Get first task
    const task = initialData.tasks[Object.keys(initialData.tasks)[0]];

    await userEvent.click(
      screen.getByRole("button", {
        name: `Open options for "${task.content}" task`,
      })
    );

    await userEvent.click(screen.getByRole("button", { name: "Delete" }));

    expect(screen.queryByText(task.content)).not.toBeInTheDocument();
  });
  test("Mover tarjeta usando boton", async () => {
    render(
      <KanbanProvider>
        <App />
      </KanbanProvider>
    );

    // Get first task
    const task = initialData.tasks[Object.keys(initialData.tasks)[0]];

    await userEvent.click(
      screen.getByRole("button", {
        name: `Open options for "${task.content}" task`,
      })
    );

    await userEvent.click(screen.getByRole("button", { name: "Move" }));
    await userEvent.click(screen.getByRole("button", { name: "En progreso" }));

    const targetColumn = screen.getByRole("list", {
      name: "En progreso column",
    });

    expect(within(targetColumn).getByText(task.content)).toBeInTheDocument();
  });
});
