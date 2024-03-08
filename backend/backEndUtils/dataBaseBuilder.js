const { cloudinary } = require("./cloudinarySetUp");
const axios = require("axios");
const { faker } = require("@faker-js/faker");
const Restaurant = require("../roots/models/restaurantModel");
const { format, addHours } = require("date-fns");
const Menu = require("../roots/models/menuModel");
const Review = require("../roots/models/reviewModel");
const Customer = require("../roots/models/customerModel");
const Address = require("../roots/models/addressModel");
const Dish = require("../roots/models/dishModel");
const MenuCategory = require("../roots/models/menuCategoryModel");
const { restaurantsData } = require("./DBData");
const { uploadToCloudinary } = require("./helpers");

const createDB = async () => {
  for (let index = 0; index < restaurantsData.length; index++) {
    await generateRestaurant(restaurantsData[index]);
  }
  console.log("im done");
};

const generateRestaurant = async (restaurantData) => {
  const restaurant = {};
  restaurant.restaurantName = restaurantData.restaurantName;
  restaurant.userName = faker.internet.userName();
  restaurant.password = faker.internet.password();
  restaurant.phoneNumber = faker.phone.number();
  // restaurant.locatin=api
  restaurant.open = true;
  restaurant.restaurantFilter = faker.helpers.arrayElements(
    ["kosher", "gluten-free", "dairy-free"],
    { min: 0, max: 2 }
  );
  restaurant.restaurantFilter.push(restaurantData.type);
  restaurant.defaultOpeningTime = generateDefaultOpeningTime();
  restaurant.email = faker.internet.email({ firstName: restaurant.userName });
  const newRestaurant = await Restaurant.create(restaurant);
  newRestaurant.menu = await generateMenu(
    restaurantData.type,
    newRestaurant._id
  );
  newRestaurant.Reviews = await generateReviews(newRestaurant._id);
  await newRestaurant.save();
};

const generateMenu = async (restaurantType, restaurantId) => {
  const newMenu = await Menu.create({ restaurant: restaurantId });
  const menuCategory = await generateMenuCategory(restaurantType, newMenu._id);
  newMenu.menuCategories = [menuCategory];
  await newMenu.save();
  return newMenu._id;
};
const generateReviews = async (restaurantId) => {
  const reviews = [];
  for (let index = 0; index < 4; index++) {
    const review = {};
    review.comment = faker.lorem.paragraphs(1);
    review.grade = faker.number.int({ min: 3, max: 5 });
    review.whenSubmitted = faker.date.recent({
      days: faker.number.int({ min: 10, max: 40 }),
    });
    review.Restaurant = restaurantId;
    review.customerId = await generateCustomer();
    const newReview = await Review.create(review);
    reviews.push(newReview._id);
  }
  return reviews;
};
const generateMenuCategory = async (restaurantType, menuId) => {
  console.log("🚀 ~ generateMenuCategory ~ restaurantType:", restaurantType);
  try {
    const dishes = [];
    const primaryResponse = await axios.get(
      `https://api.spoonacular.com/food/menuItems/search?query=${restaurantType}&apiKey=af22d491623d45da84ab20aba539bc75&number=40`
    );

    const newMenuCategory = await MenuCategory.create({
      menuCategoryName: "primary",
      menu: menuId,
    });
    const primary = primaryResponse.data.menuItems;
    let counter = 0;
    while (dishes.length < 20) {
      const newDish = await generateDish(primary[counter], newMenuCategory._Id);
      if (newDish) {
        dishes.push(newDish._id);
      }
      counter++;
    }
    newMenuCategory.dishes = dishes;
    await newMenuCategory.save();

    return newMenuCategory._id;
  } catch (error) {
    console.log(error);
  }
};
const addsDesertsAndAppetizers = async () => {
  const menus = await Menu.find({ menuCategories: { $size: 1 } });

  const desertsResponse = await axios.get(
    "https://api.spoonacular.com/food/menuItems/search?query=Desserts&apiKey=6c6188663a68460eba7b349a333284d2&number=1000"
  );
  const appetizersResponse = await axios.get(
    "https://api.spoonacular.com/food/menuItems/search?query=appetizers&apiKey=6c6188663a68460eba7b349a333284d2&number=1000"
  );
  const deserts = desertsResponse.data.menuItems;
  const appetizers = appetizersResponse.data.menuItems;
  for (const menu of menus) {
    const newDeserts = [];
    const NewAppetizers = [];
    const desertsCategory = await MenuCategory.create({
      menu: menu._id,
      menuCategoryName: "deserts",
    });
    const appetizersCategory = await MenuCategory.create({
      menu: menu._id,
      menuCategoryName: "appetizers",
    });
    let counterDessert = 0;
    while (newDeserts.length < 20) {
      const newDish = await generateDish(
        deserts[counterDessert],
        desertsCategory._id
      );
      if (newDish) {
        newDeserts.push(newDish._id);
      }
      counterDessert++;
    }
    desertsCategory.dishes = newDeserts;

    let counterAppetizers = 0;

    while (NewAppetizers.length < 20) {
      const newDish = await generateDish(
        appetizers[counterAppetizers],
        appetizersCategory._id
      );
      if (newDish) {
        NewAppetizers.push(newDish._id);
      }
      counterAppetizers++;
    }
    appetizersCategory.dishes = NewAppetizers;
    await desertsCategory.save();
    await appetizersCategory.save();
    menu.menuCategories.push(desertsCategory._id, appetizersCategory._id);
    await menu.save();
  }
};
const generateDish = async (dishData, menuCategoryId) => {
  console.log("🚀 ~ generateDish ~ dishData:", dishData);
  const dish = {};
  try {
    dish.image = await uploadToCloudinary(dishData.image, dishData.title);
    dish.dishName = dishData.title;
    dish.menuCategory = menuCategoryId;
    dish.price = faker.number.int({ min: 30, max: 120 });
    const newDish = await Dish.create(dish);
    return newDish._id;
  } catch (error) {
    console.log("cant upload this to cloudnry");
  }
};

// const generateAddress = async () => {
//     const address={}
//     address.street=
//     address.city="tel aviv"
//     address.zipCode=
//     address.country="israel"s
//     const newAddress=Address.create()
// };
const generateCustomer = async () => {
  const customer = {};
  customer.name = faker.internet.userName();
  customer.email = faker.internet.email({ firstName: customer.name });
  customer.password = faker.internet.password();
  customer.phoneNumber = faker.phone.number();

  const newCustomer = await Customer.create(customer);
  return newCustomer._id;
};
const generateDefaultOpeningTime = () => {
  const weekDays = generateRandomHour();
  const openingTimes = Array.from({ length: 5 }, () => weekDays);
  const weekEnd = faker.helpers.maybe(() => generateRandomHour(), {
    probability: 0.5,
  });
  openingTimes[5] = weekEnd;
  openingTimes[6] = weekEnd;
  return openingTimes;
};

const generateRandomHour = () => {
  const randomHour = faker.number.int({ min: 8, max: 12 });

  const date = new Date();
  date.setHours(randomHour);
  date.setMinutes(0);
  date.setSeconds(0);
  const openingHour = format(date, "HH:mm");

  const closingHourDate = addHours(date, faker.number.int({ min: 8, max: 12 }));
  const closingHour = format(closingHourDate, "HH:mm");

  return { openingHour, closingHour };
};

module.exports = {
  createDB,
  generateRandomHour,
  generateDefaultOpeningTime,
  addsDesertsAndAppetizers,
};
