function CityOverviewCard({ name, weatherData }) {
  return (
    <div>
      <h1>{name}</h1>
      <span>{weatherData.daily.temperature_2m_max[0]}</span>
      <span>{weatherData.daily.temperature_2m_min[0]}</span>
    </div>
  );
}

export default CityOverviewCard;
