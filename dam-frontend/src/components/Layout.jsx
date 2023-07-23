import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <nav className="navbar bg-primary px-sm-3 px-md-5 p-3">
        <span className="navbar-brand fs-2 text-white">
          Digital Asset Management
        </span>
        <div className="list-group list-group-horizontal">
          <Link to="/" className="list-group-item list-group-item-action">
            Home
          </Link>
          <Link
            to="/images"
            className="list-group-item list-group-item-action text-nowrap"
          >
            All Images
          </Link>
          <Link
            to="/upload"
            className="list-group-item list-group-item-action text-nowrap"
          >
            Upload New
          </Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
