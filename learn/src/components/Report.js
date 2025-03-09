import React, { useState } from "react";
import { db, collection, addDoc } from "../firebaseConfig";

const Report = ({ progress }) => {
  const [status, setStatus] = useState("");

  const saveReport = async () => {
    try {
      await addDoc(collection(db, "reports"), {
        childName: progress.childName || "Anonymous",
        correctItems: progress.correctItems || 0,
        totalItems: progress.totalItems || 0,
        timestamp: new Date(),
      });
      setStatus("Report saved successfully!");
    } catch (error) {
      console.error("Error saving report:", error);
      setStatus("Failed to save report.");
    }
  };

  return (
    <div>
      <h2>Child Progress Report</h2>
      <p>Correct Items: {progress.correctItems}</p>
      <p>Total Items: {progress.totalItems}</p>
      <button onClick={saveReport}>Save Report</button>
      <p>{status}</p>
    </div>
  );
};

export default Report;
