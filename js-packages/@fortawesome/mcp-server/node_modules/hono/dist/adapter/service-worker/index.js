// src/adapter/service-worker/index.ts
import { handle } from "./handler.js";
var fire = (app, options) => {
  addEventListener("fetch", handle(app, options));
};
export {
  fire,
  handle
};
