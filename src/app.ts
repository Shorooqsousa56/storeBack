import express, { Request, Response } from 'express';
import { userRoute } from './routes/usersRoute';
import { productRoute } from './routes/productsRoute';
import { orderRoute } from './routes/orderRoute';
import { orderItemsRoute } from './routes/orderItemsRoute';
import { authRoute } from './routes/authRoute';

import bodyParser from 'body-parser'
import { authenticate } from './middlewares/authMiddleware';

export const app: express.Application = express()

app.use(bodyParser.json())
//authenticate
app.use('/auth',authRoute);

app.use('/users',userRoute);
app.use('/products',authenticate,productRoute);
app.use('/orders',authenticate,orderRoute);
app.use('/orderItems',authenticate,orderItemsRoute);

