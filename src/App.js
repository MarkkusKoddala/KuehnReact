
import './App.css';
import {TablePage} from "./pages/TablePage";
import {Routes, Route, Link} from "react-router-dom";
import {DetailsPage} from "./pages/DetailsPage";


function App() {
  return (
      <Routes>
        <Route path="/" element={<TablePage/>}></Route>
        <Route path="/details" element={<DetailsPage/>}></Route>
      </Routes>
  );
}

export default App;
