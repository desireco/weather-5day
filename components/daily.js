import { round } from 'lodash';
import meanBy from 'lodash/meanBy';

function getAvgKey(data, key) {
  return meanBy(data, (i) => i["main"][key]);
}

function KtoF(temp) {
  return round((temp - 273.15) * 1.8 + 32.00)
}

export default function Daily(data) {
  const wdata = data["data"]

  // Day of the week
  const dateOfForecast = new Date(data["day"]);
  const dateTimeFormatted = dateOfForecast.toLocaleDateString("en-US",{weekday: "long",year: "numeric",month:"long",day:"numeric"})

  const temp = wdata[1]["main"]
  let t = KtoF(getAvgKey(wdata, "temp"))
  let tFeels = KtoF(getAvgKey(wdata, "feels_like"))
  let humidity = round(getAvgKey(wdata, "humidity"))

  return (
    <div>
      <h3 className="text-2xl py-2">{dateTimeFormatted} </h3>
      <p>Temperature: {t}&#8457; Feels like: {tFeels}&#8457; Humidity: {humidity}%</p>
    </div>
  )
}