import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/upload';

import SessionController from './controllers/SessionController';
import SpotController from './controllers/SpotController';
import DashboardController from './controllers/DashboardController';
import BookingController from './controllers/BookingController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.post('/spots', upload.single('thumbnail'), SpotController.store);
routes.get('/spots', SpotController.index);

routes.get('/dashboard', DashboardController.show);

routes.post('/spots/:spot_id/booking', BookingController.store);

export default routes;
