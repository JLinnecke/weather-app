import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import WeatherCard from "../components/WeatherCard/WeatherCard";

function Detail({ searchResults, setSearchResults }) {
  return (
    <div>
      <Header setSearchResults={setSearchResults} />
      <WeatherCard searchResults={searchResults} />
      <Footer />
    </div>
  );
}

export default Detail;
