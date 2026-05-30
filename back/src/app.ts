import AuthFactory from "./modules/auth/factory/AuthFactory.js";
import OfferFactory from "./modules/offers/factory/OffersFactory.js";
import ResumeFactory from "./modules/resume/factory/ResumeFactory.js";
import UserFactory from "./modules/users/factory/UserFactory.js";
import Server from "./server.js";

const userRouter = UserFactory.create()

const authRouter = AuthFactory.create()

const offerRouter = OfferFactory.create()

const resumeRouter = ResumeFactory.create()

const server = new Server(8080, [userRouter, authRouter, offerRouter, resumeRouter])

server.listen()