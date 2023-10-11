import { render, screen } from "@testing-library/react";
import App from "../App";
import { KanbanProvider } from "../context/KanbanContext";
import { describe, expect, test } from "vitest/dist/index.js";
import userEvent from "@testing-library/user-event";

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
  test.todo("Eliminar tarjeta");
  test.todo("Mover tarjeta usando boton");
  test.todo("Mover tarjeta usando Drag & Drop");
  test.todo("Mover tarjeta usando Drag & Drop y boton");
});
