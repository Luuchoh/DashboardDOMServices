import axios from "axios";
import config from "../config/config";
const { app } = config();
const baseUrl = app.api;

const getCategories = async () => {
  const url = `${baseUrl}/categories/?all=true`;
  const { data } = await axios.get(url);
  return data.docs;
};
const addCategory = async (body) => {
  const url = `${baseUrl}/categories`;
  const result = await axios.post(url, body, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return result.data;
};
export { getCategories, addCategory };
