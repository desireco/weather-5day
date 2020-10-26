async function fetchWeather() {
  const res = await fetch(`${process.env.BASE_URL}/api/weather`)
  const json = await res.json()

  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  console.log(data)
  return json.data
}