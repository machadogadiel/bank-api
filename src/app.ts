import ExpressLoader from "./loaders/Express";
import RoutesLoader from "./loaders/Routes";
import logger from "./service/Logger";

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
