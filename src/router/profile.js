const authorize = require("../middleware/check-authorize");
const {profile} = require("../orm");
const profileRouter = require('express').Router();

const Profile = profile

profileRouter.get('/profile', authorize, async (req, res) => {
   try {
       const existingUser = await Profile.findOne({ where: { email: req.user.email } });

       res.status(200).json(existingUser)
   }catch (error) {
       res.status(400).json({ message: 'Профіль не знайдено', error });
   }
})

module.exports = {
    profileRouter
}