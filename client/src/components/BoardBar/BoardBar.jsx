import { useState } from "react";
import { useLabels } from "../../hooks/UseLabels";

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
    <div className="box is-flex is-align-items-center is-justify-content-space-between mb-5">
      <div className="select mr-3">
        <select value={selectedLabel} onChange={handleLabelChange}>
          <option value="">All labels</option>
          {labels.map((label) => (
            <option key={label.id} value={label.title}>
              {label.title}
            </option>
          ))}
        </select>
      </div>

      <button className="button is-primary" onClick={onAddTask}>
        Add Task
      </button>
    </div>
  );
}
