import Header from "../components/Header/Header";
import CityOverview from "../components/CityOverview/CityOverview";
import Footer from "../components/Footer/Footer";
import Weathercard from "../components/WeatherCard/Weathercard";
import { useState } from "react";

function Homepage() {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div>
      <Header setSearchResults={setSearchResults} />
      <Weathercard searchResults={searchResults} />
      <CityOverview />
      <Footer />
    </div>
  );
}

export default Homepage;
