export default function Backlog({ tasks }) {
    return ( 
      <table>
        <thead>
          <tr>
            <th>Titel</th>
            <th>Status</th>
            <th>Beschrijving</th>
            <th>Deadline</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.state?.name || "Onbekend"}</td>
              <td>{task.description || "Geen beschrijving"}</td>
              <td>{new Date(task.dueDate).toLocaleDateString('nl-BE')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  