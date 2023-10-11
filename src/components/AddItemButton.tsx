import { useRef, useState } from "react";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import checkIcon from "../assets/check.svg";
import cancelIcon from "../assets/cancel.svg";

type Props = {
  addTask: (content: string) => void;
};

export default function AddItemButton({ addTask }: Props) {
  const [content, setContent] = useState("");
  const [active, setActive] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

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
          className="round-btn"
          onClick={() => addTask(content)}
        >
          <img width={32} src={checkIcon} alt="confirm" />
        </button>
        <button
          className="round-btn"
          onClick={() => {
            setActive(false);
            setContent("");
          }}
        >
          <img width={32} src={cancelIcon} alt="cancel" />
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
