import express, { Router } from 'express';
import rateLimit from 'express-rate-limit';
import * as serverAuthController from '../controllers/serverAuthController';
import * as serverLevelController from '../controllers/serverLevelController';
import {
  allowAdmin,
  allowGuest,
  allowUser,
  authMiddleware,
} from '../middlewares/authMiddleware';

const router: Router = Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message:
    "Rate limited. You can't send any more requests to the server for the next 15 minutes.<br><br>Please don't spam my servers. It slows my servers as well as robtop's servers. Spamming my servers may result in IP ban and whenever that happens I'll have to make the rate limiting even worse - so please don't do it!",
  standardHeaders: true,
  legacyHeaders: false,
});

// Middlewares
router.use(limiter);
router.use(express.json());
router.use(authMiddleware);

// Level API
router.post('/level/new', allowAdmin, serverLevelController.createLevel);

// Authentication API
router.post('/auth/login', allowGuest, serverAuthController.loginUser);
router.post('/auth/register', allowGuest, serverAuthController.registerUser);
router.post('/auth/logout', allowUser, serverAuthController.logoutUser);
router.post('/auth/token', serverAuthController.getJwtToken);

export const serverApiRoutes = router;
