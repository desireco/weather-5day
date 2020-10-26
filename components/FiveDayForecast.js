import Daily from "../components/daily"

export default function WeatherForecast(weather) {
  // crazy
  const data = weather["weather"]["weather"]
  const dates = Object.keys(data)
  
  return (
    <section>
      {dates.map((d) => <Daily day={d} data={data[d]}></Daily>)}
    </section>   
  )
}
