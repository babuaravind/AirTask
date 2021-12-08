import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";

import TaskComments from "./TaskComments";
import TaskSummary from "./TaskSummary";

import "./Project.css";

export default function Project() {
  const { id } = useParams();
  const { document, error } = useDocument("projects", id);

  if (error) {
    return <div className="error">{error}</div>;
  }
  if (!document) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="project-details">
      <TaskSummary project={document} />
      <TaskComments project={document} />
    </div>
  );
}
