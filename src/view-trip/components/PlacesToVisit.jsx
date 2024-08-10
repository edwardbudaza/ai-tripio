import PlaceCardItem from "./PlaceCardItem"

function PlacesToVisit({trip}) {
    console.log("Places To Visit",trip)
  return (
    <div>
        <h2 className="font-bold text-lg">Places to Visit</h2>

        <div>     
            {trip?.tripData?.itinerary.map((item, index) => (
                <div key={index} className="mt-5">
                        <h2 className="font-medium text-lg">Day {item.day}</h2>
                        <div className="grid md:grid-cols-2 gap-5">
                            {item.plan.map((place, index) => (
                                <div key={index}>
                                    <h2 className="font-medium text-sm text-orange-600">{place.time}</h2>
                                    <PlaceCardItem place={place}/>
                                </div>
                            ))}
                        </div>
                </div>
            ))}
        </div>
    </div>
  )
}
export default PlacesToVisit