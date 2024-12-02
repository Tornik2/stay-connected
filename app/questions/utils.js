const fetchQuestions = async (url) => {
  let data = "";
  try {
    const response = await fetch(url);
    if (response.ok) {
      data = await response.json();
      console.log(data);
    } else {
      const errorData = await response.json();
      console.log(errorData);
    }
  } catch (error) {
    console.log("error:", error);
  }

  return data;
};

export { fetchQuestions };
