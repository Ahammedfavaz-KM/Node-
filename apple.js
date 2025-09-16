import bcrypt from "bcrypt";
import express from "express";

const app = express();

app.use(express.json());

const users = [];

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 13);
  users.push({
    username,
    password1: hash,
    password
  });
  console.log(users);
  res.send("Okay Go & Check the Terminal");
});

app.listen(3030, () => console.log("running...."));
