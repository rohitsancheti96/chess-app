import React, { useEffect, useState } from "react";
import Chessboard from "../components/Chessboard";
import { Button } from "@/components/ui/button";
import { useSocket } from "@/hooks/useSocket";
import { GAME_OVER, INIT_GAME, MOVE } from "@/constants";
import { Chess } from "chess.js";

function Game() {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!socket) {
      return;
    }
    console.log("here");
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      switch (message.type) {
        case INIT_GAME:
          setBoard(chess.board());
          console.log("Game initialized");
          setStarted(true);
          break;
        case MOVE:
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());
          console.log("Move made");
          break;
        case GAME_OVER:
          break;
        default:
          break;
      }
    };
  }, [socket]);

  if (!socket) return <div>Connecting...</div>;
  return (
    <div className="text-white flex justify-center gap-8 pt-8">
      <Chessboard
        chess={chess}
        setBoard={setBoard}
        board={board}
        socket={socket}
      />
      {!started && (
        <Button
          onClick={() => {
            socket.send(
              JSON.stringify({
                type: INIT_GAME,
              })
            );
          }}
        >
          Play
        </Button>
      )}
    </div>
  );
}

export default Game;
