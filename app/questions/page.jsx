import Questions from "../components/Questions.jsx";
import { fetchQuestions } from "./utils.js";
import questionsDat from "../dommy.js";

export default async function questions() {
  const url = "http://7051-138-199-7-236.ngrok-free.app/api/questions/";
  const questionData = await fetchQuestions(url);
  return (
    <>
      <Questions questionData={questionData} />
    </>
  );
}
