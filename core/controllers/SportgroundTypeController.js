const SportgroundType = require("../models/SportgroundType");

const createSportgroundType = async (req, res) => {
  try {
    const { type } = req.body;
    const sportgroundType = await SportgroundType.create({ type });
    res.status(201).json(sportgroundType);
  } catch (error) {
    console.error("Error creating sportground type:", error);
    res.status(500).json({
      error: "An error occurred while creating the sportground type.",
    });
  }
};

const getAllSportgroundType = async (req, res) => {
  try {
    const sportgroundTypes = await SportgroundType.findAll();
    res.json(sportgroundTypes);
  } catch (error) {
    console.error("Error retrieving sportground types:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving sportground types." });
  }
};

const getSportgroundTypeById = async (req, res) => {
  const sportgroundTypeId = req.params.id;
  try {
    const sportgroundType = await SportgroundType.findByPk(sportgroundTypeId);
    if (!sportgroundType) {
      return res.status(404).json({ error: "Sportground type not found." });
    }
    res.json(sportgroundType);
  } catch (error) {
    console.error("Error retrieving sportground type:", error);
    res.status(500).json({
      error: "An error occurred while retrieving the sportground type.",
    });
  }
};

const updateSportgroundType = async (req, res) => {
  const sportgroundTypeId = req.params.id;
  try {
    const { type } = req.body;

    const existingSportgroundType = await SportgroundType.findByPk(
      sportgroundTypeId
    );
    if (!existingSportgroundType) {
      return res.status(404).json({ error: "Sportground type not found." });
    }

    existingSportgroundType.type = type;

    await existingSportgroundType.save();

    res.json(existingSportgroundType);
  } catch (error) {
    console.error("Error updating sportground type:", error);
    res.status(500).json({
      error: "An error occurred while updating the sportground type.",
    });
  }
};

const deleteSportgroundType = async (req, res) => {
  const sportgroundTypeId = req.params.id;
  try {
    const deletedSportgroundType = await SportgroundType.destroy({
      where: { id: sportgroundTypeId },
    });
    if (deletedSportgroundType === 0) {
      return res.status(404).json({ error: "Sportground type not found." });
    }
    res.json({ message: "Sportground type deleted successfully." });
  } catch (error) {
    console.error("Error deleting sportground type:", error);
    res.status(500).json({
      error: "An error occurred while deleting the sportground type.",
    });
  }
};

module.exports = {
  createSportgroundType,
  getAllSportgroundType,
  getSportgroundTypeById,
  updateSportgroundType,
  deleteSportgroundType,
};
