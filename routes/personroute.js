const express = require('express');
const router = express.Router();
const person = require('./../Models/person');

router.post('/', async(req,resp) => {
    try {
            const data = req.body;
            const newPerson = new person(data);

            const response = await newPerson.save();
            console.log('Data saved successfully:');
            resp.status(200).json(response);

    }
    catch(err){
        console.log(err);
        resp.status(500).json({ error:'Failed to save data'});
    }
});
router.get('/', async(req,resp) => {
    try {
        const persons = await person.find();
        resp.status(200).json(persons);
    } catch (err) {
        console.log(err);
        resp.status(500).json({ error:'Failed to fetch data'});
    }
});
router.get('/:workType',async(req,resp) => {
    try{
        const workType = req.params.workType;
        if(workType == 'chef' || workType == 'waiter' || workType == 'manager'){
            const response = await person.find({work:workType});
            console.log("fetched data successfully");
            resp.status(200).json(response);
        }else{
            resp.status(404).json({error:'Invalid work type'});
        }
    }catch(err){
        console.log(err);
        resp.status(500).json({ error:'Failed to fetch data'});
    }
});

router.put('/:id' , async(req,resp) => {
    try{
        const personid = req.params.id;
        const updatedPersonData = req.body;

        const response = await person.findByIdAndUpdate(personid, updatedPersonData, {
            new:true,
            runValidators:true
        });
        if(!response){
            resp.status(404).json({error:'Person not found'});
        }
        resp.status(200).json(response);

    }catch(err){
        console.log(err);
        resp.status(500).json({ error:'Failed to update data'});
    }
});

router.delete('/:id', async(req,resp) => {
    try{
        const personid = req.params.id;
        const response = await person.findByIdAndDelete(personid);
        if(!response){
            resp.status(404).json({error:'Person not found'});
        }
        resp.status(200).json({message:'Person deleted successfully'});
    }catch(err){
        console.log(err);
        resp.status(500).json({ error:'Failed to delete data'});
    }
});
module.exports = router;