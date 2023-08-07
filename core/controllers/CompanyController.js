const Company = require("../models/Company");
const Sportground = require("../models/Sportground");
const { secretKey, companyRole } = require("../../constants");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SportgroundType = require("../models/SportgroundType");

const registerCompany = async (req, res) => {
  try {
    const { email, password, name, phone } = req.body;

    const existingCompany = await Company.findOne({ where: { email } });
    if (existingCompany) {
      return res
        .status(400)
        .json({ error: "Company with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const company = await Company.create({
      email,
      password: hashedPassword,
      name,
      description: null,
      phone,
    });

    const token = jwt.sign(
      {
        id: company.id,
        role: companyRole,
      },
      secretKey,
      { expiresIn: "30d" }
    );

    res.status(201).json({
      company,
      token,
    });
  } catch (error) {
    console.error("Error registering company:", error);
    res
      .status(500)
      .json({ error: "An error occurred while registering the company." });
  }
};

const loginCompany = async (req, res) => {
  try {
    const { email, password } = req.body;

    const company = await Company.findOne({ where: { email } });
    if (!company) {
      return res.status(404).json({ error: "Company not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, company.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password." });
    }

    const token = jwt.sign(
      {
        id: company.id,
        role: companyRole,
      },
      secretKey,
      { expiresIn: "30d" }
    );

    res.json({ company, token });
  } catch (error) {
    console.error("Error logging in company:", error);
    res
      .status(500)
      .json({ error: "An error occurred while logging in the company." });
  }
};

const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.json(companies);
  } catch (error) {
    console.error("Error retrieving companies:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving companies." });
  }
};

const getCompanyById = async (req, res) => {
  const companyId = req.params.id;
  try {
    const company = await Company.findByPk(companyId);
    if (!company) {
      return res.status(404).json({ error: "Company not found." });
    }
    const sportgrounds = await Sportground.findAll({
      where: { company_id: company.id.toString() },
      include: {
        model: SportgroundType,
        attributes: ["id", "type"],
      },
    });
    const companyWithSportgrounds = {
      id: company.id,
      email: company.email,
      name: company.name,
      description: company.description,
      phone: company.phone,
      sportgrounds,
    };
    res.json({ company: companyWithSportgrounds });
  } catch (error) {
    console.error("Error retrieving company:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the company." });
  }
};

const updateCompany = async (req, res) => {
  const companyId = req.params.id;
  try {
    const { email, name, description, phone } = req.body;

    const existingCompany = await Company.findByPk(companyId);
    if (!existingCompany) {
      return res.status(404).json({ error: "Company not found." });
    }

    existingCompany.email = email;
    existingCompany.name = name;
    existingCompany.description = description;
    existingCompany.phone = phone;

    await existingCompany.save();

    res.json(existingCompany);
  } catch (error) {
    console.error("Error updating company:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the company." });
  }
};

const deleteCompany = async (req, res) => {
  const companyId = req.params.id;
  try {
    const deletedCompany = await Company.destroy({ where: { id: companyId } });
    if (deletedCompany === 0) {
      return res.status(404).json({ error: "Company not found." });
    }
    res.json({ message: "Company deleted successfully." });
  } catch (error) {
    console.error("Error deleting company:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the company." });
  }
};

module.exports = {
  registerCompany,
  loginCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};
