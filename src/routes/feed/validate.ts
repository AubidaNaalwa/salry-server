import joi from 'joi'

export const ticketValidation = joi.object({
    porpuse: joi.string(),
    total: joi.number(),
    description:  joi.string()
}).with('porpuse', 'total')


export const targetValidation = joi.object({
    month: joi.number().required(),
    year: joi.number().required(),
    targetMoney: joi.number().required(),
    usedMoney: joi.number().required(),
    balance: joi.number().required(),
    email: joi.string().required()
})