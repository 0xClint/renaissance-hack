import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HuddleProvider, HuddleClient } from '@huddle01/react';
 
const huddleClient = new HuddleClient({
  projectId: "WDRdP3WkZSamuUW7zzcfBZw-EBSzdwsJ",
  options: {
    activeSpeakers: {
      size: 8,
    },
  },
});

// projectId = WDRdP3WkZSamuUW7zzcfBZw-EBSzdwsJ
// api-key = qX58fmJMe7G498Xb3tQ2Ifxt-wjiYouK
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HuddleProvider client={huddleClient}>
  <App />
</HuddleProvider>
);

