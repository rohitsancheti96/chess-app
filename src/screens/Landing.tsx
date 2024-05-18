import React from "react";
import ChessImg from "../assets/chess.png";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

function Landing() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center">
      <div className="pt-4 max-w-screen-lg">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex justify-center">
            <img className="max-w-96" src={ChessImg} alt="chess image" />
          </div>
          <div className="">
            <h1 className="text-3xl font-bold text-white">
              Play Chess Online with Friends!
            </h1>
            <div className="mt-4">
              <Button onClick={() => navigate("/game")}>Start Game</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
