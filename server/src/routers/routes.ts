import { Router } from 'express';
import { apiRoutes } from './apiRouter';
import { gdApiRoutes } from './gdApiRouter';
import { serverApiRoutes } from './serverApiRouter';

const router: Router = Router();

router.use(apiRoutes);
router.use('/gd', gdApiRoutes);
router.use('/server', serverApiRoutes);

export const routes = router;
