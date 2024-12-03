export default function Question({ question }) {
  const {
    answers,
    created_at,
    id,
    subject,
    text,
    user,
    user_id,
    votes,
    views_count,
    tag_list,
  } = question;
  return (
    <div className="question">
      {} da {id}
    </div>
  );
}
