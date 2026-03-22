"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const dashboard_controller_1 = require("../modules/dashboard/dashboard.controller");
const dashboardRouter = (0, express_1.Router)();
dashboardRouter.get("/summary", auth_1.authUser, dashboard_controller_1.getDashboard);
exports.default = dashboardRouter;
