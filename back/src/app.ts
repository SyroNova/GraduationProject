import AuthFactory from "./modules/auth/factory/AuthFactory.js";
import UserFactory from "./modules/users/factory/UserFactory.js";
import Server from "./server.js";
const userRouter = UserFactory.create()

const authRouter = AuthFactory.create()

const server = new Server(8080, [userRouter, authRouter])

server.listen()