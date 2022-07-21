import { Routes, Route } from "react-router";

import "./App.css";
import NavBar from './NavBar';
import HomeComponent from './components/HomeComponent.js';
import Registration from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import DashboardComponent from "./components/DashboardComponent.js";

function App() {
  return (
    <div className="App">
      <h1>
        Mern App
      </h1>
      <Routes>
      <Route path='/' element={<NavBar />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="home" element={<HomeComponent/>} />
        <Route path="dashboard" element={<DashboardComponent/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
