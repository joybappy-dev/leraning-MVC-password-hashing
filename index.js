import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send(
    `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Page Title</title>
    <!-- Link to your CSS file here -->
    <link rel="stylesheet" href="style.css">
</head>
<body style="background-color: black; color:orange;">
    <h1>Hello World</h1>
    <!-- Your content goes here -->

    <!-- Link to your JavaScript file here -->
    <script src="script.js"></script>
</body>
</html>`,
  );
});

app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`Server up🚀`);
});
