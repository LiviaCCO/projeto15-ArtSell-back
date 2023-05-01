import db from "../db/db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  const passwordHash = bcrypt.hashSync(password, 10);

  try {
    const user = await db.collection('users').findOne({ email });
    if (user) return res.status(409).send("E-mail já cadastrado!")
    await db.collection('users').insertOne({
      name,
      email,
      password: passwordHash,
    });
    res.sendStatus(201);
  } catch(err) {
    res.status(500).send(err.message);
  }
}

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const token = uuid();
  
  try {
    const user = await db.collection('users').findOne({ email });
    if (!user) return res.status(404).send("O e-mail informado não é cadastrado");
    
    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword) return res.status(401).send("Senha inválida");

    await db.collection('sessions').insertOne({ email, token });
    res.send(token);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function logout(req, res) {
  const { token } = res.locals.session

  try {
      await db.collection('sessions').deleteOne({ token });
      res.sendStatus(200);
  } catch (err) {
      res.status(500).send(err.message);
  }
}

export { signUp, signIn, logout };
