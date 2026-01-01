
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar.jsx';
import Dashboard from './Components/Dashboard.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/*" element={<Navbar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
