const express = require("express");
const app = express();
const product = require("./api/product");
const notif = require("./api/order/notification");

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use("/api/product", product);
app.use("/api/order/notification", notif);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
