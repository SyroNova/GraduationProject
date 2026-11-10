import { RowDataPacket } from "mysql2";

export default interface CountType extends RowDataPacket{
    count: number
}