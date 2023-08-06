const { Op } = require("sequelize");
const Sportground = require("../models/Sportground");
const Reservation = require("../models/Reservation");
const Box = require("../models/Box");

const createBox = async (req, res) => {
  const sportground_id = req.params.sportgroundId;

  try {
    const { number, description, hourPrice } = req.body;

    const newBox = await Box.create({
      sportground_id,
      number,
      description,
      hour_price: hourPrice,
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

const getAvailableBoxesInSportground = async (req, res) => {
  const sportgroundId = req.params.sportgroundId;

  try {
    const { startDate, endDate } = req.body;

    startDateParsed = new Date(startDate);
    endDateParsed = new Date(endDate);

    const boxes = await Box.findAll({
      where: { sportground_id: sportgroundId },
    });

    const overlappingReservations = await Reservation.findAll({
      where: {
        status: "active",
        [Op.and]: [
          {
            start_date: {
              [Op.notBetween]: [startDate, endDate],
            },
          },
          {
            end_date: {
              [Op.notBetween]: [startDate, endDate],
            },
          },
          { start_date: { [Op.not]: startDate } },
          { end_date: { [Op.not]: endDate } },
        ],
      },
    });

    const bookedBoxIds = overlappingReservations.map(
      (reservation) => reservation.box_id
    );

    const availableBoxes = boxes.filter(
      (box) => !bookedBoxIds.includes(box.id)
    );

    res.json(availableBoxes);
  } catch (error) {
    console.error("Error retrieving available boxes:", error);
    throw error;
  }
};

const updateBox = async (req, res) => {
  const boxId = req.params.id;

  try {
    const { number, description, hourPrice } = req.body;
    const box = await Box.findByPk(boxId);

    if (!box) {
      return res.status(404).json({ error: "Box not found." });
    }

    box.number = number;
    box.description = description;
    box.hour_price = hourPrice;

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
  getAvailableBoxesInSportground,
  updateBox,
  deleteBox,
};
