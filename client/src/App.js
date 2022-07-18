import { Routes, Route } from "react-router";

import "./App.css";
import Registration from "./components/Register.jsx";
import Login from "./components/Login.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Registration />} />
      </Routes>
    </div>
  );
}

export default App;
