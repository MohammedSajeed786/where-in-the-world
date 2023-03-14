import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Countries from "./components/countries/Countries";
import { Routes, Route } from "react-router-dom";
import Country from "./components/country/Country";
import ThemeContextProvider from "./context/ThemeContextProvider";
function App() {
  return (
    <>
      <ThemeContextProvider>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Countries></Countries>}></Route>
          <Route path="/country/:name" element={<Country></Country>}></Route>
        </Routes>
        {/* <Countries></Countries> */}
      </ThemeContextProvider>
    </>
  );
}

export default App;
