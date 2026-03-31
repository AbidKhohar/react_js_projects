import axios from "axios";

const API = axios.create({
  baseURL: "https://localhost:44370/api/employees", // Your .NET API URL
});

// ✅ CRUD methods
export const getEmployees = () => API.get("/GetAll"); // updated from "/" to "/GetAll"
export const getEmployeeById = (id) => API.get(`/${id}`);
export const createEmployee = (data) => API.post("/", data);
export const updateEmployee = (id, data) => API.put(`/${id}`, data);
export const deleteEmployee = (id) => API.delete(`/${id}`);