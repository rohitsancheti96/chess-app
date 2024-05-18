import { MOVE } from "@/constants";
import { Chess, Color, PieceSymbol, Square } from "chess.js";
import React, { useState } from "react";

const Chessboard = ({
  chess,
  setBoard,
  board,
  socket,
}: {
  chess: Chess;
  setBoard: Function;
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket;
}) => {
  const [from, setFrom] = useState<Square | null>(null);
  const [to, setTo] = useState<Square | null>(null);

  return (
    <div className="flex justify-center text-black">
      <div id="chessboard" className="grid bg-white rounded-md">
        {board.map((row, i) => (
          <div key={i} className="flex">
            {row.map((square, j) => {
              return (
                <div
                  key={j}
                  onClick={() => {
                    const squareRepresentation = (String.fromCharCode(
                      97 + (j % 8)
                    ) +
                      "" +
                      (8 - i)) as Square;
                    console.log(squareRepresentation);
                    if (!from) {
                      setFrom(squareRepresentation);
                    } else {
                      socket.send(
                        JSON.stringify({
                          type: MOVE,
                          payload: {
                            move: {
                              from,
                              to: squareRepresentation,
                            },
                          },
                        })
                      );
                      chess.move({
                        from: from,
                        to: squareRepresentation,
                      });
                      setBoard(chess.board());
                      console.log({
                        from,
                        to: squareRepresentation,
                      });
                      setFrom(null);
                    }
                  }}
                  className={`w-16 h-16 flex justify-center items-center ${
                    (i + j) % 2 === 0 ? "bg-[#EBECD0]" : "bg-[#789556]"
                  }`}
                >
                  {square ? (
                    <img
                      className="w-8 h-8"
                      src={`/images/${
                        square?.color === "w"
                          ? square?.type
                          : `${square?.type} copy`
                      }.png`}
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chessboard;
