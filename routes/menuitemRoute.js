const express = require('express');
const router = express.Router();

const menuitem = require('./../Models/menuitem');

router.post('/', async(req,resp) => {
    try {
            const data = req.body;
            const newMenu = new menuitem(data);
            const response = await newMenu.save();
            console.log('Data saved successfully:');
            resp.status(200).json(response);
        }catch(err){
            console.log(err);
            resp.status(500).json({ error:'Failed to save data'});
        }
});

router.get('/', async(req,resp) => {
    try {
        const menuitems = await menuitem.find();
        resp.status(200).json(menuitems);
    } catch (err) {
        console.log(err);
        resp.status(500).json({ error:'Failed to fetch data'});
    }
});

router.get('/:taste', async(req,resp) => {
    try{
        const taste = req.params.taste;
        if(taste == 'sweet' || taste == 'sour' || taste == 'spicy'){
            const response = await menuitem.find({taste:taste});
            console.log("fetched data successfully");
            resp.status(200).json(response);
        }else{
            resp.status(404).json({error:'Invalid taste type'});
        }

    }catch(err){
        console.log(err);
        resp.status(500).json({ error:'Failed to fetch data'});
    }
})
module.exports = router;