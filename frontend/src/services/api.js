const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.errors?.join(", ") || "Error en la petición");
  }

  return data;
};

export const getProductos = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const url = `${API_URL}/productos${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url);
  return handleResponse(response);
};

export const getProductoById = async (id) => {
  const response = await fetch(`${API_URL}/productos/${id}`);
  return handleResponse(response);
};

export const createProducto = async (producto) => {
  const response = await fetch(`${API_URL}/productos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(producto),
  });
  return handleResponse(response);
};

export const updateProducto = async (id, producto) => {
  const response = await fetch(`${API_URL}/productos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(producto),
  });
  return handleResponse(response);
};

export const deleteProducto = async (id) => {
  const response = await fetch(`${API_URL}/productos/${id}`, {
    method: "DELETE",
  });
  return handleResponse(response);
};
