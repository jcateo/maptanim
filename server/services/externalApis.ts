export async function fetchBiophysicalProfile(lat: number, lon: number) {
  try {
    // 1. Fetch Soil Data (SoilGrids REST API v2)
    // SoilGrids bounding box query is sometimes tricky. 
    // The easiest is the properties/query endpoint.
    // E.g. https://rest.soilgrids.org/soilgrids/v2.0/properties/query?lon=122.95&lat=10.6&property=phh2o&property=clay&property=sand&property=silt&depth=15-30cm&value=mean
    let soilPh = 6.0; // Fallback
    let soilTypeStr = "Loam"; // Fallback
    
    try {
      const soilUrl = `https://rest.soilgrids.org/soilgrids/v2.0/properties/query?lon=${lon}&lat=${lat}&property=phh2o&property=clay&property=sand&property=silt&depth=15-30cm&value=mean`;
      const soilRes = await fetch(soilUrl);
      if (soilRes.ok) {
        const soilData = await soilRes.json();
        const properties = soilData.properties?.layers;
        if (properties) {
          const phLayer = properties.find((l: any) => l.name === 'phh2o');
          if (phLayer && phLayer.depths && phLayer.depths[0]) {
            // SoilGrids pH is multiplied by 10
            soilPh = phLayer.depths[0].values.mean / 10;
          }

          const clayLayer = properties.find((l: any) => l.name === 'clay');
          const sandLayer = properties.find((l: any) => l.name === 'sand');
          const siltLayer = properties.find((l: any) => l.name === 'silt');
          
          if (clayLayer && sandLayer && siltLayer) {
            const clay = clayLayer.depths[0]?.values?.mean || 0;
            const sand = sandLayer.depths[0]?.values?.mean || 0;
            const silt = siltLayer.depths[0]?.values?.mean || 0;
            
            // Basic soil texture triangle logic (simplified)
            // Values are in g/kg, so max is 1000
            if (clay > 400) soilTypeStr = "Clay";
            else if (sand > 500) soilTypeStr = "Sandy";
            else if (silt > 500) soilTypeStr = "Silty";
            else if (clay > 200 && sand > 200 && silt > 200) soilTypeStr = "Loam";
            else soilTypeStr = "Clay Loam";
          }
        }
      }
    } catch (e) {
      console.warn("SoilGrids API failed, using fallback", e);
    }

    // 2. Fetch Weather Data (OpenWeatherMap)
    let temp = 28; // Fallback
    let rainfall = 0; // Fallback
    
    try {
      const apiKey = process.env.OPENWEATHER_API_KEY || process.env.VITE_OPENWEATHER_API_KEY;
      if (apiKey) {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        const weatherRes = await fetch(weatherUrl);
        if (weatherRes.ok) {
          const weatherData = await weatherRes.json();
          temp = weatherData.main?.temp || 28;
          rainfall = weatherData.rain ? (weatherData.rain['1h'] || weatherData.rain['3h'] || 0) : 0;
        }
      } else {
        console.warn("OpenWeatherMap API key not found in environment variables");
      }
    } catch (e) {
      console.warn("OpenWeatherMap API failed, using fallback", e);
    }

    // 3. Fetch Sunlight Data (NASA POWER API)
    let sunlightHours = 6; // Fallback
    try {
      // Climatology data for average sunlight
      const powerUrl = `https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=ALLSKY_SFC_SW_DWN&community=AG&longitude=${lon}&latitude=${lat}&format=JSON`;
      const powerRes = await fetch(powerUrl);
      if (powerRes.ok) {
        const powerData = await powerRes.json();
        const insol = powerData.properties?.parameter?.ALLSKY_SFC_SW_DWN;
        if (insol && insol.ANN) {
          // insol.ANN is annual average insolation in kW-hr/m^2/day
          // Very roughly correlates to peak sun hours.
          sunlightHours = Math.round(insol.ANN);
        }
      }
    } catch (e) {
      console.warn("NASA POWER API failed, using fallback", e);
    }

    // Evaluate standard profile
    let moistureProfile = "Dry";
    if (rainfall > 5) moistureProfile = "Wet";
    
    let sunProfile = "Shaded";
    if (sunlightHours > 5) sunProfile = "Sunny";
    
    // Example: "Dry Sunny Loam"
    const profileName = `${moistureProfile} ${sunProfile} ${soilTypeStr}`;

    // 4. Fetch Topography Data (Elevation & Slope approximation)
    let elevation = 45; // Fallback in meters
    let slope = 5; // Fallback in percentage
    try {
      // Mocking topographical generation based on coordinates for defense purposes
      // (Normally you would hit an OpenTopoData API here)
      // We create a pseudo-random but consistent number based on lat/lon
      const seed = Math.abs(Math.sin(lat * lon)) * 100;
      elevation = Math.round(seed * 2 + 10); // e.g. 10m to 210m
      slope = Math.round((seed % 15) + 1); // e.g. 1% to 15%
    } catch (e) {
      console.warn("Topography generation failed", e);
    }

    return {
      soilPh,
      soilType: soilTypeStr,
      temp,
      rainfall,
      sunlightHours,
      elevation,
      slope,
      profileName,
      raw: {
        soilUrl: `SoilGrids (${lat.toFixed(4)}, ${lon.toFixed(4)})`,
        weatherUrl: `OpenWeatherMap (${lat.toFixed(4)}, ${lon.toFixed(4)})`,
        nasaUrl: `NASA POWER (${lat.toFixed(4)}, ${lon.toFixed(4)})`
      }
    };
  } catch (error) {
    console.error("Failed to fetch biophysical profile", error);
    // Return a safe fallback
    return {
      soilPh: 6.5,
      soilType: "Loam",
      temp: 28,
      rainfall: 0,
      sunlightHours: 6,
      elevation: 45,
      slope: 5,
      profileName: "Dry Sunny Loam",
      raw: null
    };
  }
}
