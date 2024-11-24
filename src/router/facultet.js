const {facultet} = require("../orm");
const facultetRouter = require('express').Router();

const Facultet = facultet

facultetRouter.get('/select', async (req, res) => {
   try {
       const { search } = req.body;

       const result = await  Facultet.findAll()

       if(!search){
           return res.json(result)
       }

       if(search){
           const filteredResult = result.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
           return res.json({
               items: filteredResult,
           })
       }
   }catch(err) {
       res.status(400).send({error: err.message});
   }

})

module.exports = {facultetRouter};