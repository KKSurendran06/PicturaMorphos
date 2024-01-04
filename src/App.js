import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './components/Landing';
import Editor from './components/Editor';
import Gallery from './components/Gallery';
import './App.css';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Editor" element={<Editor />} />
        <Route path="/Gallery" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
