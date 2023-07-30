const controller = require("../controllers/SportgroundTypeController");
const { Router, response } = require("express");
const auth = require("../../middlewire/auth");

const router = Router();

router.post("/", controller.createSportgroundType);
router.get("/", controller.getAllSportgroundType);
router.get("/:id", controller.getSportgroundTypeById);
router.put("/:id", controller.updateSportgroundType);
router.delete("/:id", controller.deleteSportgroundType);

module.exports = router;
