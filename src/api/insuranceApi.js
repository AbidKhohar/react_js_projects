import axios from "axios";

const API = axios.create({
  // baseURL: "https://localhost:44370/api/Insurance",
    baseURL: "https://unadvantageously-stunning-kandra.ngrok-free.dev/api/Insurance",


});

// ✅ CRUD methods
export const getInsurances = () => API.get("/");       // GetAll, backend me default [HttpGet]
export const getInsuranceById = (id) => API.get(`/${id}`);
export const createInsurance = (data) => API.post("/", data);
export const updateInsurance = (id, data) => API.put(`/${id}`, data);
export const deleteInsurance = (id) => API.delete(`/${id}`);