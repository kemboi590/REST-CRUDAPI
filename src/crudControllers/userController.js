import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sql from "mssql";
import config from "../db/config.js";



//loginRequired
export const loginRequired = (req, res, next) => {
    if (req.user) {
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized user!" });
    }
};
  
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPasword = bcrypt.hashSync(password, 10);
  console.log(username, email, hashedPasword);
  try {
    //if user exists
    let pool = await sql.connect(config.sql);
    let result = await pool
      .request()
      .input("username", sql.VarChar, username)
      .input("email", sql.VarChar, email)
      .query(
        "SELECT * FROM Users WHERE username = @username OR email = @email"
      );
    const user = result.recordset[0];
    if (user) {
      return res.status(400).send("User already exists");
    } else {
      //if user does not exist
      await pool
        .request()
        .input("username", sql.VarChar, username)
        .input("email", sql.VarChar, email)
        .input("hashedPasword", sql.VarChar, hashedPasword)
        .query(
          "INSERT INTO Users (username, email, hashedPasword) VALUES (@username, @email, @hashedPasword)"
        );
      return res.status(201).send("User created");
    }
  } catch (error) {
    res.status(409).json(error.message);
  } finally {
    sql.close();
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let pool = await sql.connect(config.sql);
    let result = await pool

      .request()
      .input("email", sql.VarChar, email)
      .query("SELECT * FROM Users WHERE email = @email");
    const user = result.recordset[0];
    if (!user) {
      return res.status(401).json("User does not exist");
    } else {
      if (!bcrypt.compareSync(password, user.hashedPasword)) {
        return res.status(401).json("Incorrect password");
      } else {
        const token = `JWT ${jwt.sign(
          { email: user.email },
          config.jwt_secret,
          {
            expiresIn: "1h",
          }
        )}`;
        return res.status(200).json({
          username: user.username,
          email: user.email,
          userId: user.id,
          token: token,
        });
      }
    }
  } catch (error) {
    res.status(409).json(error.message);
  } finally {
    sql.close();
  }
};
