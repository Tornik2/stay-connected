import QuestionPage from "./question";
import { fetchQuestion } from "./utils";
import { notFound } from "next/navigation";
import "./question.css";

export default async function Question({ params }) {
  const { questionId } = await params;
  if (!questionId) {
    notFound();
    return;
  }

  const question = await fetchQuestion(questionId);

  if (!question) {
    notFound();
  }
  return (
    <>
      <QuestionPage question={question} />
    </>
  );
}
