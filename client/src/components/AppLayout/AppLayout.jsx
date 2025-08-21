// src/components/AppLayout/AppLayout.jsx
import { Outlet } from "@tanstack/react-router";
import Sidebar from "../Sidebar/Sidebar";

export default function AppLayout() {
  return (
    <div>
      <Sidebar />

      <Outlet />
    </div>
  );
}
