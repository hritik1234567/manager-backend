const express=require('express')
const { formController,getmetricController,updatemetricController,deletemetricController } = require('../controllers/metricController');


const {requireSignin} = require('../middlewares/authMiddleware');

const router=express.Router()

router.post('/create-data',requireSignin,formController);
router.get('/get-data',requireSignin,getmetricController);
router.put('/update-data/:id',requireSignin,updatemetricController);
router.delete('/delete-data/:id',deletemetricController);
module.exports = router;