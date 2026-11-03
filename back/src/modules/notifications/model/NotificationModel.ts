import { Pool, PoolConnection } from "mysql2/promise";
import pool from "../../../config/Database.js";

export default class NotificationModel{
    constructor(private readonly db: Pool | PoolConnection = pool){}
}