import axios from "axios";

axios.defaults.withCredentials = true;

export async function getCustomerById(token) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/customers`,
    {
      headers: {
        Cookie: `token=${token}`,
      },
    }
  );
  return response.data;
}

export async function editProfile(token, data) {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/customers`,
    data,
    {
      headers: {
        Cookie: `token=${token}`,
      },
    }
  );
  return response.data;
}
