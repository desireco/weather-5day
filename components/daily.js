import { round, meanBy, minBy, maxBy, startCase } from 'lodash';

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
  const desc = _.startCase(wdata[0]["weather"][0]["description"])

  return (
    <div className="mt-6">
      <h3 className="text-xl py-2">Weather forecast for {dateTimeFormatted} </h3>
          <img className="h-16 w-16 rounded-full mx-auto" src={icon} />
          <span className="font-bold text-gray-800">{desc}</span><br />
          Temperature is {t}&#8457; and it feels like it is {tFeels}&#8457; <br />
          Humidity is {humidity}% 
      <hr className="w-64 mx-auto bg-gray-600 mt-4" />
    </div>
  )
}