import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Game, Home } from "./pages";
import Temp from "./pages/Temp";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/game/:id" exact element={<Game />} />
          <Route path="/temp/:id" exact element={<Temp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
