const weatherImage = {
  clear: [
    "/img/weather/clear/clear1.webp",
    "/img/weather/clear/clear2.webp",
    "/img/weather/clear/clear3.webp",
    "/img/weather/clear/clear4.webp",
  ],
  cloudy: [
    "/img/weather/cloudy/1.webp",
    "/img/weather/cloudy/2.webp",
    "/img/weather/cloudy/3.webp",
    "/img/weather/cloudy/4.webp",
  ],
  drizzel: [
    "/img/weather/rainy/rainy1.webp",
    "/img/weather/rainy/rainy2.webp",
    "/img/weather/rainy/rainy3.webp",
    "/img/weather/rainy/rainy4.webp",
  ],
  rainy: [
    "/img/weather/rainy/rainy1.webp",
    "/img/weather/rainy/rainy2.webp",
    "/img/weather/rainy/rainy3.webp",
    "/img/weather/rainy/rainy4.webp",
  ],
};

function weatherImages(weatherCode) {
  let weatherCategory;

  if (weatherCode === 0) {
    weatherCategory = "clear";
  } else if ([1, 2, 3].includes(weatherCode)) {
    weatherCategory = "cloudy";
  } else if ([51, 53, 55].includes(weatherCode)) {
    weatherCategory = "drizzel";
  } else if ([61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)) {
    weatherCategory = "rainy";
  } else if ([45, 48].includes(weatherCode)) {
    weatherCategory = "rainy";
  }

  return {
    images: weatherImage[weatherCategory],
    weatherCategory,
  };
}

export { weatherImages };
