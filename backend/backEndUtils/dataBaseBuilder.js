const axios = require("axios");
const { faker } = require("@faker-js/faker");
const Restaurant = require("../roots/models/restaurantModel");
const { format, addHours } = require("date-fns");
const Menu = require("../roots/models/menuModel");
const Review = require("../roots/models/reviewModel");
const Customer = require("../roots/models/customerModel");
const Address = require("../roots/models/addresModel");

const createDB = async () => {
  for (let index = 0; index < 30; index++) {
    const restaurant = await Restaurant.create();
  }
};

const generateRestaurant = async () => {
  const restaurant = {};
  restaurant.userName = faker.person.fullName();
  restaurant.menu = await generateMenu();
  restaurant.password = faker.internet.password();
  restaurant.phoneNumber = faker.phone.number();
  // restaurant.locatin=api
  restaurant.open = true;
  restaurant.defaultOpeningTime = generateDefaultOpeningTime();
  restaurant.email = faker.internet.email({ firstName: userName });
  const newRestaurant = await Restaurant.create();
};
// userName: { type: String },
// password: { type: String },
// email: { type: String },
// phoneNumber: { type: String },
// location: { type: String },
// open: { type: Boolean },
// defaultOpeningTime: [
//   {
//     openingHour: { type: Date, required: true },
//     closingHour: { type: Date, required: true },
//   },
// ],
// menu: { type: mongoose.Schema.Types.ObjectId,ref:"Menu" },
// Reviews:[{type: mongoose.Schema.Types.ObjectId,ref:"Review"}]
const generateMenu = async () => {};
const generateReviews = async () => {
    const review={}
    review.grade=faker.number.int({max:5})
    review.comment=faker.lorem.paragraphs(1)
    review.grade=faker.number.int({max:5})
    whenSubmitted=faker.date.recent({ days: faker.number.int({max:40}) })
    review.customer=await generateCustomer()
    const newReview=Review.create(review)
};
const generateMenuCategory = async () => {};
const generateDish = async () => {};
// const generateAddress = async () => {
//     const address={}
//     address.street=
//     address.city="tel aviv"
//     address.zipCode=
//     address.country="israel"
//     const newAddress=Address.create()
// };
const generateCustomer = async () => {
    const customer={}
    customer.name=faker.internet.userName() ;
    customer.email= faker.internet.email;
    customer.password= faker.internet.password;
    customer.phoneNumber = faker.phone.number();

    const newCustomer=await Customer.create(customer)
    return newCustomer._id

};
const generateDefaultOpeningTime =  () => {
  const weekDays= generateRandomHour();
  const openingTimes = Array.from({ length: 5 }, () => weekDays);
  const weekEnd= faker.helpers.maybe(() => generateRandomHour(), {
    probability: 0.5,
  });
  openingTimes[5] =weekEnd
  openingTimes[6] =weekEnd
  console.log(openingTimes);
};

const generateRandomHour = () => {
  const randomHour = faker.number.int({ min: 8, max: 12 });

  const date = new Date();
  date.setHours(randomHour);
  date.setMinutes(0);
  date.setSeconds(0);
  const openingHour = format(date, "HH:mm");

  const closingHourDate = addHours(
    date,
    faker.number.int({ min: 8, max: 12 })
  );
  const closingHour = format(closingHourDate, "HH:mm");

  return{openingHour,closingHour}
};


module.exports = { generateRandomHour,generateDefaultOpeningTime};
