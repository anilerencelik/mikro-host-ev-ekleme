import express from 'express';
import { ObjectId } from 'mongodb';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const db = req.app.locals.db
        const { sahipID, price, adres, sehir, long, lat, image_url, desc, title } = req.body

        const checkHost = await db.collection('Reservation').findOne(ObjectId(sahipID))

        if (checkHost == null || checkHost.isHost == false) {
            res.json({ 'msg': 'Ev eklemk için host olmak gerekir.' })
        } else {
            const response = await db.collection('post').insertOne({
                createdAt: Date(),
                updatedAt: Date(),
                isDeleted: false,
                mediaCount: mediaType,
                medias: medias,
                userID: ObjectId(uid),
                votedUsers,
                votes,
                description,
                category
            })
            res.json(response)
        }
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