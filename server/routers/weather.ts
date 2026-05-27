import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

export const weatherRouter = router({
  getForecast: protectedProcedure
    .input(z.object({
      latitude: z.number().optional(),
      longitude: z.number().optional()
    }))
    .query(async ({ input }) => {
      // Default to Negros Occidental coordinates if none provided
      const lat = input.latitude || 10.6030;
      const lon = input.longitude || 122.9550;

      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,soil_moisture_0_to_1cm&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FManila`;
      
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Weather fetch error:", error);
        throw error;
      }
    }),
});
