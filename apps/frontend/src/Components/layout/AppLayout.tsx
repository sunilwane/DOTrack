import { Outlet, Link } from "react-router-dom";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@heroui/react";

export const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">

      <Navbar isBordered>

        <NavbarBrand>
          <p className="font-bold text-xl">Nexus</p>
        </NavbarBrand>

        <NavbarContent justify="center">

          <NavbarItem>
            <Link to="/dashboard">Dashboard</Link>
          </NavbarItem>

          <NavbarItem>
            <Link to="/projects">Projects</Link>
          </NavbarItem>

          <NavbarItem>
            <Link to="/deployments">Deployments</Link>
          </NavbarItem>

        </NavbarContent>

        <NavbarContent justify="end">
          <Button color="primary" variant="flat">
            Wallet
          </Button>
        </NavbarContent>

      </Navbar>

      <main className="flex-1 p-6 bg-gray-50 dark:bg-black">
        <Outlet />
      </main>

    </div>
  );
};
