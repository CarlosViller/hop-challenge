import { useContext, useRef, useState } from "react";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import checkIcon from "../assets/check.svg";
import cancelIcon from "../assets/cancel.svg";
import { Column } from "../types";
import { KanbanContext } from "../context/KanbanContext";

type Props = {
  columnId: Column["id"];
};

export default function AddItemButton({ columnId }: Props) {
  const [content, setContent] = useState("");
  const [active, setActive] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const { addTask } = useContext(KanbanContext);

  function handleClose() {
    setActive(false);
    setContent("");
  }

  return active ? (
    <section className="flex flex-col gap-1">
      <TextareaAutosize
        ref={textAreaRef}
        minRows={3}
        value={content}
        placeholder="Añade tu tarea aquí"
        onChange={(e) => setContent(e.target.value)}
        className="auto-height-form item overflow-hidden focus-within:outline-none"
      ></TextareaAutosize>
      <section className="flex items-center gap-2 justify-center">
        <button
          className="round-btn disabled:opacity-50"
          disabled={content === ""}
          onClick={() => {
            addTask(content, columnId);
            handleClose();
          }}
        >
          <img width={32} src={checkIcon} alt="Confirm task creation" />
        </button>
        <button className="round-btn" onClick={handleClose}>
          <img width={32} src={cancelIcon} alt="Cancel task creation" />
        </button>
      </section>
    </section>
  ) : (
    <button
      className="primary-btn w-fit mx-auto my-3"
      onClick={() => {
        setActive(true);
        if (textAreaRef.current) {
          textAreaRef.current.focus();
        }
      }}
    >
      Añadir task
    </button>
  );
}
