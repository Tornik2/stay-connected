export const fetchQuestion = async (id) => {
  try {
    const response = await fetch(`http://164.90.165.135/api/questions/${id}`);
    if (response.ok) {
      const question = await response.json();
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
