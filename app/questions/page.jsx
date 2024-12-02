import Questions from "../components/Questions/Questions.jsx";
import { fetchQuestions } from "./utils.js";

export default async function questions() {
  const url = "https://h5ck35.pythonanywhere.com/api/questions/";
  const questionData = await fetchQuestions(url);
  return (
    <>
      <Questions questionData={questionData} />
    </>
  );
}
