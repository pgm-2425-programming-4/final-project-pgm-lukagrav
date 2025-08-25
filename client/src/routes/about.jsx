import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div className="section">
      <div className="container content">
        <h1 className="title is-2">About This Project</h1>
        <p>
          This project is a task management board built with React and Strapi.
          It allows users to organize tasks by state, associate them with
          projects, and categorize them using labels. The application was
          developed to practice frontend and backend integration, RESTful APIs,
          and user interface design.
        </p>

        <h2 className="title is-4 mt-5">Contact</h2>
        <p>
          <strong>Name:</strong> Luka Graveel
          <br />
          <strong>Email:</strong>{" "}
          <a href="mailto:lukagrav@student.arteveldehs.be">
            lukagrav@student.arteveldehs.be
          </a>
          <br />
          <strong>LinkedIn:</strong>{" "}
          <a
            href="https://www.linkedin.com/in/luka-graveel-97879832a/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </p>
      </div>
    </div>
  );
}
