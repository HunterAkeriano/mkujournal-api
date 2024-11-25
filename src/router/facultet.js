const {facultet, facultetItems, teachers} = require("../orm");
const facultetRouter = require('express').Router();

const Facultet = facultet
const FacultetItem = facultetItems
const Teachers = teachers


facultetRouter.get('/select', async (req, res) => {
   try {
       const { search } = req.query;

       const result = await  Facultet.findAll()

       if(!search){
           return res.json({
               items: result,
           })
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

facultetRouter.get('/main-block', async (req, res) => {
    try {
        const facultetItem = await FacultetItem.findAll();
        const teachers = await Teachers.findAll();

        const result = facultetItem.map(facultet => {
            const facultyTeachers = teachers.filter(teacher => teacher.facultetId === facultet.id)
                .sort((a, b) => {
                    if (a.surName < b.surName) return -1;
                    if (a.surName > b.surName) return 1;
                    return 0;
                });

            return {
                ...facultet.dataValues,
                teachers: facultyTeachers
            };
        });

        return res.json(result);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

module.exports = {facultetRouter};