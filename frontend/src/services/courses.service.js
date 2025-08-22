import API_BASE_URL from "../config/api";

export const getCourses = async () => {
  const res = await fetch(`${API_BASE_URL}/courses`);
  if (!res.ok) throw new Error("Failed to fetch courses");
  return await res.json();
};
