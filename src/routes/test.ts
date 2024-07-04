import { Router } from "express";

export default function (router: Router) {
    // create a new user
    router.get('/api/test', async function (req, res) { 
        /** your route implementation here*/
        res.send(`it work`)
    });
    return router; 
}