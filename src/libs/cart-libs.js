import axios from "axios";

axios.defaults.withCredentials = true;

export async function getCartByUserId(token) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/carts`,
    {
      headers: {
        Cookie: `token=${token}`,
      },
    }
  );
  return response.data;
}

export async function getCartByUserCartId(token) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/carts/detail`,
    {
      headers: {
        Cookie: `token=${token}`,
      },
    }
  );
  return response.data;
}

export async function addItemToCart(product_id, token) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/carts/detail`,
    { product_id },
    {
      headers: {
        Cookie: `token=${token}`,
      },
    }
  );
  return response.data;
}

export async function updateQuantityCartItem(token, id, quantity) {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/carts/detail/${id}`,
    { quantity },
    {
      headers: {
        Cookie: `token=${token}`,
      },
    }
  );
  return response.data;
}

export async function removeCartItem(id, token) {
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/carts/detail/${id}`,
    {
      headers: {
        Cookie: `token=${token}`,
      },
    }
  );
  return response.data;
}

export async function deleteCartItemByCartId(token, cart_id) {
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/carts/detail/cart-id/${cart_id}`,
    {
      headers: {
        Cookie: `token=${token}`,
      },
    }
  );
  return response.data;
}
