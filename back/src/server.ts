import express, { Application } from 'express';
import InterfaceRouter from './shared/InterfaceRouter.js';

export default class Server{
    private readonly app: Application;
    private readonly port: number;

    constructor(port: number, routes: InterfaceRouter[]){
        this.app = express();
        this.port = port;

        this.middlewares();
        this.routes(routes);
    }

    private middlewares(): void{
        this.app.use(express.json());
    }

    private routes(routers: InterfaceRouter[]): void{
        routers.forEach((route) => {
            this.app.use(route.path, route.router);
        });
    }

    public listen(): void{
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}