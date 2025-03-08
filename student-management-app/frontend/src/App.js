import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const [editStudent, setEditStudent] = useState(null);

  // Fetch students from the backend
  useEffect(() => {
    axios.get("http://localhost:5000/students")
      .then((response) => setStudents(response.data))
      .catch((err) => console.log(err));
  }, []);

  // Handle form submission (Create or Update)
  const handleSubmit = (e) => {
    e.preventDefault();
    const student = { name, age, grade };

    if (editStudent) {
      // Update student
      axios.put(`http://localhost:5000/students/${editStudent._id}`, student)
        .then((response) => {
          setStudents(students.map((s) => (s._id === response.data._id ? response.data : s)));
          resetForm();
        })
        .catch((err) => console.log(err));
    } else {
      // Create new student
      axios.post("http://localhost:5000/students", student)
        .then((response) => {
          setStudents([...students, response.data]);
          resetForm();
        })
        .catch((err) => console.log(err));
    }
  };

  // Handle delete student
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/students/${id}`)
      .then(() => {
        setStudents(students.filter((student) => student._id !== id));
      })
      .catch((err) => console.log(err));
  };

  // Handle edit student
  const handleEdit = (student) => {
    setName(student.name);
    setAge(student.age);
    setGrade(student.grade);
    setEditStudent(student);
  };

  // Reset the form
  const resetForm = () => {
    setName("");
    setAge("");
    setGrade("");
    setEditStudent(null);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
      <h1 style={{ textAlign: 'center' }}>Student Management App</h1>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Student Name"
          required
          style={{ padding: '10px', margin: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
          required
          style={{ padding: '10px', margin: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <input
          type="text"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          placeholder="Grade"
          required
          style={{ padding: '10px', margin: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {editStudent ? "Update Student" : "Add Student"}
        </button>
      </form>

      <div>
        <h2>Student List</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Name</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Age</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Grade</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{student.name}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{student.age}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{student.grade}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                  <button
                    onClick={() => handleEdit(student)}
                    style={{ marginRight: '5px', padding: '5px 10px', backgroundColor: '#FFC107', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(student._id)}
                    style={{ padding: '5px 10px', backgroundColor: '#F44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
