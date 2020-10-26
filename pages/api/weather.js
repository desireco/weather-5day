import fs from 'fs'
import { join } from 'path'

const dataDir = join(process.cwd(), 'data')
const fullPath = join(dataDir, 'weather-response.json')
const weatherData = fs.readFileSync(fullPath, 'utf8')
const data = JSON.parse(weatherData)

export default function handler(req, res) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  if (data["cod"] == "200") {
    const r = data["list"];
    res.end(JSON.stringify(r))  
  } else {
    res.end(JSON.stringify({"message": "womp, womp, womp"}))
  }
}
