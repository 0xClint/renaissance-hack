import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Game, Home, Test } from "./pages";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/home" exact element={<Home />} />
          <Route path="/game/:id" exact element={<Game />} />
          <Route path="/" exact element={<Test />} />
          {/* <Route path="/temp/:id" exact element={<Temp />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
