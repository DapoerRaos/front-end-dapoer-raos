import axios from "axios";

export async function getProvince() {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/rajaongkir/province`
  );
  return response.data;
}

export async function getCity(provinceId) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/rajaongkir/city?province=${provinceId}`
  );
  return response.data;
}

export async function postCost(destination, weight, courier) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/rajaongkir/cost`,
    {
      origin: "457",
      destination: destination,
      weight: weight,
      courier: courier,
    }
  );
  return response.data;
}
