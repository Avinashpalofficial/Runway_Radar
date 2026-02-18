import { AuthUser } from "./user";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
