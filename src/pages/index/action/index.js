export const REQUEST_POSTS = 'REQUEST_POSTS';



export const requestPosts = (query) => {
  return {
    type: REQUEST_POSTS,
    payload: query,
  };
};
