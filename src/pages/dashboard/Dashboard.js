import { useCollection } from "../../hooks/useCollection";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

import TaskList from "../../components/TaskList";
import TaskFilter from "./TaskFilter";

import "./Dashboard.css";

export default function Dashboard() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection("projects");
  const [filter, setFilter] = useState("all");

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };

  const projects = documents
    ? documents.filter((document) => {
        switch (filter) {
          case "all":
            return true;
          case "mine":
            let assignedToMe = false;
            document.assignedUsersList.forEach((u) => {
              if (u.id === user.uid) {
                assignedToMe = true;
              }
            });
            return assignedToMe;
          case "personal":
          case "academia":
          case "professional":
          case "general":
            console.log(document.category, filter);
            return document.category === filter;
          default:
            return true;
        }
      })
    : null;

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {documents && <TaskFilter changeFilter={changeFilter} />}
      {projects && <TaskList projects={projects} />}
    </div>
  );
}
