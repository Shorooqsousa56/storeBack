import 'express';

declare module 'express-serve-static-core'{
interface Request{
    locals?:{
        token?:string;
        payload?:{role:string;id:number;email:string};
    }
}

}