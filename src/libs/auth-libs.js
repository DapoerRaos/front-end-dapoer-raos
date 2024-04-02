import axios from "axios";

axios.defaults.withCredentials = true;

export async function registerUser(data) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`,
    data
  );
  return response.data;
}

export async function loginUser(data) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
    data
  );
  return response.data;
}

export async function logoutUser() {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`
  );
  return response.data;
}
