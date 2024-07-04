import ExpressLoader from "./loaders/express";
import RoutesLoader from "./loaders/routes";
import logger from "./service/logger";

try {
  const server = new ExpressLoader();
  const routes = new RoutesLoader();

  const app = server.ExpressInstance;

  routes
    .fromFiles("src/routes/*.ts")
    .then((r) => {
      routes.mount(app, r);
    })
    .catch((error) => {
      logger.error(error);
    });
    
} catch (error) {
  console.error(error);
}
