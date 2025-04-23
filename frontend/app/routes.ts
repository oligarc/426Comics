import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("layouts/index.tsx",[
        index("routes/welcome.tsx"),
        route("home","routes/home.tsx"),
        route("login","routes/login.tsx"),
        route("collection","routes/comicCollection.tsx"),
        route("register","routes/register.tsx"),
        route("/publishers","routes/publishers.tsx"),
        route("/authors","routes/authorList.tsx"),
        route("/authorComics/:authorName","routes/authorComics.tsx"), 
        route("/comicDetails/:id","routes/comicDetails.tsx"),
        route("/title/:title","routes/title.tsx"),
        route("/publisherDetails/:id","routes/publishersDetails.tsx")
    ]
)] satisfies RouteConfig;
