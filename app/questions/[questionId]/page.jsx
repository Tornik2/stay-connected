import QuestionPage from "./question";
import { fetchQuestion } from "./utils";
import "./question.css";

export default async function Question({ params }) {
  const { questionId } = await params;
  const question = await fetchQuestion(questionId);

  return (
    <>
      <QuestionPage question={question} />
    </>
  );
}
