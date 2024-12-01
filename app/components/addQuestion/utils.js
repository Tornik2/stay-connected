export async function add(url, accessToken, questionData) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(questionData),
    });
    if (response.ok) {
      const result = await response.json();
      console.log("Question added successfully:", result);
      return result;
    } else {
      const errorData = await response.json();
      console.error("Error adding question:", errorData);
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
