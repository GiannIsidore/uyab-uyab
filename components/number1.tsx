"use client";
import React, { useEffect } from "react";
import axios from "axios";

interface Group {}
interface Result {
  name: string;
  address: string;
  phone: string;
}
export default function Number1() {
  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await axios.get<Group[]>("");
      } catch (error) {}
    };
  }, []);

  return (
    <div>
      <label htmlFor="group">Select Group:</label>
      <select id="group">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
    </div>
  );
}
