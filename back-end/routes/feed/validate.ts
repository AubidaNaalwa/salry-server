import joi from 'joi'

export const ticketValidation = joi.object({
    porpuse: joi.string(),
    total: joi.number(),
    description:  joi.string()
}).with('porpuse', 'total')
