"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const subscription_controller_1 = require("../modules/subscription/subscription.controller");
const subscriptionRouter = (0, express_1.Router)();
subscriptionRouter.post("/", auth_1.authUser, subscription_controller_1.create);
subscriptionRouter.get("/all-subscription", auth_1.authUser, subscription_controller_1.allSubscription);
exports.default = subscriptionRouter;
