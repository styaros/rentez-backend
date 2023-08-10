const { secretKey } = require("../../constants");
const jwt = require("jsonwebtoken");
const Sportground = require("../models/Sportground");
const Company = require("../models/Company");
const SportgroundType = require("../models/SportgroundType");

const createSportground = async (req, res) => {
  const companyId = req.params.id;

  try {
    const {
      address,
      description,
      workStartTime,
      workEndTime,
      sportgroundTypeId,
    } = req.body;

    const body = {
      company_id: companyId,
      address,
      description,
      work_start_time: workStartTime,
      work_end_time: workEndTime,
      sportground_type_id: sportgroundTypeId,
    };
    const sportground = await Sportground.create(body);
    res.status(201).json(sportground);
  } catch (error) {
    console.error("Error creating sportground:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the sportground." });
  }
};

const getAllSportgrounds = async (req, res) => {
  try {
    const sportgrounds = await Sportground.findAll({
      attributes: {
        exclude: ["company_id", "sportground_type_id"],
      },
      include: [
        {
          model: Company,
          attributes: ["id", "email", "name", "description", "phone"],
        },
        {
          model: SportgroundType,
          attributes: ["id", "type"],
        },
      ],
    });
    res.json(sportgrounds);
  } catch (error) {
    console.error("Error retrieving sportgrounds:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving sportgrounds." });
  }
};

const getSportgroundById = async (req, res) => {
  const sportgroundId = req.params.id;

  try {
    const sportground = await Sportground.findByPk(sportgroundId, {
      attributes: {
        exclude: ["company_id", "sportground_type_id"],
      },
      include: [
        {
          model: Company,
          attributes: ["id", "email", "name", "description", "phone"],
        },
        {
          model: SportgroundType,
          attributes: ["id", "type"],
        },
      ],
    });
    if (!sportground) {
      return res.status(404).json({ error: "Sportground not found." });
    }
    res.json(sportground);
  } catch (error) {
    console.error("Error retrieving sportground:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the sportground." });
  }
};

const getSportgroundsByCompanyId = async (req, res) => {
  const companyId = req.params.companyId;

  try {
    const sportgrounds = await Sportground.findAll({
      where: { company_id: companyId },
      attributes: { exclude: ["sportground_type_id"] },
      include: {
        model: SportgroundType,
        attributes: ["id", "type"],
      },
    });
    res.json(sportgrounds);
  } catch (error) {
    console.error("Error retrieving sportgrounds:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving sportgrounds." });
  }
};

const updateSportground = async (req, res) => {
  const sportgroundId = req.params.id;

  try {
    const {
      address,
      description,
      workStartTime,
      workEndTime,
      sportgroundTypeId,
    } = req.body;

    const existingSportground = await Sportground.findByPk(sportgroundId);
    if (!existingSportground) {
      return res.status(404).json({ error: "Sportground not found." });
    }
    existingSportground.address = address;
    existingSportground.description = description;
    existingSportground.work_start_time = workStartTime;
    existingSportground.work_end_time = workEndTime;
    existingSportground.sportground_type_id = sportgroundTypeId;

    await existingSportground.save();
    res.json(existingSportground);
  } catch (error) {
    console.error("Error updating sportground:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the sportground." });
  }
};

const deleteSportground = async (req, res) => {
  const sportgroundId = req.params.id;
  try {
    const deletedSportground = await Sportground.destroy({
      where: { id: sportgroundId },
    });
    if (deletedSportground === 0) {
      return res.status(404).json({ error: "Sportground not found." });
    }
    res.json({ message: "Sportground deleted successfully." });
  } catch (error) {
    console.error("Error deleting sportground:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the sportground." });
  }
};

module.exports = {
  createSportground,
  getAllSportgrounds,
  getSportgroundById,
  getSportgroundsByCompanyId,
  updateSportground,
  deleteSportground,
};
