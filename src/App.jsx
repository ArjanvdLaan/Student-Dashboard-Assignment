import { Link, Route, Routes } from "react-router-dom";
import Home from "./home";
import StudentDetail from "./Student";
import "./App.css";
import data from "./studentsData.js";

function App() {
  // Group the data by student
  const dataByStudent = data.reduce((acc, task) => {
    const exercise = task["Wie ben je?"];
    acc[exercise] = acc[exercise] || [];
    acc[exercise].push(task);
    return acc;
  }, {});

  // Turn object into array
  const dataByStudentArray = Object.entries(dataByStudent).map(
    ([name, tasks]) => ({
      name,
      tasks,
    })
  );

  return (
    <div>
      <div className="header">
        <h2>Final Assignment: React Student Dashboard</h2>
      </div>
      <div className="subHeader">
        <h6>*Zoom in for more detail & drag for navigation</h6>
      </div>
      <nav>
        <ul>
          <div className="allStudents">
            <h3>Averages of all students:</h3>
            <li>
              <Link className="link" to="/">
                All Students
              </Link>
            </li>
          </div>
          <div className="student">
            <h3>Individual students:</h3>
            {dataByStudentArray.map((student) => (
              <li key={student.name}>
                <Link className="link" to={`/student/${student.name}`}>
                  {" "}
                  {student.name}
                </Link>
              </li>
            ))}
          </div>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student/:name" element={<StudentDetail />}></Route>
      </Routes>
    </div>
  );
}

export default App;
