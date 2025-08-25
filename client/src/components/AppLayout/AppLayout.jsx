// src/components/AppLayout/AppLayout.jsx
import { Outlet } from "@tanstack/react-router";
import Sidebar from "../Sidebar/Sidebar";
import "./AppLayout.css"

export default function AppLayout() {
  return (
    <div className="container is-fluid">
      <div className="columns">
        <div className="column is-one-quarter">
          <Sidebar />
        </div>

        <div className="column main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
