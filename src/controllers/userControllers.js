import db from "../db/db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  
  const passwordHash = bcrypt.hashSync(password, 10);
  const token = uuid();

  try {
    await db.collection('users').insertOne({
      name,
      email,
      password: passwordHash,
    });
    db.collection('sessions').insertOne({
      email,
      token,
      chart: [],
    });
    res.status(201).send(token);
  } catch(err) {
    console.log(err);
    res.sendStatus(400);
  }
}

const login = async (req, res) => {
  
  try {
    const token = uuid();

    await db.collection('sessions').insertOne({
      email: req.body.email,
      token,
    });
    res.send(token);
  } catch (err) {
    res.sendStatus(400);
  }
}

export { signUp, login };