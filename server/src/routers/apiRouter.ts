import { Router } from 'express';
import * as apiController from '../controllers/apiController';

const router: Router = Router();

router.get('/level/:id', apiController.getByLevelId);

export const apiRoutes = router;
