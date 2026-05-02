const Item = require("../models/Item");

exports.getItems = async (req, res) => {
  try {
    const items = await Item.findAll({
      where: {
        user_id: req.user.id   // 🔥 ONLY THIS ADMIN'S ITEMS
      }
    });

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createItem = async (req, res) => {
  try {
    const { name, type, pricePerDay, available_quantity, description } = req.body;

    if (!name || !type || !pricePerDay) {
      return res.status(400).json({ message: "Name, type, pricePerDay required" });
    }

    const item = await Item.create({
      name,
      type,
      description,
      pricePerDay,
      available_quantity,
      user_id: req.user.id   // 🔥 OWNER LINK
    });

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    await Item.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.user.id   // 🔥 OWNERSHIP CHECK
      }
    });

    res.json({ message: "Updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    await Item.destroy({
      where: {
        id: req.params.id,
        user_id: req.user.id   // 🔥 ONLY OWNER CAN DELETE
      }
    });

    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};