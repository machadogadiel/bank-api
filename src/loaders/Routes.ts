import { Express, Router } from "express";

import glob from "fast-glob";
import fs from "fs";
import path from "path";
import logger from "../service/Logger";

const BASE_DIR = path.join(__dirname, "../../");

export default class RoutesLoader {
  async fromFiles(globPattern: string): Promise<Router> {
    let router = Router();
    let files: string[] = [];

    try {
      files = await glob(globPattern, { cwd: BASE_DIR });
    } catch (error) {
      logger.error(error);
    }

    for (const file of files) {
      if (
        fs.statSync(file).isFile() &&
        (path.extname(file).toLowerCase() === ".js" || path.extname(file).toLowerCase() === ".ts")
      ) {
        try {
          const routeModule = await import(path.resolve(file));

          router = (routeModule.default || routeModule)(router);
        } catch (error) {
          logger.error(error);
        }
      }
    }

    return router;
  }

  mount(app: Express, router: Router) {
    app.use("/", router);
  }
}
