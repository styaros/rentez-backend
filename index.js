const express = require("express");
const cors = require("cors");

const routes = require("./core/routes/index");

const PORT = 4000;

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/companies", routes.companyRoutes);
app.use("/users", routes.userRoutes);
app.use("/sportground_types", routes.sportgroundTypeRoutes);
app.use("/sportgrounds", routes.sportgroundRoutes);
app.use("/boxes", routes.boxRoutes);
app.use("/reservations", routes.reservationRoutes);

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
