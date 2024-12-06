export const filterQuestions = (questions, filter, user) => {
  const tagFilter = filter.tags.map((tag) => tag.toLowerCase()); // Convert filter tags to lowercase
  const searchWord = filter.search;

  let filterByTag = [];
  let filteredBySearchWord = [];
  let filterByUser = [];
  let filteredQuestions = [];

  // filter by tag if there is one or more
  if (Array.isArray(questions) && tagFilter.length > 0) {
    filterByTag = questions.filter((question) => {
      return tagFilter.some((filterTag) =>
        question.tag_list.some((questionTag) =>
          questionTag.name.toLowerCase().includes(filterTag)
        )
      );
    });
    filteredQuestions = filterByTag;
  } else {
    filteredQuestions = questions;
  }
  // filter by searchword if theres one
  if (searchWord) {
    filteredBySearchWord = filteredQuestions.filter((question) =>
      question.text.toLowerCase().includes(searchWord.toLowerCase())
    );
    filteredQuestions = filteredBySearchWord;
  }
  // filter personal questions from user
  if (filter.user) {
    filterByUser = filteredQuestions.filter(
      (question) => question.user === user
    );
    filteredQuestions = filterByUser;
  }

  return filteredQuestions;
};
