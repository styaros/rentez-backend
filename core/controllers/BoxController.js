const Box = require("../models/Box");

const createBox = async (req, res) => {
  const sportground_id = req.params.sportgroundId;

  try {
    const { number, description, hour_price } = req.body;

    const newBox = await Box.create({
      sportground_id,
      number,
      description,
      hour_price,
    });

    res.json(newBox);
  } catch (error) {
    console.error("Error creating a new box:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating a new box." });
  }
};

const getAllBoxes = async (req, res) => {
  try {
    const allBoxes = await Box.findAll();

    res.json(allBoxes);
  } catch (error) {
    console.error("Error retrieving all boxes:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving all boxes." });
  }
};

const getBoxById = async (req, res) => {
  const boxId = req.params.id;

  try {
    const box = await Box.findByPk(boxId);

    if (!box) {
      return res.status(404).json({ error: "Box not found." });
    }

    res.json(box);
  } catch (error) {
    console.error("Error retrieving box by ID:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the box." });
  }
};

const getBoxesBySportgroundId = async (req, res) => {
  const sportgroundId = req.params.sportgroundId;

  try {
    const box = await Box.findAll({
      where: { sportground_id: sportgroundId },
    });

    if (!box) {
      return res.status(404).json({ error: "Box not found." });
    }

    res.json(box);
  } catch (error) {
    console.error("Error retrieving box by ID:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the box." });
  }
};

const updateBox = async (req, res) => {
  const boxId = req.params.id;

  try {
    const { number, description, hour_price } = req.body;
    const box = await Box.findByPk(boxId);

    if (!box) {
      return res.status(404).json({ error: "Box not found." });
    }

    box.number = number;
    box.description = description;
    box.hour_price = hour_price;

    await box.save();

    res.json(box);
  } catch (error) {
    console.error("Error updating the box:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the box." });
  }
};

const deleteBox = async (req, res) => {
  const boxId = req.params.id;

  try {
    const deletedBox = await Box.destroy({
      where: { id: boxId },
    });

    if (deletedBox === 0) {
      return res.status(404).json({ error: "Box not found." });
    }

    res.json({ message: "Box deleted successfully." });
  } catch (error) {
    console.error("Error deleting the box:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the box." });
  }
};

module.exports = {
  createBox,
  getAllBoxes,
  getBoxById,
  getBoxesBySportgroundId,
  updateBox,
  deleteBox,
};
