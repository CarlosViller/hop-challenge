import { render } from "@testing-library/react";
import App from "../App";
import { KanbanProvider } from "../context/KanbanContext";
import { describe, test } from "vitest/dist/index.js";

describe("App", () => {
  test("renders headline", () => {
    render(
      <KanbanProvider>
        <App />
      </KanbanProvider>
    );
  });
});
