const Rental = require("../models/Rental");
const Item = require("../models/Item");
exports.rentItem = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("USER:", req.user);

    const { item_id, customer_name, customer_phone,return_date } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized (no user)" });
    }

    const item = await Item.findByPk(item_id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (item.available_quantity <= 0) {
      return res.status(400).json({ message: "No stock available" });
    }

    // decrease stock
    item.available_quantity -= 1;
    await item.save();

    const rental = await Rental.create({
      item_id,
      user_id: req.user.id,
      customer_name,
      customer_phone,
      status: "rented",
      rent_date: new Date(),
      return_date: return_date
    });

    res.json({
      message: "Rented successfully",
      rental
    });

  } catch (err) {
    console.error("RENT ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};


exports.returnItem = async (req, res) => {
  try {
    const rental = await Rental.findByPk(req.params.id);

    if (!rental) {
      return res.status(404).json({ message: "Rental not found" });
    }

    rental.status = "returned";
    rental.return_date = new Date();

    await rental.save(); 

    const item = await Item.findByPk(rental.item_id);
    item.available_quantity += 1;

    await item.save();

    res.json({ message: "item returned" });

  } catch (err) {
    res.status(500).json(err.message);
  }
};
exports.getmyRentals = async(req,res) => {
  try{
    const rentals = await Rental.findAll({
      include: [
        {
          model: Item,
          where:{
            user_id:req.user.id
          }
        }
      ]
    });
    res.json(rentals);
  }catch(err){
    res.status(500).json({message: err.message});
  }
};