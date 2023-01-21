import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./screen/main";
import Admin from "./screen/admin";
import Login from "./screen/auth/login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
