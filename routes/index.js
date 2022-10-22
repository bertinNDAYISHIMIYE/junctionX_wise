import { Router} from 'express'
import cityCost from '../routes/cityCost'

const router = Router();


router.use('/livingCost', cityCost)
router.get('/', (req, res) => {
    res.status(200).json({
      status: 200,
      message: 'Explore different living costs around the globe cities (:',
    });
  });
  
    router.use((req, res) => {
    res.status(404).json({
      status: 404,
      message: 'Page not found',
      });
  });
  export default router;