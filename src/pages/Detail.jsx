import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Weathercard from "../components/WeatherCard/Weathercard";

function Detail({ searchResults }) {
  return (
    <div>
      <Header />
      <Weathercard searchResults={searchResults} />
      <Footer />
    </div>
  );
}

export default Detail;
