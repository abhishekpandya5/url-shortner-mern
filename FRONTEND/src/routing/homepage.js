import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree";
import { checkAuthOptional } from "../utils/helper";
import HomePage from "../pages/HomePage.jsx";

export const homePageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
  beforeLoad: checkAuthOptional
});
