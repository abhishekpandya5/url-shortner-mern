import { Outlet } from "@tanstack/react-router";
import NavBar from "./components/NavBar.jsx";

const RootLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default RootLayout;
