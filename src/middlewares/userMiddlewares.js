import joi from "joi";
import db from "../db/db.js";
import bcrypt from "bcrypt";

const userDataSchema = joi.object({
  name: joi.string().alphanum().trim().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  passwordConfirm: joi.ref("password"),
});

const signUpMiddleware = async (req, res, next) => {
  const userData = req.body;

  const [sameEmail] = await db.collection('users')
    .find({ email: userData.email })
    .toArray();
  
  if(sameEmail) {
    res.status(409).send('Email already in use');
    return;
  }

  const validation = userDataSchema.validate(req.body, { abortEarly: false });

  if(validation.error) {
    const errors = validation.error.details.map(error => error.message);
    res.status(422).send(errors);
    return;
  }

  res.locals.userData = userData;
  next();
}

const loginMiddleware = async (req, res, next) => {
  const user = await db.collection('users').findOne({ email: req.body.email });
  const passDecrypt = bcrypt.compareSync(req.body.password, user.password);

  if(user && passDecrypt) {
    next();
  } else {
    res.status(409).send('Invalid email or password');
    return;
  }
}

export { signUpMiddleware, loginMiddleware };