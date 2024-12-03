import Questions from "../components/Questions/Questions.jsx";
import "./questions.css";
import { fetchQuestions } from "./utils.js";

export default async function questions() {
  const url = "https://h5ck35.pythonanywhere.com/api/questions/";
  const questionData = await fetchQuestions(url);
  return (
    <>
      <div className="global-padding-sides">
        <div className="container max-width">
          <Questions questionData={questionData} />
        </div>
      </div>
    </>
  );
}
