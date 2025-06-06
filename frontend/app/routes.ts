import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("layouts/index.tsx",[
        index("routes/welcome.tsx"),
        route("home","routes/home.tsx"),
        route("about","routes/about.tsx"),
        route("login","routes/login.tsx"),
        route("collection","routes/comicCollection.tsx"),
        route("register","routes/register.tsx"),
        route("/publishers","routes/publishers.tsx"),
        route("/authors","routes/authorList.tsx"),
        route("/authorComics/:authorName","routes/authorComics.tsx"),
        route("/lists","routes/lists.tsx"),
        route("/addComic","routes/addComic.tsx"),
        route("/lists/:id","routes/listsDetails.tsx"),  
        route("/comicDetails/:id","routes/comicDetails.tsx"),
        route("/title/:title","routes/title.tsx"),
        route("/publisherDetails/:id","routes/publishersDetails.tsx")
    ]
)] satisfies RouteConfig;
