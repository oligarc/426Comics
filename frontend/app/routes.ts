import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("layouts/index.tsx",[
        index("routes/welcome.tsx"),
        route("home","routes/home.tsx"),
        route("login","routes/login.tsx"),
        route("register","routes/register.tsx"),
        route("/publishers","routes/publishers.tsx"),
        route("/comicDetails/:id","routes/comicDetails.tsx"),
        route("/title/:title","routes/title.tsx"),
        route("/publisherDetails/:id","routes/publishersDetails.tsx")
    ]
)] satisfies RouteConfig;
