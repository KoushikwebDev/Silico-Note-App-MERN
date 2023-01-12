import { Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import LoginForm from "./Components/LoginForm";
import Registerform from "./Components/Registerform";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Registerform />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
