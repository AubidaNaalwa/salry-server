import express from 'express'
import TicketSchema from '../../mongo-models/feed/Ticket'
import { ticketValidation } from './validate'
import { AuthRequest } from '../../middlewares/auth'

const router = express.Router()

router.get('/tickets', async (req:AuthRequest, res) => {
    try{
        const email = req.user
        const tickets = await TicketSchema.find({email})
        res.send({tickets})
    }catch(err) { 
        res.status(404).send(
            "fail loading tickets"
        )
    }
})

router.post('/ticket', async (req:AuthRequest , res) => {
    try{
        const email = req.user
        const ticket = ticketValidation.validate(req.body)
        if(ticket.error) { 
            return res.send('validation failed')
        }
        const mongooTicket= await TicketSchema.create({...ticket.value, email})
        await mongooTicket.save()
        res.status(200).send("ok")
    }catch(err) { 
        res.status(404).send(
            "fail loading tickets"
        )
    }
})

router.delete('/delete-ticket/:id', async (req:AuthRequest , res) => {
    try{
        const ticketId= req.params.id
        if(!ticketId) { 
            return res.send('validation failed')
        }
        await TicketSchema.deleteOne({_id: ticketId});
        res.status(200).send("ok")
    }catch(err) { 
        res.status(404).send(
            "fail deleting ticket"
        )
    }
})

export default router