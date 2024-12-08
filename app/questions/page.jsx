import Questions from "../components/Questions/Questions.jsx";
import "./questions.css";
import { fetchQuestions } from "./utils.js";

export default async function questions() {
  const url = "http://164.90.165.135/api/questions/";
  const questionData = await fetchQuestions(url);
  console.log(questionData);
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
