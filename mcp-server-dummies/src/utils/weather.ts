interface WeatherData {
  temperature: number;
  windspeed: number;
}

interface SuccessResult {
  error: false;
  city: string;
  country: string;
  temperature: number;
  windspeed: number;
  data: WeatherData;
}

interface ErrorResult {
  error: true;
  message: string;
}

type WeatherResult = SuccessResult | ErrorResult;

export async function getWeatherByCity(city: string): Promise<WeatherResult> {
  try {
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        city
      )}`
    );
    if (!geoRes.ok)
      throw new Error(`Error en la geo-codificación: ${geoRes.status}`);

    const geoData = await geoRes.json();
    const geoResult = geoData.results?.[0];

    if (!geoResult) {
      return {
        error: true,
        message: `No se encontraron resultados para la ciudad "${city}" 😕`,
      };
    }

    const { latitude, longitude, name, country } = geoResult;

    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    if (!weatherRes.ok)
      throw new Error(`Error al obtener el clima: ${weatherRes.status}`);

    const weatherData = await weatherRes.json();
    const weather = weatherData.current_weather;

    if (!weather) {
      return {
        error: true,
        message: `No se pudo obtener el clima actual para "${name}, ${country}".`,
      };
    }

    return {
      error: false,
      city: name,
      country,
      temperature: weather.temperature,
      windspeed: weather.windspeed,
      data: weather,
    };
  } catch (err) {
    if (err instanceof Error) {
      return {
        error: true,
        message: `Ocurrió un error al buscar el clima: ${err.message}`,
      };
    } else {
      return {
        error: true,
        message: `Ocurrió un error desconocido al consultar el clima.`,
      };
    }
  }
}
