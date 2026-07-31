import express, { Application, NextFunction, Request, Response } from 'express';
import InterfaceRouter from './shared/InterfaceRouter.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from "compression"

export default class Server{
    private readonly app: Application;
    private readonly port: number;

    constructor(port: number, routes: InterfaceRouter[]){
        this.app = express();
        this.port = port;

        this.middlewares();
        this.routes(routes);

        this.errorMiddleware()
    }

    private middlewares(): void{
        this.app.use(express.json());
        this.app.use(cors({
            origin: 'http://localhost:5173',
            credentials: true
        }))
        this.app.use(cookieParser());
        this.app.use(compression())
    }

    private errorMiddleware(): void{
        this.app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
            res.status(err.status || 500).json({
                message: err.message || "Internal server error"
            })
        })
    }

    private routes(routers: InterfaceRouter[]): void{
        routers.forEach((route) => {
            this.app.use("/api" + route.path, route.router);
        });
    }

    public listen(): void{
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}