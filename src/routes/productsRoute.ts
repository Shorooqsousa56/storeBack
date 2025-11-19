import  express  from "express";
import { ProductHandler } from "../handlers/productHandler";
import { authorization } from "../middlewares/authMiddleware";


export const productRoute=express.Router();
const producthandler=new ProductHandler();

productRoute.post('/',authorization(["admin"]),producthandler.createProduct);
productRoute.get('/',authorization(["admin","customer"]),producthandler.getAllProducts);
productRoute.get('/search',authorization(["admin","customer"]),producthandler.searchProducts);
productRoute.get('/:id',authorization(["admin","customer"]),producthandler.getAllProductById);
productRoute.patch('/:id',authorization(["admin"]),producthandler.updateProduct);
productRoute.delete('/:id',authorization(["admin"]),producthandler.deleteProduct);

