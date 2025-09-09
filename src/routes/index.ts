import Express, { Router } from 'express';
import { getOwner, getOwners } from '../controllers/clientsController.js';
import {getPet, getPets} from '../controllers/petsController.js'

const router: Router = Express.Router();

// router.get('/', (req: Request, res: Response, next: NextFunction) => {
//   res.json('hi');
//   next();
// });


router.get('/pets', getPets);
router.get('/pets/:id', getPet);

router.get('/owners', getOwners);
router.get('/owners/:id', getOwner);

export default router;
