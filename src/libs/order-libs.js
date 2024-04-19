import axios from "axios";

axios.defaults.withCredentials = true;

export async function getOrders(token, page, keywords) {
  let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders`;

  if (page) {
    url += `?page=${page}`;
  }

  if (keywords) {
    url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders?keyword=${keywords}`;
  }

  const response = await axios.get(url, {
    headers: {
      Cookie: `token=${token}`,
    },
  });
  return response.data;
}

export async function getOrderByStatus(token, status) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/payment?status=${status}`,
    {
      headers: {
        Cookie: `token=${token}`,
      },
    }
  );
  return response.data;
}

export async function getOrderStatusById(token, transaction_id) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/status?transaction_id=${transaction_id}`,
    {
      headers: {
        Cookie: `token=${token}`,
      },
    }
  );
  return response.data;
}

export async function getTransactionStatus(token, id) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/status/${id}`,
    {
      headers: {
        Cookie: `token=${token}`,
      },
    }
  );
  return response.data;
}

export async function getOrderByCustomerId(token, page, keywords) {
  let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/customer_id`;

  if (page) {
    url += `?page=${page}`;
  }

  if (keywords) {
    url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/customer_id?keyword=${keywords}`;
  }

  const response = await axios.get(url, {
    headers: {
      Cookie: `token=${token}`,
    },
  });
  return response.data;
}

export async function updateOrderStatus(token, id, newStatus) {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/status/${id}`,
    newStatus,
    {
      headers: {
        Cookie: `token=${token}`,
      },
    }
  );
  return response.data;
}
