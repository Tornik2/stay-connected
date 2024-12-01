import Questions from "../components/Questions.jsx";
import { fetchQuestions } from "./utils.js";
import questionsDat from "../dommy.js";

export default function questions() {
  const questionData = questionsDat();
  return (
    <>
      <Questions questionData={questionData} />
    </>
  );
}
