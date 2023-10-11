import { Popover } from "@mui/material";
import rightArrowIcon from "../assets/right arrow.svg";
import cancelBlueIcon from "../assets/cancel-blue.svg";
import { useContext, useState } from "react";
import { KanbanContext } from "../context/KanbanContext";
import { Column } from "../types";

type Props = {
  anchorEl: HTMLButtonElement | null;
  handleClose: () => void;
  handleMove: (targetColumnId: string, targetIndex: number) => void;
  handleDelete: () => void;
  currentColumnId: Column["id"];
};

export default function ItemOptions({
  anchorEl,
  handleClose,
  handleMove,
  handleDelete,
  currentColumnId,
}: Props) {
  const { data } = useContext(KanbanContext);
  const [move, setMove] = useState(false);

  const { columns, columnsOrder } = data;

  return (
    <Popover
      id="popover"
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={() => {
        handleClose();
        setMove(false);
      }}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      {!move ? (
        <section className="flex gap-2 px-2 py-1">
          <button onClick={() => setMove(true)}>
            <img width={32} src={rightArrowIcon} alt="Move" />
          </button>
          <button onClick={handleDelete}>
            <img width={32} src={cancelBlueIcon} alt="Delete" />
          </button>
        </section>
      ) : (
        <ul className="flex flex-col gap-2 px-2 py-1">
          {columnsOrder.map((targetColumnId) => {
            if (targetColumnId === currentColumnId) return null;
            return (
              <li key={targetColumnId}>
                <button
                  className="text-lg"
                  onClick={() =>
                    handleMove(
                      targetColumnId,
                      columns[targetColumnId].taskIds.length // Move the element to the last position in the target column.
                    )
                  }
                >
                  {columns[targetColumnId].title}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </Popover>
  );
}
