import joi from "joi"

export const registerSchema = joi.object({
    cpfCnpj: joi.number().required(),
    name: joi.string().required(),
    birth: joi.required(),
    email: joi.string().email().required(),
    password: joi.string().min(3).required()
})

export const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(3).required()
})