require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
const userRouter = require("./api/users/user.router");

app.use(express.json());
app.use(cors());

// app.get("/api", (req, res) => {
//     res.json({
//         success: 1,
//         message: "This rest apis working"
//     });
// });

app.use("/api", userRouter);
const port = process.env.APP_PORT || 4000;
app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});

