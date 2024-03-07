const Dish = require("../models/dishModel");
const MenuCategory = require("../models/menuCategoryModel");
const Menu = require("../models/menuModel");

exports.deleteMenuCategory = async (req, res) => {
 try {

   
   const deletedMenuCategory = await MenuCategory.findByIdAndDelete(
     req.params.menuCategoryId
     );
     const dish =await Dish.deleteMany({menuCategory:req.params.menuCategoryId})
     
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
    res.status(500).send({ message: "An error occurred while deleting the menu category" });
 }

};


