require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8000;

const {UsersRoutes,ClientsRoutes,DeliverersRoutes,MealsRoutes,AnnouncementsRoutes,CommandsRoutes,InvoicesRoutes} = require("./src/routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users' , UsersRoutes);
app.use('/clients' , ClientsRoutes);
app.use('/deliverers' , DeliverersRoutes);
app.use('/meals' , MealsRoutes);
app.use('/announcements' , AnnouncementsRoutes);
app.use('/commands' , CommandsRoutes);
app.use('/invoices' , InvoicesRoutes);

app.listen(PORT, () =>
  console.log(`server is running at : http://localhost:${PORT}`)
);