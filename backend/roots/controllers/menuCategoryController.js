const Dish = require("../models/dishModel");
const MenuCategory = require("../models/menuCategoryModel");
const Menu = require("../models/menuModel");

exports.deleteMenuCategory = async (req, res) => {
  try {
    const deletedMenuCategory = await MenuCategory.findByIdAndDelete(
      req.params.menuCategoryId
    );
    const dish = await Dish.deleteMany({
      menuCategory: req.params.menuCategoryId,
    });

    if (!deletedMenuCategory) {
      return res.status(404).send({ message: "Couldn't find menu category" });
    }

    const menu = await Menu.findOne({
      menuCategories: { $in: [req.params.menuCategoryId] },
    });

    if (menu) {
      menu.menuCategories = menu.menuCategories.filter(
        (category) => category.toString() !== req.params.menuCategoryId
      );

      await menu.save();
    }

    res.status(200).send({ message: "Menu category deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "An error occurred while deleting the menu category" });
  }
};

exports.createMenuCategory = async (req, res) => {
  try {
    const newMenuCategory = await MenuCategory.create({
      menuCategoryName: req.body.menuCategoryName,
      menu: req.params.menuId,
    });
    res.status(201).send({ message: "created successfully", newMenuCategory });
  } catch (error) {
    res.status(404).send({
      status: " failed to create menu category bad request",
      message: error.message,
    });
  }
};

exports.changeName = async (req, res) => {
  try {
    const newMenuCategory = await MenuCategory.findByIdAndUpdate(
      req.params.menuCategoryId,
      { menuCategoryName: req.body.menuCategoryName }
    );
  } catch (error) {
    res.status(404).send({
      status: " failed to create menu category name bad request",
      message: error.message,
    });
  }
};

exports.changeOrder = async (req, res) => {
  try {
    console.log("🚀 ~ exports.changeOrder= ~ req.params.menuCategoryId:", req.params.menuCategoryId)
    const menuCategory = await MenuCategory.findById(
      req.params.menuCategoryId
    );

    console.log("🚀 ~ exports.changeOrder= ~ menuCategory:", menuCategory)
    !menuCategory &&
      res.status(404).send({ message: "cant find menu catgory" });
    const oldOrder = req.body.slice().sort();
    console.log("🚀 ~ exports.changeOrder= ~ oldOrder:", oldOrder)
    const newOrder = menuCategory.dishes
      .slice()
      .map((id) => id.toString())
      .sort();
    console.log("🚀 ~ exports.changeOrder= ~ newOrder:", newOrder)
    if (oldOrder.length == !newOrder.length) {
      res.status(404).send({ message: "bad request " });
    }
    for (let i = 0; i < oldOrder.length; i++) {
      if (oldOrder[i] !== newOrder[i]) {
        res.status(404).send({ message: "bad request " });
      }
    }
    menuCategory.dishes = newOrder;
    await menuCategory.save();
    res
      .status(200)
      .send({ message: "order of menus updated", menuCategory: menuCategory });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "server error" });
  }

};
