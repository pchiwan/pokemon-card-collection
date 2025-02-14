import { Link, Outlet, useLocation } from "react-router-dom";
import { cn } from "./lib/utils";

interface NavigationItemProps {
  isActive?: boolean;
}

const NavigationMenu = ({ children }: React.PropsWithChildren) => {
  return (
    <ul className="grid grid-cols-2 h-12 items-center justify-center rounded-md bg-sky-300 p-1 w-full">
      {children}
    </ul>
  );
};

const NavigationItem = ({
  children,
  isActive,
}: React.PropsWithChildren<NavigationItemProps>) => {
  return (
    <li
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm text-xl leading-none font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  text-zinc-500",
        {
          "bg-sky-600 text-white shadow-sm": isActive,
        }
      )}
    >
      {children}
    </li>
  );
};

export const AppLayout = () => {
  const location = useLocation();

  return (
    <main className="flex flex-col items-center gap-8 py-12 max-w-[1280px] h-full mx-auto">
      <h1 className="text-4xl font-bold">Ash's Pokémon Card Collection</h1>
      <div className="flex-1 flex flex-col items-center gap-1 w-full">
        <nav className="w-full">
          <NavigationMenu>
            <NavigationItem isActive={location.pathname === "/"}>
              <Link className="text-center py-2 w-full" to="/">
                Dashboard
              </Link>
            </NavigationItem>
            <NavigationItem isActive={location.pathname === "/charts"}>
              <Link className="text-center py-2 w-full" to="/charts">
                Charts
              </Link>
            </NavigationItem>
          </NavigationMenu>
        </nav>
        <div className="flex-1 w-full">
          <Outlet />
        </div>
      </div>
    </main>
  );
};
