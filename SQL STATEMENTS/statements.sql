-- Create Users table with an auto-incrementing primary key
CREATE TABLE Users (
    user_id INT IDENTITY(1,1) PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255),
    hashedPasword VARCHAR(255)
);
INSERT INTO Users (username, email, hashedPasword) VALUES ('kev', 'kev@email', 'kev12')


SELECT * FROM Users
--posts table
CREATE TABLE Posts (
    post_id INT IDENTITY(1,1) PRIMARY KEY,
    title VARCHAR(255),
    content VARCHAR(MAX),
    user_id INT,
	FOREIGN KEY (user_id) REFERENCES Users(user_id)
);


-- Comments table with cascading delete
CREATE TABLE Comments (
    comment_id INT IDENTITY(1,1) PRIMARY KEY,
    content VARCHAR(MAX),
    user_id INT,
    post_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (post_id) REFERENCES Posts(post_id) ON DELETE CASCADE
);



-- Inserting values into the Users table
INSERT INTO Users (username, email, hashedPasword)
VALUES ('JohnDoe', 'johndoe@example.com', 'pass10');

INSERT INTO Users (username, email, hashedPasword)
VALUES ('JaneSmith', 'janesmith@example.com', 'pass11');

INSERT INTO Users (username, email, hashedPasword)
VALUES ('MikeJohnson', 'mikejohnson@example.com', 'pass12');

-- Inserting values into the Posts table
INSERT INTO Posts (title, content, user_id)
VALUES ('First Post', 'This is the content of the first post.', 1);

INSERT INTO Posts (title, content, user_id)
VALUES ('Second Post', 'This is the content of the second post.', 2);

INSERT INTO Posts (title, content, user_id)
VALUES ('Third Post', 'This is the content of the third post.', 3);

-- Inserting values into the Comments table
INSERT INTO Comments (content, user_id, post_id)
VALUES ('Great post!', 1, 1);

INSERT INTO Comments (content, user_id, post_id)
VALUES ('Nice work!', 2, 1);

INSERT INTO Comments (content, user_id, post_id)
VALUES ('I agree!', 3, 2);

SELECT * FROM Users
SELECT * FROM Posts
SELECT * FROM Comments

DROP DATABASE crudDB

DELETE FROM Posts WHERE post_id = 1;
