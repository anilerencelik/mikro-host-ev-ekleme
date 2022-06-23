import express from 'express';
import { ObjectId } from 'mongodb';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const db = req.app.locals.db
        const { user_id, home_id } = req.body
        const start_date = req.body['start-date']
        const end_date = req.body['end-date']
        let startDate = new Date(start_date)
        let endDate = new Date(end_date)

        let isValid = true
        const home = await db.collection('Reservation').find({ home_id: home_id }).toArray()
        home.forEach(element => {
            if ((startDate > element['start-date'] && endDate > element['end-date']) || (startDate < element['start-date'] && endDate < element['end-date'])) {
                console.log("if")
            }
            else {
                isValid = false
            }
        });
        console.log(isValid)
        if (isValid) {

        }
        else {
            res.json({ 'msg': 'Bu aralıkta ev müsait değil' })
        }
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
})

export default router;