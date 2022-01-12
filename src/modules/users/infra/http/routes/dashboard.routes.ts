import { Router } from "express";

import ensureAuth from "@modules/users/infra/http/middlewares/ensureAuth";

const dashboardRouter = Router();

dashboardRouter.get('/', ensureAuth, (req, res) => {
    return res.send('foi sim');
});

export default dashboardRouter;