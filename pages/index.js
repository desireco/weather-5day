import Nav from '../components/nav'
import FiveDayForecast from '../components/FiveDayForecast'

export async function getServerSideProps() {
  const res = await fetch(`${process.env.BASE_URL}/api/weather`)
  const weather = await res.json()

  if (weather.errors) {
    console.error(weather.errors)
    throw new Error('Failed to fetch API')
  }
  // Pass weather to the page via props
  return { props: { weather } }
}

export default function IndexPage(weather) {
  return (
    <div>
      <Nav />
      <div className="py-20 text-center">
        <h1 className="text-5xl text-accent-1">
          5 Day Weather
        </h1>
        <FiveDayForecast weather={weather}></FiveDayForecast>
      </div>
    </div>
  )
}
