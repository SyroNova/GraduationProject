import { Router } from "express";

export default interface InterfaceRouter{
    path: string;
    router: Router;
}