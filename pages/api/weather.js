import fs from 'fs'
import { join } from 'path'
import { _ } from 'lodash'

const dataDir = join(process.cwd(), 'data')
const APP_ID = process.env.APP_ID

export default function handler(req, res) {
  let {lat, lon} = req.query
  const getDataByCoords = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APP_ID}`;
  const fullPath = join(dataDir, `weather-response-${Math.round(lat)}-${Math.round(lon)}.json`)
  const filePath = join(dataDir, `weather-response.json`)
  // console.log(fullPath)
  // fs.stat(fullPath, (err, stats) => {
  //   if(err) {
  //     // get data        
  //   } else {
  //     console.log(`File Data Last Modified: ${stats.mtime}`);
  //   }
  // });
  const weatherData = fs.readFileSync(filePath, 'utf8')
  const data = JSON.parse(weatherData)

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  if (data["cod"] == "200") {
    const r = transformPerDay(data["list"]);
    res.end(JSON.stringify(r))  
  } else {
    res.end(JSON.stringify({"message": "womp, womp, womp"}))
  }
}

function transformPerDay(data) {
var r = _(data)
    .groupBy((e) => { 
      return _.split(e["dt_txt"], " ")[0]
    })
  return r;
}