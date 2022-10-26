CREATE TABLE list (
    idList int NOT NULL AUTO_INCREMENT,
    user_email varchar(45),
    likes text,
    bookmarks text,
    PRIMARY KEY (idList)
);

CREATE TABLE users (
    userId int NOT NULL AUTO_INCREMENT,
    full_name varchar(45),
    email varchar(45),
    password varchar(45),
    PRIMARY KEY (userId)
)