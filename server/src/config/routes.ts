import { Router } from 'express';
import * as apiController from '../controllers/apiController';

const router: Router = Router();

router.get('/:id', apiController.getLevelById);

export const routes = router;
