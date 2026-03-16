import { Router } from "express";
import { authUser } from "../middlewares/auth";
import { create, getAll, update } from "../modules/expense/expense.controller";

const expenseRouter = Router();

expenseRouter.post("/create", authUser, create);
expenseRouter.get("/get", authUser, getAll);
expenseRouter.patch("/:id", authUser, update);
export default expenseRouter;
