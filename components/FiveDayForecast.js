import Daily from "./daily"

export default function FiveDayForecast(weather) {
  const data = weather["weather"]
  const dates = Object.keys(data)
  
  return (
    <section>
      {dates.map((d) => <Daily day={d} data={data[d]} key={d}></Daily>)}
    </section>
  )
}
