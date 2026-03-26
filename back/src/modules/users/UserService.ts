import { RegisterUserDTO } from "./dto/RegisterUserDTO.js";
import UserModel from "./models/UserModel.js";
import bcrypt from "bcrypt";
import { User } from "./types/User.js";

export default class UserService{

    constructor(private readonly userModel: UserModel) {}

    public async register(userData: RegisterUserDTO) {
        const hashedPassword = await this.hashPassword(userData.password);

        const result = await this.userModel.create({
            ...userData,
            password: hashedPassword
        });

        if(result.affectedRows === 0){
            throw new Error("Error creating user")
        }

        const id = result.insertId

        const user: User = await this.userModel.findById(id);

        if(!user){
            throw new Error("User created but not found")
        }

        return user;
    }

    private async hashPassword(password: string): Promise<string> {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    }
}