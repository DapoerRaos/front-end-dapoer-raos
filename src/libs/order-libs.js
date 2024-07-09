import axios from "axios";

axios.defaults.withCredentials = true;

export async function getOrders(token, page, keywords, startDate, endDate) {
  let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders`;

  const queryParams = [];

  if (page) {
    queryParams.push(`page=${page}`);
  }

  if (keywords) {
    queryParams.push(`keyword=${keywords}`);
  }

  if (startDate) {
    queryParams.push(`startDate=${startDate}`);
  }

  if (endDate) {
    queryParams.push(`endDate=${endDate}`);
  }

  if (queryParams.length > 0) {
    url += `?${queryParams.join("&")}`;
  }

  const response = await axios.get(url, {
    headers: {
      Cookie: `token=${token}`,
    },
  });
  return response.data;
}

export async function getOrderByDate(token, keywords, startDate, endDate) {
  let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/date`;

  const queryParams = [];

  if (keywords) {
    queryParams.push(`keyword=${keywords}`);
  }

  if (startDate) {
    queryParams.push(`startDate=${startDate}`);
  }

  if (endDate) {
    queryParams.push(`endDate=${endDate}`);
  }

  if (queryParams.length > 0) {
    url += `?${queryParams.join("&")}`;
  }

  const response = await axios.get(url, {
    headers: {
      Cookie: `token=${token}`,
    },
  });
  return response.data;
}

export async function createOrder(token, data) {
  const {
    id,
    customer_id,
    shipping_id,
    total_price,
    status,
    payment_method,
    va_number,
    bank,
    payment_date,
  } = data;
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders`,
    {
      id,
      customer_id,
      shipping_id,
      total_price,
      status,
      payment_method,
      va_number,
      bank,
      payment_date,
    },
    {
      headers: {
        Cookie: `token=${token}`,
      },
    }
  );
  return response.data;
}

export async function createOrderItem(token, data) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/items`,
    data,
    {
      headers: {
        Cookie: `token=${token}`,
      },
    }
  );
  return response.data;
}

export async function paymentOrder(token, data) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/payment`,
    data,
    {
      headers: {
        Cookie: `token=${token}`,
      },
    }
  );
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

export async function updateOrderStatus(token, id, updateData) {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/status/${id}`,
    updateData,
    {
      headers: {
        Cookie: `token=${token}`,
      },
    }
  );
  return response.data;
}
