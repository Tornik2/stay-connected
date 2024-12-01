import dommy from "../dommy";
const fetchQuestions = async () => {
  const url = dommy;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      const errorData = await response.json();
      console.log(errorData);
    }
  } catch (error) {
    console.log("error:", error);
  }
};

export { fetchQuestions };
