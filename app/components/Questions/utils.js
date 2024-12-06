export const filterQuestions = (questions, filter) => {
  const tagFilter = filter.tags;
  const searchWord = filter.search;
  const user = filter.user;

  let filteredQuestions = [];

  if (tagFilter) {
    filteredQuestions = questions.filter((question) => {
      const questionTags = question.tag_list.map((tag) => tag.name);
      return tagFilter.every((tag) => questionTags.includes(tag));
    });
  }
  console.log(filteredQuestions);
};
