
import { createFileRoute } from '@tanstack/react-router';
import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Board from '../components/Board';
import '../styles.css';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Board />
      </div>
    </div>
  );
}
