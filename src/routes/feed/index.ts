import express from 'express'
import TicketSchema from '../../mongo-models/feed/Ticket'
import TargetSchema from '../../mongo-models/feed/Target'
import { ticketValidation, targetValidation } from './validate'
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

router.put('/ticket', async (req:AuthRequest , res) => {
    try{
        const email = req.user
        const ticketId= req.body.id
        const ticket = ticketValidation.validate(req.body)
        if(ticket.error) { 
            return res.send('validation failed')
        }
        await TicketSchema.findOneAndUpdate({_id: ticketId, email}, {total: req.body.total})
        res.status(200).send("ok")
    }catch(err) { 
        res.status(404).send(
            "fail loading tickets"
        )
    }
})

router.get('/targets', async (req:AuthRequest, res) => {
    try{
        const email = req.user
        const targets = await TargetSchema.find({email})
        res.send({targets})
    }catch(err) { 
        res.status(404).send(
            "fail loading targets"
        )
    }
})

router.post('/target', async (req:AuthRequest , res) => {
    try{
        const email = req.user
        const target = targetValidation.validate(req.body)
        if(target.error) { 
            return res.send('validation failed')
        }
        const isTargetAlreadyCreated = await TargetSchema.find({email, year: target.value.year, month: target.value.month})
        if(isTargetAlreadyCreated)  return res.status(404).send('already have month')
        const mongooTarget= await TargetSchema.create({...target.value, email})
        await mongooTarget.save()
        res.status(200).send("ok")
    }catch(err) { 
        res.status(404).send(
            "fail loading TargetSchema"
        )
    }
})

export default router