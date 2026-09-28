import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

import Detail from "./pages/Detail";
import Homepage from "./pages/homepage";

import "./App.css";

function App() {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <Homepage
              searchResults={searchResults}
              setSearchResults={setSearchResults}
            />
          }
        />
        <Route
          path="/detail"
          element={
            <Detail
              searchResults={searchResults}
              setSearchResults={setSearchResults}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
