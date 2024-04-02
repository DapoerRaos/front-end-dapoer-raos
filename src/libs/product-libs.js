import axios from "axios";

axios.defaults.withCredentials = true;

export async function getProducts(page, keywords) {
  let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`;

  if (page) {
    url += `?page=${page}`;
  }

  if (keywords) {
    url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products?keyword=${keywords}`;
  }
  const response = await axios.get(url);
  return response.data;
}

export async function getProductById(id) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`
  );
  return response.data;
}

export async function addProduct(data, token) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Cookie: `token=${token}`,
      },
    }
  );
  return response.data;
}

export async function editProduct(id, data, token) {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Cookie: `token=${token}`,
      },
    }
  );
  return response.data;
}

export async function deleteProduct(id, token) {
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`,
    {
      headers: {
        Cookie: `token=${token}`,
      },
    }
  );
  return response.data;
}

export async function getCategories() {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`
  );
  return response.data;
}
