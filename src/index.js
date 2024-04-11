import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { HuddleProvider, HuddleClient } from "@huddle01/react";

export const huddleClient = new HuddleClient({
  projectId: process.env.REACT_APP_PROJECT_ID,
  options: {
    activeSpeakers: {
      size: 8,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HuddleProvider client={huddleClient}>
    <App />
  </HuddleProvider>
);
