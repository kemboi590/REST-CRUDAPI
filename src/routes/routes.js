import {
  getPosts,
  addPost,
  getPost,
  updatePost,
  deletePost,
} from "../crudControllers/postController.js";

import {
  registerUser,
  loginUser,
  loginRequired,
} from "../crudControllers/userController.js";

const post = (app) => {
  //routes to handle get and post
  app.route("/posts").get(loginRequired, getPosts).post(addPost);

  //routes to handle get, put and delete
  app
    .route("/posts/:id")
    .get(loginRequired, getPost)
    .put(updatePost)
    .delete(deletePost);

  //register route
  app.route("/auth/register").post(registerUser);
  //login route
  app.route("/auth/login").post(loginUser);
};
export default post;
