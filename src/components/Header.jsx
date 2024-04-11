import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";

import { Link } from "react-router-dom";
import useStore from "../hooks/useStore";

const Header = () => {
  const [loader, setLoader] = useState(false);
  const userName = useStore((state) => state.userName);

  return (
    <div className="absolute z-10 top-0 w-screen flex flex-col">
      <div className="w-full flex text-[2rem] justify-between items-center h-16 px-5 ">
        <div className="flex gap-4 items-center">
          <div className="leading-7 m-0 p-0 font-bold text-white">
            <Link to="/"> Huddle Blitz</Link>
          </div>
        </div>

        <div className="flex items-center justify-start gap-3 btn text-lg ">
          <FaUser />
          <div className=" font-semibold">{userName ? userName : "Harry"}</div>
        </div>
      </div>
      {/* {loader && <Loader />} */}
    </div>
  );
};

export default Header;
