import { useState, useEffect } from "react";
import { useCollection } from "../../hooks/useCollection";
import Select from "react-select";
import "./Create.css";
import { timestamp_ } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { useHistory } from "react-router-dom";

const categories = [
  { value: "personal", label: "Personal" },
  { value: "academia", label: "Academia" },
  { value: "professional", label: "Professional" },
  { value: "general", label: "General" },
];

export default function Create() {
  const history = useHistory();
  const { addDocument, response } = useFirestore("projects");
  const { documents } = useCollection("users");
  const [users, setUsers] = useState([]);
  const { user } = useAuthContext();

  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (documents) {
      setUsers(
        documents.map((user) => {
          return { value: { ...user, id: user.id }, label: user.displayName };
        })
      );
    }
  }, [documents]);
  // console.log(users)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!category) {
      setFormError("Select task category");
      return;
    }

    if (assignedUsers.length < 1) {
      setFormError("Please assign project to 1 user");
      return;
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    const assignedUsersList = assignedUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id,
      };
    });

    const project = {
      name,
      details,
      category: category.value,
      dueDate: timestamp_.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList,
    };

    await addDocument(project);
    if (!response.error) {
      history.push("/");
    }
  };

  return (
    <div className="create-form">
      <h2 className="page-title">Create Task</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Task Title:</span>
          <input
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Task Description:</span>
          <textarea
            required
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          ></textarea>
        </label>
        <label>
          <span>Due Date</span>
          <input
            required
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>
        <label>
          <span>Task Category:</span>
          <Select
            onChange={(option) => setCategory(option)}
            options={categories}
          />
        </label>
        <label>
          <span>Assign People:</span>
          <Select
            onChange={(option) => setAssignedUsers(option)}
            options={users}
            isMulti
          />
        </label>

        <button className="btn">Add Task</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
}
