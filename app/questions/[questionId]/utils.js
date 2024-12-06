export const fetchQuestion = async (id) => {
  try {
    const response = await fetch(
      `https://h5ck35.pythonanywhere.com/api/questions/${id}`
    );
    if (response.ok) {
      const question = await response.json();
      console.log(question);
      return question;
    } else {
      console.error("Failed to fetch question, status:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error fetching question:", error);
    return null;
  }
};
