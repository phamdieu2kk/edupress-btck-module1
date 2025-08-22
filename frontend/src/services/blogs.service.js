import API_BASE_URL from "../config/api";

export const getBlogs = async () => {
  const res = await fetch(`${API_BASE_URL}/blogs`);
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return await res.json();
};
