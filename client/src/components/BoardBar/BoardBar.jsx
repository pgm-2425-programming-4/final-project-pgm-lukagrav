import { useState } from "react";
import { useLabels } from "../../hooks/useLabels";

export default function Boardbar({ onFilterChange, onAddTask }) {
  const [selectedLabel, setSelectedLabel] = useState("");

  const { data: labels = [], isLoading, error } = useLabels();

  const handleLabelChange = (e) => {
    const value = e.target.value;
    setSelectedLabel(value);
    if (onFilterChange) onFilterChange(value);
  };

  if (isLoading) return <p>Loading labels...</p>;
  if (error) return <p>Error loading labels</p>;

  return (
    <div>
      <select value={selectedLabel} onChange={handleLabelChange}>
        <option value="">All labels</option>
        {labels.map((label) => (
          <option key={label.id} value={label.title}>
            {label.title}
          </option>
        ))}
      </select>

      <button onClick={onAddTask}>Add Task</button>
    </div>
  );
}
