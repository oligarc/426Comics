-- 426Comics DataBase --
-- Author: Óliver García Rodríguez --
-- Date : 26/03/2025 --
-- Apreciación 1: Incluir posteriormente pedido y detallesPedido --

-- As im working on MySQL I need to create first the DB --
CREATE DATABASE IF NOT EXISTS comics_db;
USE comics_db;
------------------------------------------
-- Drop tables for new launches/catching errors --
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS comic;
DROP TABLE IF EXISTS author;
DROP TABLE IF EXISTS publisher;
DROP TABLE IF EXISTS review;
DROP TABLE IF EXISTS user_collection;
DROP TABLE IF EXISTS ROLES;
------------------------------------------

------------------------------------------
-- Creating tables --

CREATE TABLE user(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    nick VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Hashed pw by the way --
    active TINYINT(1), --Can just be 1 or 0, as we want
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE table ROLES(
	user_id INT NOT NULL,
    role VARCHAR(50) NOT NULL,
    PRIMARY KEY (user_id,role),
    FOREIGN KEY (user_id) REFERENCES User(id)
)

CREATE TABLE comic(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    launch_date DATE,
    price DECIMAL(5,2) NOT NULL,
    stock INT,
    ISBN VARCHAR(25) NOT NULL UNIQUE,
    cover_url VARCHAR(255) NOT NULL,
    description TEXT,
    page_count INT,
    is_collection BOOLEAN DEFAULT FALSE,
    collection_volume INT,
    author_id INT NOT NULL,
    publisher_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE author (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    nationality VARCHAR(50),
    birth_date DATE,
    death_date DATE,
    biography TEXT,
    photo_url VARCHAR(255),
    is_scriptwriter BOOLEAN DEFAULT TRUE,
    is_drawer BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE publisher(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    website_url VARCHAR(255),
    business_place VARCHAR(100),
    postal_code INT NOT NULL,
    town VARCHAR(50),
    province VARCHAR(50),
    telephone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE review(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    rating INT CHECK(rating BETWEEN 1 AND 5),
    review_text TEXT NOT NULL,
    user_id INT NOT NULL,
    comic_id INT NOT NULL,
    reviewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE(user_id,comic_id)
);

CREATE TABLE user_collection(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    state VARCHAR(50) CHECK (state in ('Want to buy','To be read','Read','Mid','Favorite')) NOT NULL,
    added_in TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT NOT NULL,
    comic_id INT NOT NULL,
    UNIQUE(user_id,comic_id)
);


------------------------------------------

------------------------------------------
-- Adding constraints --

-- Foreign key for author in COMIC --
ALTER TABLE comic 
ADD CONSTRAINT fk_comic_author
    FOREIGN KEY (author_id) REFERENCES author(id)
    ON DELETE RESTRICT; -- Can't delete author with comics, if you use CASCADE it deletes automatically --

-- Foreign key for publisher in COMIC --
ALTER TABLE comic
ADD CONSTRAINT fk_comic_publisher
    FOREIGN KEY (publisher_id) REFERENCES publisher(id)
    ON DELETE RESTRICT;

-- Foreign key for user in REVIEW --
ALTER TABLE review
ADD CONSTRAINT fk_review_user
    FOREIGN KEY (user_id) REFERENCES user(id)
    ON DELETE CASCADE;

-- Foreign key for comic in REVIEW --
ALTER TABLE review
ADD CONSTRAINT fk_review_comic
    FOREIGN KEY (comic_id) REFERENCES comic(id)
    ON DELETE CASCADE;

-- Foreign key for user in USER_COLLECTION --
ALTER TABLE user_collection
ADD CONSTRAINT fk_user_collection_user
    FOREIGN KEY (user_id) REFERENCES user(id)
    ON DELETE CASCADE;

-- Foreign key for comic in USER_COLLECTION --
ALTER TABLE user_collection
ADD CONSTRAINT fk_user_collection_comic
    FOREIGN KEY (comic_id) REFERENCES comic(id)
    ON DELETE CASCADE;

------------------------------------------

------------------------------------------

-- Inserting data --

INSERT INTO publisher (name, website_url, business_place, postal_code, town, province, telephone)
VALUES ('Planeta Cómic', 'https://www.planetadelibros.com', 'Calle Córcega 273-277', 08008, 'Barcelona', 'Barcelona', '+34 934-925-000'),
('Norma Editorial', 'https://www.normaeditorial.com', 'Calle Ávila 57', 08005, 'Barcelona', 'Barcelona', '+34 933-096-900');

INSERT INTO author (name, last_name, nationality, birth_date, death_date, is_scriptwriter, is_drawer)
VALUES
('Stan', 'Lee', 'Estadounidense', '1922-12-28', '2018-11-12', TRUE, FALSE),
('Jack', 'Kirby', 'Estadounidense', '1917-08-28', '1994-02-06', FALSE, TRUE),
('Alan', 'Moore', 'Británico', '1953-11-18', NULL, TRUE, FALSE),
('Frank', 'Miller', 'Estadounidense', '1957-01-27', NULL, TRUE, TRUE),
('Neil', 'Gaiman', 'Británico', '1960-11-10', NULL, TRUE, FALSE);

INSERT INTO comic (title, launch_date, price, stock, ISBN, cover_url, description, page_count, is_collection, collection_volume, author_id, publisher_id)
VALUES
('Amazing Spider-Man #1', '1963-03-10', 9.99, 50, '978-0785199616', 'https://images.cdn2.buscalibre.com/fit-in/360x360/0a/ea/0aeaceb35a21817595502d7408bd8cfb.jpg', 'Primera aparición de Spider-Man', 32, FALSE, 1, 1, 1),
('Watchmen', '1986-09-01', 29.99, 30, '978-0930289232', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Watchmen-cover.svg/1200px-Watchmen-cover.svg.png', 'Clásico de Alan Moore sobre superhéroes retirados', 416, TRUE, 1, 3, 2),
('Batman: The Dark Knight Returns', '1986-02-01', 24.99, 40, '978-1563893421', 'https://m.media-amazon.com/images/I/71TfU3GnfML.jpg', 'Batman regresa de su retiro', 224, TRUE, 1, 4, 2),
('Sandman Vol. 1: Preludes & Nocturnes', '1989-01-01', 19.99, 35, '978-1401237655', 'https://m.media-amazon.com/images/I/810n6p+2ceL._AC_UF1000,1000_QL80_.jpg', 'Primer volumen de la saga de Morfeo', 240, TRUE, 1, 5, 2),
('X-Men #1', '1963-09-10', 12.99, 25, '978-0785104450', 'https://static.wikia.nocookie.net/marveldatabase/images/2/2f/X-Men_Vol_1_1.jpg/revision/latest?cb=20180128172113', 'Primera aparición de los X-Men', 32, FALSE, 1, 1, 1);

INSERT INTO user(name,last_name,email,nick,password,active) VALUES ('Juan', 'Pérez', 'juan.perez@example.com', 'juanp', '1234', 1);
INSERT INTO review(rating,review_text,user_id,comic_id) VALUES (5,'Batman es dios',1,3);
-- ----------------------------------------