const mongoose = require("mongoose");
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("DATABASE CONNECTED");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
  await Campground.deleteMany({});
  for (i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "60bc767e90032023107384d2",
      location: `${cities[random1000].city},${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates optio impedit praesentium corporis veritatis quod voluptatibus expedita aspernatur laudantium eius! Reiciendis fugit repudiandae iusto repellendus voluptatem recusandae culpa, velit quo.",
      price,
      geometry: {
        type: "Point",
        coordinates:
        [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ]
      },
            images: [
        {
          url: 'https://res.cloudinary.com/dofdgafzx/image/upload/v1624100210/YelpCamp/crc1fe4lauvpapmpcuf0.jpg',
          filename: 'YelpCamp/crc1fe4lauvpapmpcuf0',
        },
        {
          url: 'https://res.cloudinary.com/dofdgafzx/image/upload/v1625845912/YelpCamp/ahfnenvca4tha00h2ubt_avrpbe.png',
          filename: 'YelpCamp/ahfnenvca4tha00h2ubt_avrpbe',
        },
        {
          url: 'https://res.cloudinary.com/dofdgafzx/image/upload/v1625845938/YelpCamp/ruyoaxgf72nzpi4y6cdi_xcav8z.png',
          filename: 'YelpCamp/ruyoaxgf72nzpi4y6cdi_xcav8z',
        }
      ]

    })
    await camp.save()
  }

}

seedDB().then(() => {
  mongoose.connection.close();
})