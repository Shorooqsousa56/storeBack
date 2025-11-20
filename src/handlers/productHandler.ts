import  { Response , Request } from "express";
import { ProductRepository } from "../repositories/productRepository";
import { errorHandler } from "../utils/errorHandler";


const productRep=new ProductRepository();

export  class ProductHandler{

async createProduct (req:Request,res:Response){
      try{
        const product=await productRep.create(req.body);
         res.status(201).json(product);

        }
        
        //i use unknown instead of any because its more safe
        catch(err:unknown){
            errorHandler(err,res);

        }


    }

    async getAllProducts(req:Request,res:Response){
          try{
            const product=await productRep.getAll();
             res.status(401).json(product);
    
            }
             catch(err:unknown){
             errorHandler(err,res);

        }}


         async getAllProductById (req:Request,res:Response){
              try{
                const id=parseInt(req.params.id);
                if (isNaN(id)) {
              return res.status(400).json({ message: 'id is required' });
            }
                const product=await productRep.getById(id);
                if(product==null){ res.status(404).json({message:'product not found!'});
        }
                 res.status(200).json(product);
        
                }
                
                //i use unknown instead of any because its more safe
                catch(err:unknown){
                   errorHandler(err,res);
        
                }
        
        
            }

         async updateProduct(req:Request,res:Response){
                try{
                    const id=parseInt(req.params.id);
                     if (isNaN(id)) {
              return res.status(400).json({ message: 'id is required' });
            }
                    
        
                     const product=await productRep.update(id,req.body);
                      if (!product)
                      return res.status(404).json({ message: 'product not found' });
        
                     res.status(200).json(product);
                     
                } catch(err:unknown){
                    errorHandler(err,res);
        
                }
        
            }

          

             async searchProducts(req:Request,res:Response){
            
                    try{
                        const search= req.query.q as string;
                        if (!search)
                    return res.status(400).json({ message: 'Search is required' });
            
                        const products=await productRep.search(search);
                        res.status(200).json(products);
            
                    } catch(err:unknown){
                        errorHandler(err,res);
            
                    }
            
                }






}
