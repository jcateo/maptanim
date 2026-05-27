const run = async () => {
  const url = "https://api.open-meteo.com/v1/forecast?latitude=10.603&longitude=122.955&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,soil_moisture_0_to_1cm&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FManila";
  const res = await fetch(url);
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

run();
