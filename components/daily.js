import { round, meanBy, minBy, maxBy } from 'lodash';

function getAvgKey(data, key) {
  return meanBy(data, (i) => i["main"][key]);
}

function getMinKey(data, key) {
  return minBy(data, (i) => i["main"][key]);
}

function getMaxKey(data, key) {
  return maxBy(data, (i) => i["main"][key]);
}

function KtoF(temp) {
  return round((temp - 273.15) * 1.8 + 32.00)
}

export default function Daily(data) {
  const wdata = data["data"]

  // Day of the week
  const dateOfForecast = new Date(data["day"]);
  const dateTimeFormatted = dateOfForecast.toLocaleDateString("en-US",{weekday: "long",year: "numeric",month:"long",day:"numeric"})

  const t = KtoF(getAvgKey(wdata, "temp"))
  const tMin = KtoF(getMinKey(wdata, "temp"))
  const tMax = KtoF(getMaxKey(wdata, "temp"))
  const tFeels = KtoF(getAvgKey(wdata, "feels_like"))
  const humidity = round(getAvgKey(wdata, "humidity"))
  const icon = `https://openweathermap.org/img/w/${wdata[0].weather[0].icon}.png`
  const desc = wdata[0]["weather"][0]["description"]

  return (
    <div>
      <h3 className="text-2xl py-2">{dateTimeFormatted} </h3>
      <div>
          <p className="text-center w-full"><img src={icon} /></p>
          Temperature: {t}&#8457; / {tMin} {tMax} Feels like: {tFeels}&#8457; <br />
          Humidity: {humidity}% <br />
          {desc}
      </div>
      
    </div>
  )
}