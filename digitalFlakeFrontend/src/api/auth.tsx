/* eslint-disable @typescript-eslint/no-explicit-any */

export const loginApi = async (
  email: string,
  password: string
): Promise<{ message: string; token: string }> => {
  const response = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed. Please check your credentials.");
  }

  return response.json();
};

export const logoutApi = async (): Promise<void> => {
  const response = await fetch("http://localhost:3000/auth/logout", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Logout failed.");
  }

  localStorage.removeItem("token");
  return response.json();
};

export const forgotPasswordApi = async (email: string) => {
  const response = await fetch("http://localhost:3000/auth/forgot-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error("Failed to send password reset request");
  }

  return await response.json();
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const deleteApi = async (url: string) => {
  const response = await fetch(`http://localhost:3000/${url}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to send password reset request");
  }

  return await response.json();
};

export const saveFormData = async (data: any, url: string) => {
  console.log(data, url);

  const response = await fetch(`http://localhost:3000/${url}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: data,
  });

  if (!response.ok) {
    throw new Error("Failed to create the category.");
  }

  return await response.json();
};
