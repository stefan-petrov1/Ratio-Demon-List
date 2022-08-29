import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import * as gdApiController from '../controllers/gdApiController';

const router: Router = Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message:
    "Rate limited. You can't send any more requests to the server for the next 15 minutes.<br><br>Please don't spam my servers. It slows my servers as well as robtop's servers. Spamming my servers may result in IP ban and whenever that happens I'll have to make the rate limiting even worse - so please don't do it!",
  standardHeaders: true,
  legacyHeaders: false,
});

router.use(limiter);
router.get('/:id', gdApiController.getLevelById);

export const gdApiRoutes = router;
