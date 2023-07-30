const controller = require("../controllers/CompanyController");
const { Router, response } = require("express");
const auth = require("../../middlewire/auth");

const router = Router();

router.post("/register", controller.registerCompany);
router.post("/login", controller.loginCompany);
router.get("/", controller.getAllCompanies);
router.get("/:id", controller.getCompanyById);
router.put(
  "/:id",
  auth.verifyCompanyRole,
  auth.isAccessAllowed,
  controller.updateCompany
);
router.delete(
  "/:id",
  auth.verifyCompanyRole,
  auth.isAccessAllowed,
  controller.deleteCompany
);

module.exports = router;
