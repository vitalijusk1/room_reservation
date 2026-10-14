import { NavLink } from "react-router-dom";
import { navItems } from "./data";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-8">
        <NavLink to="/" className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-xl bg-indigo-600 text-lg font-bold text-white shadow-sm shadow-indigo-200">
            R
          </span>
          <span className="text-lg font-bold tracking-tight">Roomly</span>
        </NavLink>
        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `rounded-lg px-4 py-2 text-sm font-medium transition ${isActive ? "bg-indigo-50 text-indigo-700" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
