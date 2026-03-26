import { Router } from "express";
import InterfaceRouter from "../../shared/InterfaceRouter.js";

export default class CommentRouter implements InterfaceRouter{
    public router: Router;
    public path: string;

    constructor(){
        this.router = Router();
        this.path = '/comments';
        this.routes();
    }

    private routes(): void{
        this.router.get('/', (_req, res) => {
            res.send('Get all comments');
        });
    }
}