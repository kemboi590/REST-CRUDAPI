import sql from "mssql";
import config from "../db/config.js";

//to get all posts
export const getPosts = async (req, res) => {
  try {
    let pool = await sql.connect(config.sql);
    let result = await pool.request().query("SELECT * FROM posts");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json(error.message);
  } finally {
    sql.close();
  }
};
//to add a post
export const addPost = async (req, res) => {
  try {
    const { title, content, user_id } = req.body;
    let pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("title", sql.VarChar, title)
      .input("content", sql.VarChar, content)
      .input("user_id", sql.Int, user_id)
      .query(
        "INSERT INTO Posts (title, content, user_id) VALUES (@title, @content, @user_id) "
      );
    res.status(200).json("Post added successfully");
  } catch (error) {
    res.status(201).json(error.message);
  } finally {
    sql.close();
  }
};
//to get a post
export const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    let pool = await sql.connect(config.sql);
    let result = await pool.request().input("id", sql.Int, id).query(`
        SELECT * FROM Posts WHERE post_id = @id`);
    res.status(200).json(result.recordset[0]);
  } catch (error) {
    res.status(201).json(error.message);
  } finally {
    sql.close();
  }
};
//to update a post
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, user_id } = req.body;
    let pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("id", sql.Int, id)
      .input("title", sql.VarChar, title)
      .input("content", sql.VarChar, content)
      .input("user_id", sql.Int, user_id)
      .query(
        "UPDATE Posts SET title = @title, content = @content, user_id = @user_id WHERE post_id = @id"
      );
    res.status(200).json("Post updated successfully");
  } catch (error) {
    res.status(201).json(error.message);
  } finally {
    sql.close();
  }
};
//to delete a post
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    let pool = await sql.connect(config.sql);
      await pool
          .request()
          .input("id", sql.Int, id)
          .query(`DELETE FROM Posts WHERE user_id = @id`);
    res.status(200).json("Post deleted successfully");
  } catch (error) {
    res.status(201).json(error.message);
  } finally {
    sql.close();
  }
};

