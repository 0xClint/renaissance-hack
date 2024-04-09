import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Game, Home } from "./pages";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/game" exact element={<Game />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
