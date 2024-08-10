"use client";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";

const TableGroup = () => {
  const [student, setStudent] = useState("");
  const [uyab, setUyab] = useState("");
  const [uyabs, setUyabs] = useState<string[]>([]);

  const handleAddUyab = () => {
    setUyabs((prevUyabs) => {
      const updatedUyabs = [...prevUyabs, uyab];
      console.log(updatedUyabs);
      return updatedUyabs;
    });
    setUyab("");
  };

  const handleSubmit = async () => {
    console.log(student, uyabs);
    try {
      const response = await axios.post(
        "http://localhost/dapatLearn/an_app/php/uyaberns.php",
        {
          stud_name: student,
          uyabs: uyabs,
        }
      );

      console.log("Response:", response);

      if (response.data && response.data.success) {
        alert("Data submitted successfully!");
      } else {
        // alert(
        //   "Failed to submit data: " +
        //     (response.data ? response.data.error : "Unknown error")
        // );
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit data.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center max-h-screen h-[100vh]">
      <div className="flex flex-col">
        <label htmlFor="stud">STUDENT</label>
        <input
          id="stud"
          className="outline"
          value={student}
          onChange={(e) => setStudent(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="uyab">UYAB</label>
        <input
          id="uyab"
          className="outline"
          value={uyab}
          onChange={(e) => setUyab(e.target.value)}
        />
        <button onClick={handleAddUyab}>Add</button>
      </div>
      {uyabs.map((uyab, index) => (
        <Container className="outline w-[30vw] h-10" key={index}>
          {uyab}
        </Container>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default TableGroup;
