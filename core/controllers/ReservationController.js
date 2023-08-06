const Reservation = require("../models/Reservation");

const createReservation = async (req, res) => {
  const boxId = req.params.boxId;

  try {
    const { userId, startDate, endDate } = req.body;

    const newReservation = await Reservation.create({
      box_id: parseInt(boxId),
      user_id: parseInt(userId),
      start_date: startDate,
      end_date: endDate,
    });
    res.status(201).json(newReservation);
  } catch (error) {
    console.error("Error creating reservation:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the reservation." });
  }
};

const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll();
    res.json(reservations);
  } catch (error) {
    console.error("Error retrieving reservations:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving reservations." });
  }
};

const getReservationById = async (req, res) => {
  const reservationId = req.params.id;

  try {
    const reservation = await Reservation.findByPk(reservationId);
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found." });
    }
    res.json(reservation);
  } catch (error) {
    console.error("Error retrieving reservation:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the reservation." });
  }
};

const getAllReservationsByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    const reservation = await Reservation.findAll({
      where: { user_id: userId },
    });
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found." });
    }
    res.json(reservation);
  } catch (error) {
    console.error("Error retrieving reservation:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the reservation." });
  }
};

const updateReservation = async (req, res) => {
  const reservationId = req.params.id;
  const { startDate, endDate } = req.body;

  try {
    const reservation = await Reservation.findByPk(reservationId);
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found." });
    }

    reservation.start_date = startDate;
    reservation.end_date = endDate;
    await reservation.save();

    res.json(reservation);
  } catch (error) {
    console.error("Error updating reservation:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the reservation." });
  }
};

const updateReservationStatus = async (req, res) => {
  const reservationId = req.params.id;

  try {
    const reservation = await Reservation.findByPk(reservationId);
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found." });
    }

    reservation.status = "finished";
    await reservation.save();

    res.json(reservation);
  } catch (error) {
    console.error("Error updating reservation:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the reservation." });
  }
};

const deleteReservation = async (req, res) => {
  const reservationId = req.params.id;

  try {
    const deletedReservation = await Reservation.destroy({
      where: { id: reservationId },
    });
    if (deletedReservation === 0) {
      return res.status(404).json({ error: "Reservation not found." });
    }
    res.json({ message: "Reservation deleted successfully." });
  } catch (error) {
    console.error("Error deleting reservation:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the reservation." });
  }
};

module.exports = {
  createReservation,
  getAllReservations,
  getReservationById,
  getAllReservationsByUserId,
  updateReservation,
  updateReservationStatus,
  deleteReservation,
};
