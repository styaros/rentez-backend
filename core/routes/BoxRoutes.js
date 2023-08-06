const controller = require("../controllers/BoxController");
const { Router, response } = require("express");
const auth = require("../../middlewire/auth");

const router = Router();

router.post("/:sportgroundId", auth.verifyCompanyRole, controller.createBox);
router.get("/", controller.getAllBoxes);
router.get("/:id", controller.getBoxById);
router.get("/sportground/:sportgroundId", controller.getBoxesBySportgroundId);
router.post(
  "/sportground-av/:sportgroundId",
  controller.getAvailableBoxesInSportground
);
router.put("/:id", auth.verifyCompanyRole, controller.updateBox);
router.delete("/:id", auth.verifyCompanyRole, controller.deleteBox);

module.exports = router;
