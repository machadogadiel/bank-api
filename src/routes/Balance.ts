import { Router } from "express";
import BalanceController from "../controllers/BalanceController";

export default function (router: Router) {
    router.get('/balance', BalanceController.getBalance);

    return router; 
}