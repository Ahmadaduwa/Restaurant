import {
  type RouteConfig,
  route,
} from "@react-router/dev/routes";

export default [
  route("/", "./App.tsx"),
  route("home", "./pages/HomePage.tsx"),
  route("login", "./pages/LoginPage.tsx"),

] satisfies RouteConfig;