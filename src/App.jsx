import { BrowserRouter as Router } from "react-router-dom";
import Game from "./pages/Game";

import "./App.css";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
    <Toaster/>
      <Router>
        <Game />
      </Router>
    </>
  );
}

export default App;
