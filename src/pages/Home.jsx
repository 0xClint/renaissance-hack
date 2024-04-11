import { useLocalPeer } from "@huddle01/react/hooks";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Header } from "../components";
import { bgIcon } from "../assets";
import useStore from "../hooks/useStore";

const Home = () => {
  const [roomId, setRoomId] = useState("");
  const [profileMenu, setProfileMenu] = useState(false);
  const [controlMenu, setControlMenu] = useState(false);
  const [displayName, setDisplayName] = useState("Harry");
  const navigate = useNavigate();
  const userName = useStore((state) => state.userName);
  const [profileName, setProfileName] = useState("");
  const setUserName = useStore((state) => state.setUserName);
  console.log(userName);

  const { metadata, updateMetadata } = useLocalPeer({
    displayName,
    avatarUrl: "#",
  });
  const handleCreate = async () => {
    if (!window.localStorage.getItem("user_profile")) {
      setProfileMenu(true);
      return;
    }

    const response = await fetch(
      "https://api.huddle01.com/api/v1/create-room",
      {
        method: "POST",
        body: JSON.stringify({
          title: "Huddle01 Room",
        }),
        headers: {
          "Content-type": "application/json",
          "x-api-key": process.env.REACT_APP_API_KEY,
        },
        cache: "no-cache",
      }
    );
    const data = await response.json();
    setRoomId(data.data.roomId);
    navigate(`/game/${data.data.roomId}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    window.localStorage.setItem("user_profile", profileName);
    setProfileMenu(false);
  };
  const handleIDSubmit = (event) => {
    event.preventDefault();
    navigate(`/game/${roomId}`);
  };

  useEffect(() => {
    const setUserData = () => {
      const data = window.localStorage.getItem("user_profile");
      if (data) setUserName(data);
    };
    setUserData();
  }, [profileMenu]);

  return (
    <div>
      <img src={bgIcon} className="absolute -z-10  w-[100vw]" />
      <Header />
      {profileMenu && (
        <div className="control setting menu absolute h-screen w-screen make-flex">
          <div>
            <div
              className="absolute w-[395px] make-flex justify-end px-2 pt-2 cursor-pointer"
              onClick={() => setProfileMenu(false)}
            >
              <span className="font-bold">X</span>
            </div>
            <form
              onSubmit={handleSubmit}
              className=" z-100 menu-container w-[400px]  py-8 px-8 card-container flex flex-col gap-4"
            >
              <h2 className="text-xl font-semibold">Write your Profile game</h2>
              <input
                className="border border-black p-2 rounded-md block w-full"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                required
                placeholder="write profile name "
              />
              <button
                type="submit"
                className="btn bg-gray-600 text-white w-32 mx-auto hover:bg-gray-700"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="make-flex w-screen h-screen flex-col">
        <div className="w-[600px] mx-auto h-screen flex-col make-flex justify-start pt-32 gap-2">
          <h2 className="font-bold text-[40px] text-center my-8 make-flex">
            Huddle Blitz
          </h2>
          <button
            className="btn w-[400px] hover:bg-[#f4f4f4] text-base"
            onClick={() => handleCreate()}
          >
            Create Room
          </button>
          <form
            onSubmit={handleIDSubmit}
            className="btn w-[400px] p-0 hover:bg-[#f4f4f4] flex justify-between text-base"
          >
            <input
              type="text"
              value={roomId}
              required
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Enter room Id"
              className="p-2 px-2 border border-black w-3/4 rounded-tl-md rounded-bl-md"
            />
            <button type="submit" className="w-1/4 make-flex">
              Join Room
            </button>
          </form>
          <div className="make-flex">
            <button
              onClick={() => setControlMenu(true)}
              className="btn w-[400px] hover:bg-[#f4f4f4] text-base"
            >
              Game Settings
            </button>
            {controlMenu && (
              <div className="control z-10 setting menu absolute top-[500px]]">
                <div
                  className="absolute right-1 justify-end px-2 pt-2 cursor-pointer"
                  onClick={() => setControlMenu(false)}
                >
                  <span className=" font-bold">X</span>
                </div>
                <ul className=" z-100 menu-container w-[500px]  py-12 card-container make-flex flex-col gap-8 ">
                  <li className=" flex justify-between w-[80%] ">
                    <div>W</div>
                    <div className="">Forward</div>
                  </li>
                  <li className=" flex justify-between w-[80%]">
                    <div className="">A</div>
                    <div className="">Leftward</div>
                  </li>
                  <li className=" flex justify-between w-[80%]">
                    <div className="">D</div>
                    <div className="">Backward</div>
                  </li>
                  <li className=" flex justify-between w-[80%]">
                    <div className="">S</div>
                    <div className="">Forward</div>
                  </li>

                  <li className=" flex justify-between w-[80%]">
                    <div className="">Space</div>
                    <div className="">Jump</div>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <button
            onClick={() => setProfileMenu(true)}
            className="btn w-[400px] hover:bg-[#f4f4f4] text-base"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
