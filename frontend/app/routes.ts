import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("layouts/index.tsx",[
        index("routes/home.tsx"),
        route("login","routes/login.tsx"),
        route("/publishers","routes/publishers.tsx"),
        route("/comicDetails/:id","routes/comicDetails.tsx"),
        route("/title/:title","routes/title.tsx")
    ]
)] satisfies RouteConfig;
