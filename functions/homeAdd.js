import express from 'express';
import { ObjectId } from 'mongodb';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const db = req.app.locals.db
        const { _id, sahipID, price, adres, sehir, long, lat, image_url, desc, title } = req.body

        const checkHost = await db.collection('user').findOne(ObjectId(sahipID))

        const image_url_array = image_url.split(',')

        if (checkHost == null || checkHost.isHost == false) {
            res.json({ 'msg': 'Ev eklemk için host olmak gerekir.' })
        } else {
            let object = {
                sahipID,
                price,
                adres,
                sehir,
                long,
                lat,
                image_url: image_url_array,
                desc,
                title
            }
            if (_id != null) {
                object._id = ObjectId(_id)
                console.log(object)
                res.json(await db.collection('Home').updateOne({ '_id': ObjectId(_id) }, { $set: object }))
            } else {
                res.json(await db.collection('Home').insertOne(object))
            }
        }
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
})

router.delete('/', async (req, res) => {
    try {
        const db = req.app.locals.db
        const { _id } = req.body

        const home = await db.collection('Home').findOne(ObjectId(_id))
        if (home == null) {
            res.json({ 'msg': 'Böyle bir ev bulunamadı' })
        } else {
            res.json(await db.collection('Home').deleteOne({ _id: new ObjectId(_id) }))
        }
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
})

router.get('/', async (req, res) => {
    try {
        const db = req.app.locals.db
        const { _id } = req.headers
        const checkHost = await db.collection('Home').find({ 'sahipID': _id }).toArray()
        res.json(checkHost)

        // if (checkHost == null || checkHost.isHost == false) {
        //     res.json({ 'msg': 'Ev eklemk için host olmak gerekir.' })
        // } else {
        //     let object = {
        //         sahipID,
        //         price,
        //         adres,
        //         sehir,
        //         long,
        //         lat,
        //         image_url,
        //         desc,
        //         title,
        //     }
        //     if (_id != null) {
        //         object._id = ObjectId(_id)
        //         console.log(object)
        //         res.json(await db.collection('Home').updateOne({ '_id': ObjectId(_id) }, { $set: object }))
        //     } else {
        //         res.json(await db.collection('Home').insertOne(object))
        //     }
        // }
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
})

export default router;