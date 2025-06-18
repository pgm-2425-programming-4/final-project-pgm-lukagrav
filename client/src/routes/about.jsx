import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import Sidebar from '../components/Sidebar'
import '../index.css'

export const Route = createFileRoute('/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="app">
      <Sidebar />
      <div className="main about-content">
        <h1>About This Project</h1>
        <p>
          This project is a task management board built with React and Strapi. It allows users to organize tasks by state,
          associate them with projects, and categorize them using labels. The application was developed to practice frontend
          and backend integration, RESTful APIs, and user interface design.
        </p>
        <h2>Contact</h2>
        <p>
          <strong>Naam:</strong> LukaGraveel<br />
          <strong>E-mail:</strong> lukagrav@student.arteveldehs.be<br />
          <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/luka-graveel-97879832a/" target="_blank" rel="noreferrer">LinkedIn</a>
        </p>
      </div>
    </div>
  )
}

