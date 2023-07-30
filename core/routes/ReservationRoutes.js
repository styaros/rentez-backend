const controller = require("../controllers/ReservationController");
const { Router, response } = require("express");
const auth = require("../../middlewire/auth");

const router = Router();

router.post("/:boxId", auth.verifyIsAuthorized, controller.createReservation);
router.get("/", controller.getAllReservations);
router.get("/:id", auth.verifyIsAuthorized, controller.getReservationById);
router.get(
  "/user/:userId",
  auth.verifyIsAuthorized,
  controller.getAllReservationsByUserId
);
router.put("/:id", auth.verifyCompanyRole, controller.updateReservation);
router.delete("/:id", auth.verifyCompanyRole, controller.deleteReservation);

module.exports = router;
