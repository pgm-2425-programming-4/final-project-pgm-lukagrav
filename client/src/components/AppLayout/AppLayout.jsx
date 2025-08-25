import { Outlet } from "@tanstack/react-router";
import Sidebar from "../Sidebar/Sidebar";

export default function AppLayout() {
  return (
    <div className="container is-fluid">
      <div className="columns">
        <div className="column is-one-quarter">
          <Sidebar />
        </div>

        <div className="column main-content mt-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
