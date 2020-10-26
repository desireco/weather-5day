import Daily from "./daily"

export default function FiveDayForecast(weather) {
  // crazy
  const data = weather["weather"]["weather"]
  const dates = Object.keys(data)
  
  return (
    <section>
      {dates.map((d) => <Daily day={d} data={data[d]}></Daily>)}
    </section>
  )
}
