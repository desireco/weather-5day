import Nav from '../components/nav'

export default function IndexPage() {
  return (
    <div>
      <Nav />
      <div className="py-20 text-center">
        <h1 className="text-5xl  text-accent-1">
          5 Day Weather
        </h1>
        <section>
          <h3>Today's weather</h3>
        </section>
      </div>
    </div>
  )
}
