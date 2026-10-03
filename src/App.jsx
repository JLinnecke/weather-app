import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

import Detail from "./pages/Detail";
import Homepage from "./pages/Homepage";

import "./App.css";
import PageNotFound from "./components/PageNotFound/PageNotFound";

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
          path="/:city/:lat/:lon"
          element={
            <Detail
              searchResults={searchResults}
              setSearchResults={setSearchResults}
            />
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
