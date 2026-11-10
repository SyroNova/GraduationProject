import AuthFactory from "./modules/auth/factory/AuthFactory.js";
import CommentFactory from "./modules/comments/factory/CommentFactory.js";
import DocumentFactory from "./modules/document/factory/DocumentFactory.js";
import EscoFactory from "./modules/esco/factory/EscoFactory.js";
import NotificationFactory from "./modules/notifications/Factory/NotificationFactory.js";
import OfferFactory from "./modules/offers/factory/OffersFactory.js";
import ReportFactory from "./modules/reports/Factory/ReportFactory.js";
import ResumeFactory from "./modules/resume/factory/ResumeFactory.js";
import UserFactory from "./modules/users/factory/UserFactory.js";
import Server from "./server.js";

const userRouter = UserFactory.create()

const authRouter = AuthFactory.create()

const offerRouter = OfferFactory.create()

const resumeRouter = ResumeFactory.create()

const escoRouter = EscoFactory.create()

const documentRouter = DocumentFactory.create()

const commentRouter = CommentFactory.create()

const reportRouter = ReportFactory.create()

const notificationRouter = NotificationFactory.create()

const server = new Server(8080, [userRouter, authRouter, offerRouter, resumeRouter, escoRouter, documentRouter, commentRouter, reportRouter, notificationRouter])

server.listen()