const controller = require("../controllers/SportgroundController");
const { Router, response } = require("express");
const auth = require("../../middlewire/auth");

const router = Router();

router.post("/", auth.verifyCompanyRole, controller.createSportground);
router.get("/", controller.getAllSportgrounds);
router.get("/:id", controller.getSportgroundById);
router.get("/company/:companyId", controller.getSportgroundsByCompanyId);
router.put("/:id", auth.verifyCompanyRole, controller.updateSportground);
router.delete("/:id", auth.verifyCompanyRole, controller.deleteSportground);

module.exports = router;
