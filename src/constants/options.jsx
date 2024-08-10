export const SelectTravelesList = [
  {
    id: 1,
    title: "Solo Travel",
    desc: "A journey for the lone explorer",
    icon: "✈️",
    people: "1",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "A romantic trip for two",
    icon: "🥂",
    people: "2 people",
  },
  {
    id: 3,
    title: "Family",
    desc: "Fun for families",
    icon: "🏡",
    people: "3 to 5 people",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A bunch of thrill-seekes",
    icon: "⛵",
    people: "5 or more",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Travel wisely, save money",
    icon: "💵",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Enjoy comfort, spend moderately",
    icon: "💰",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Live lavishly, no budget limits",
    icon: "💸",
  },
];

export const AI_PROMPT = "Generate Travel Plan for location: {location}, \
for {totalDays} days for {traveler} with a {budget} budget, give me a hotels \
options list with Hotelname, hotel address, price, hotel image url, geo coordinates, \
 rating, descriptions and suggest itinerary with placename, place details, place image url, \
 geo coordinates, ticket pricing, rating, time travel each of the location for \
 {totalDays} days with each day plan with best time to visit in JSON format.";