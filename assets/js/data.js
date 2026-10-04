/* =========================================================
   SAMPLE DATA (pamalit sa database)
   Dito galing ang laman ng Destinations at Destination Details.
   I-edit lang ang mga ito para magbago ang content ng site:
   pangalan, presyo, description, larawan, rooms, menu, etc.
   Ang mga presyo, rooms at menu ay SAMPLE lang -- palitan ng totoo.
   ========================================================= */
window.ESTABLISHMENTS = [
  {
    id: 1, name: "Mahalta Resorts and Convention Center", type: "resort", featured: true,
    image: "assets/img/travel/mahalta_resort.jpg",
    description: "Mahalta Resorts and Convention Center in Calapan offers family-friendly accommodations with air-conditioned rooms featuring private bathrooms, flat-screen TVs, free WiFi, and some with balconies, along with amenities such as a garden, terrace, restaurant, bar, and 24-hour front desk service.",
    address: "Calapan City, Oriental Mindoro", price_from: 1500,
    gallery: [
      { image: "assets/img/travel/mahalta_inside.webp", caption: "Mahalta Hot Spring Resort" },
      { image: "assets/img/travel/mahalta_outside.jpg", caption: "Mahalta entrance" }
    ],
    services: ["wifi|Free WiFi", "cup-hot|Restaurant & Bar", "water|Hot Spring Pool", "building|Convention Center", "clock|24-hour Front Desk"],
    rooms: [
      { id: 101, name: "Standard Room", price: 1500, guests: 2, description: "Air-conditioned room with private bathroom and flat-screen TV.", amenities: "Aircon, WiFi, TV, Private bathroom" },
      { id: 102, name: "Family Room", price: 2800, guests: 5, description: "Spacious room good for the whole family, some with balcony.", amenities: "Aircon, WiFi, TV, Balcony" }
    ]
  },
  {
    id: 2, name: "Jolly Waves Waterpark & Resort", type: "resort", featured: true,
    image: "assets/img/travel/jollywave.jpg",
    description: "Jolly Waves Waterpark & Resort in Calapan, Oriental Mindoro, is a vibrant water and adventure theme park featuring one of the largest wave pools in the country.",
    address: "Calapan City, Oriental Mindoro", price_from: 350,
    gallery: [{ image: "assets/img/travel/jollywave(2).jpg", caption: "Jolly Waves entrance" }],
    services: ["water|Wave Pool", "emoji-smile|Family Activities", "cup-hot|Food Stalls"],
    rooms: [
      { id: 201, name: "Day Pass Cottage", price: 1200, guests: 6, description: "Cottage good for a day of swimming with the family.", amenities: "Table, Seats, Shade" }
    ]
  },
  {
    id: 3, name: "Filipiniana Hotel Calapan", type: "hotel", featured: false,
    image: "assets/img/travel/fillipinia.jpg",
    description: "Filipiniana Hotel Calapan is a family-friendly hotel offering comfortable air-conditioned rooms with Wi-Fi and modern amenities, recreational facilities such as a swimming pool, sauna, and hot tub, as well as room service, laundry, and shuttle transport to nearby attractions.",
    address: "Calapan City, Oriental Mindoro", price_from: 2200,
    gallery: [],
    services: ["wifi|Free WiFi", "water|Swimming Pool", "cup-hot|Restaurant", "bus-front|Shuttle Service", "basket|Laundry"],
    rooms: [
      { id: 301, name: "Deluxe Room", price: 2200, guests: 2, description: "Comfortable air-conditioned room with Wi-Fi.", amenities: "Aircon, WiFi, TV" },
      { id: 302, name: "Family Suite", price: 3800, guests: 5, description: "Bigger room for families and small groups.", amenities: "Aircon, WiFi, TV, Extra beds" }
    ]
  },
  {
    id: 4, name: "Santo Niño Cathedral", type: "attraction", featured: false,
    image: "assets/img/travel/cathedral.jpg",
    description: "Santo Niño Cathedral, commonly known as Calapan Cathedral, is a Roman Catholic cathedral in Calapan, Oriental Mindoro, Philippines, dedicated to the Santo Niño. It is the episcopal seat of the Apostolic Vicariate of Calapan and is a marked historical structure by the National Commission for Culture and the Arts.",
    address: "Calapan City, Oriental Mindoro", price_from: 0,
    gallery: [{ image: "assets/img/travel/cathedral(2).jpg", caption: "Inside the cathedral" }],
    services: ["bank|Historical Site", "camera|Photo Spot"],
    rooms: []
  },
  {
    id: 5, name: "Vencio's Garden Hotel and Restaurant", type: "hotel", featured: false,
    image: "assets/img/travel/vencios_garden.jpg",
    description: "Vencio's Garden Hotel and Restaurant has been a haven of comfort and Calapeño culinary delight in Oriental Mindoro for over 16 years. We take pride in offering cozy accommodations and a dining experience that celebrates local flavors and fresh ingredients, in a tranquil garden setting.",
    address: "Calapan City, Oriental Mindoro", price_from: 1800,
    gallery: [],
    services: ["cup-hot|Restaurant", "flower1|Garden Setting", "wifi|Free WiFi", "calendar-event|Event Hosting"],
    rooms: [
      { id: 501, name: "Garden Room", price: 1800, guests: 2, description: "Cozy room overlooking the garden.", amenities: "Aircon, WiFi, TV" },
      { id: 502, name: "Family Room", price: 3000, guests: 4, description: "Room for small families.", amenities: "Aircon, WiFi, TV, Extra bed" }
    ]
  },
  {
    id: 6, name: "Donny Land Beach Resort", type: "resort", featured: false,
    image: "assets/img/travel/donnyland.jpg",
    description: "Donnyland Beach Resort offers a beachfront accommodation option for those looking to stay near the sea. Guests mention its convenient location and access to seaside leisure.",
    address: "Calapan City, Oriental Mindoro", price_from: 1600, phone: "(043) 288-7625",
    gallery: [],
    services: ["umbrella|Beachfront", "water|Seaside Leisure"],
    rooms: [
      { id: 601, name: "Beachfront Room", price: 1600, guests: 3, description: "Room near the beach.", amenities: "Aircon, TV, Beach access" }
    ]
  },
  {
    id: 7, name: "Eduardo's Resort", type: "resort", featured: false,
    image: "assets/img/travel/eduardos_resort.jpg",
    description: "A resort in Calapan City with a large swimming pool, ideal for family outings and group gatherings.",
    address: "Calapan City, Oriental Mindoro", price_from: 250,
    gallery: [],
    services: ["water|Swimming Pool", "people|Group Friendly"],
    rooms: []
  },
  {
    id: 8, name: "Chippings", type: "restaurant", featured: false,
    image: "assets/img/travel/chippings.jpg",
    description: "A local eatery in Calapan City. Reserve a table ahead of time and pre-select your meal.",
    address: "Calapan City, Oriental Mindoro", price_from: 150,
    gallery: [],
    services: ["cup-hot|Dine-in", "bag|Take-out"],
    rooms: [],
    menu: [
      { id: 801, category: "Main Dishes", name: "House Special Plate", price: 220, description: "Sample menu item." },
      { id: 802, category: "Main Dishes", name: "Chicken Meal", price: 180, description: "Sample menu item." },
      { id: 803, category: "Snacks", name: "Fries", price: 90, description: "Sample menu item." },
      { id: 804, category: "Drinks", name: "Iced Tea", price: 60, description: "Sample menu item." }
    ]
  },
  {
    id: 9, name: "Calapan Heritage Museum", type: "attraction", featured: false,
    image: "assets/img/travel/museum.jpg",
    description: "Look back at the history of Calapan City and Oriental Mindoro through old photographs and displays.",
    address: "Calapan City, Oriental Mindoro", price_from: 50,
    gallery: [],
    services: ["bank|Historical Exhibits", "camera|Photo Display"],
    rooms: []
  },
  {
    id: 10, name: "Calapan City Park", type: "attraction", featured: false,
    image: "assets/img/travel/park.jpg",
    description: "A green city park with a monument of the tamaraw, a good place to relax and walk around.",
    address: "Calapan City, Oriental Mindoro", price_from: 0,
    gallery: [],
    services: ["tree|Green Space", "camera|Photo Spot"],
    rooms: []
  },
  {
    id: 11, name: "Pulo Island", type: "island", featured: false,
    image: "assets/img/travel/pulo.jpg",
    description: "A small island off Calapan with white sand and clear water, reached by outrigger boat.",
    address: "Calapan Bay, Oriental Mindoro", price_from: 500,
    gallery: [],
    services: ["tsunami|Island Hopping", "umbrella|Beach"],
    rooms: []
  },
  {
    id: 12, name: "Escuba Sandbar", type: "island", featured: false,
    image: "assets/img/travel/escuba.jpg",
    description: "A sandbar with clear turquoise water and forested shoreline, popular for swimming and photos.",
    address: "Calapan Bay, Oriental Mindoro", price_from: 500,
    gallery: [],
    services: ["tsunami|Swimming", "camera|Photo Spot"],
    rooms: []
  }
];
