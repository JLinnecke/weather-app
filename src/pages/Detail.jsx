import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import WeatherCard from "../components/WeatherCard/WeatherCard";

function Detail({ searchResults }) {
  return (
    <div>
      <Header />
      <WeatherCard searchResults={searchResults} />
      <Footer />
    </div>
  );
}

export default Detail;
