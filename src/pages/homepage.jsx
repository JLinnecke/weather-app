import Header from "../components/Header/Header";
import CityOverview from "../components/CityOverview/CityOverview";
import Footer from "../components/Footer/Footer";

function Homepage({ setSearchResults }) {
  return (
    <div>
      <Header setSearchResults={setSearchResults} />

      <CityOverview />
      <Footer />
    </div>
  );
}

export default Homepage;
