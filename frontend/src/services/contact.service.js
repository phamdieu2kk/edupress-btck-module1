import API_BASE_URL from "../config/api";

export const sendContact = async (data) => {
  const res = await fetch(`${API_BASE_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Send contact failed");
  return await res.json();
};
