
import { Link } from "react-router-dom";
import React from "react";
import { Header } from "../components";
import { bgIcon } from "../assets";
import game1Image from "../assets/game_logo.jpg"; 
import game2Image from "../assets/coming_soon.jpg"; 

const Home = () => {
  const games = [
    { name: "Blitz Run", image: game1Image, url: "home" },
    { name: "Other Games", image: game2Image, url: "#" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <img src={bgIcon} className="absolute -z-10 w-full h-full object-cover" />
      <Header />

      <div className="mt-8 mb-4 max-w-4xl w-full bg-white bg-opacity-80 rounded-lg shadow-lg p-6">
        <h2
          className="font-bold text-[40px] text-center my-5 make-flex text-white"
          style={{
            textShadow:
              " -1px -1px 0 #000, 1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000",
          }}
        >
          Games
        </h2>
        <div className="flex overflow-x-auto space-x-4 justify-center">
          {games.map((game, index) => (
            <Link
              to={`/${game.url}`}
              key={index}
              className="flex-shrink-0 w-64 cursor-pointer"
            >
              <img
                src={game.image}
                alt={game.name}
                className="w-full h-40 object-cover rounded-lg shadow-md"
              />
              <div className="mt-2">
                <p className="text-lg  text-gray-800 text-center btn hover:bg-[#f4f4f4]">
                  {game.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
