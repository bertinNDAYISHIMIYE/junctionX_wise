import express from 'express';
import {cityLivingCost} from '../controllers/cityCost'

const router = express.Router();

router.get('/:city', cityLivingCost.getCityLivingCost);

export default router;