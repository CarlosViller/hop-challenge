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
  currentColumnId: Column["id"];
};

export default function ItemOptions({
  anchorEl,
  handleClose,
  handleMove,
  currentColumnId,
}: Props) {
  const [move, setMove] = useState(false);

  const { data } = useContext(KanbanContext);

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
          <button onClick={handleClose}>
            <img width={32} src={cancelBlueIcon} alt="Delete" />
          </button>
        </section>
      ) : (
        <ul className="flex flex-col gap-2 px-2 py-1">
          {data.columnsOrder.map((targetColumnId) => {
            if (targetColumnId === currentColumnId) return null;
            return (
              <li key={targetColumnId}>
                <button
                  className="text-lg"
                  onClick={() =>
                    handleMove(
                      targetColumnId,
                      data.columns[targetColumnId].taskIds.length // Move the element to the last position in the target column.
                    )
                  }
                >
                  {data.columns[targetColumnId].title}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </Popover>
  );
}
