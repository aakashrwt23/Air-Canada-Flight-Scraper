import { scrapeFlights } from "./scraper/flightScraper.js";
import { saveOutput } from "./utils/saveOutput.js";

const [origin, destination, date] = process.argv.slice(2);

if (!origin || !destination || !date) {
  console.log("Usage: node search.js ORIGIN DESTINATION DATE");
  process.exit(1);
}

(async () => {
  const flights = await scrapeFlights(origin, destination, date);

  console.log("\nFlights found:", flights.length);
  console.log(flights);

  await saveOutput(origin, destination, date, flights);
})();
