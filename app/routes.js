import { index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.jsx"),
    route("about", "routes/about.jsx"),
      route("ministries-events", "routes/ministries-events.jsx"),
      route("visit-us", "routes/visit-us.jsx"),
      route("support-us", "routes/support-us.jsx"),
];