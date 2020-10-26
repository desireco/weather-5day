import fs from 'fs'
import { join } from 'path'
import { _ } from 'lodash'

const dataDir = join(process.cwd(), 'data')
const fullPath = join(dataDir, 'weather-response.json')
const weatherData = fs.readFileSync(fullPath, 'utf8')
const data = JSON.parse(weatherData)

export default function handler(req, res) {
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