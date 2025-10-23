import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "../components/Home";
import Explore from "../components/Explore";
import Notifications from "../components/Notifications";
import Profile from "../components/Profile";
import Bookmarks from "../components/Bookmarks";
import Feed from "../components/Feed";
import Login from "../components/Login";
import Signup from "../components/Signup";

function AppRoute() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/",
          element: <Feed />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/notifications",
          element: <Notifications />,
        },
        {
          path: "/explore",
          element: <Explore />,
        },
        {
          path: "/bookmarks",
          element: <Bookmarks />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default AppRoute;

{
  /* <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
      </Routes>
    </BrowserRouter> */
}
