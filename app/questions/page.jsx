import Questions from "../components/Questions/Questions.jsx";
import "./questions.css";
import { fetchQuestions } from "./utils.js";

export default async function questions() {
  const url = "http://46.101.132.49/api/questions/";
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
