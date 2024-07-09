import axios from "axios";

axios.defaults.withCredentials = true;

export async function createShipping(token, data) {
  const {
    id,
    courier,
    service,
    status,
    type,
    cost,
    province,
    city,
    address,
    etd,
  } = data;

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/shipping`,
    {
      id,
      courier,
      service,
      status,
      type,
      cost,
      province,
      city,
      address,
      etd,
    },
    {
      headers: {
        Cookie: `token=${token}`,
      },
    }
  );
  return response.data;
}
