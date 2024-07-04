import ExpressLoader  from "./loaders/express"

try {
  // create app instance
  new ExpressLoader()
} catch (error) {
  console.error(error)
}