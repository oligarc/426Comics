-- 426Comics DataBase --
-- Author: Óliver García Rodríguez --
-- Date : 26/03/2025 --
-- Apreciación 1: Incluir posteriormente pedido y detallesPedido --

-- As im working on MySQL I need to create first the DB --
CREATE DATABASE IF NOT EXISTS comics_db;
USE comics_db;
------------------------------------------
-- Drop tables for new launches/catching errors --
-- Need to drop tables in an order because of FK --

DROP TABLE IF EXISTS comentarios_lista;
DROP TABLE IF EXISTS lista_comics;
DROP TABLE IF EXISTS lista;
DROP TABLE IF EXISTS review;
DROP TABLE IF EXISTS user_collection;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS comic;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS author;
DROP TABLE IF EXISTS publisher;

------------------------------------------

------------------------------------------
-- Creating tables --

CREATE table roles(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);


CREATE TABLE user(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    nick VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Hashed pw by the way --
    active TINYINT(1), -- Can just be 1 or 0, as we want
    role_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);



CREATE TABLE comic(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    launch_date DATE,
    price DECIMAL(5,2) NOT NULL,
    stock INT,
    ISBN VARCHAR(25) NOT NULL UNIQUE,
    cover_url VARCHAR(255) NOT NULL,
    description TEXT, -- Those that are TEXT type, must be marked on SB as columnDefinition = "TEXT" . Otherwise Hibernate won't load them
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
    logo_url VARCHAR(255),
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

-- New table for list, only basics
CREATE TABLE lista (
                        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                        titulo VARCHAR(100) NOT NULL,
                        descripcion TEXT,
                        privacidad ENUM('publica', 'privada') DEFAULT 'publica',
                        user_id INT NOT NULL,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Over here all comics put into one single list
CREATE TABLE lista_comics (
                              id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                              lista_id INT NOT NULL,
                              comic_id INT NOT NULL,
                              fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                              UNIQUE(lista_id, comic_id)
);

-- Comments for a specific list

CREATE TABLE comentarios_lista (
                                   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                   lista_id INT NOT NULL,
                                   user_id INT NOT NULL,
                                   contenido TEXT NOT NULL,
                                   fecha_comentario TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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

ALTER TABLE lista
    ADD CONSTRAINT fk_listas_user
        FOREIGN KEY (user_id) REFERENCES user(id)
            ON DELETE CASCADE;

-- Foreign key for lista on lista_comics
ALTER TABLE lista_comics
    ADD CONSTRAINT fk_lista_comics_lista
        FOREIGN KEY (lista_id) REFERENCES lista(id)
            ON DELETE CASCADE;

ALTER TABLE lista_comics
    ADD CONSTRAINT fk_lista_comics_comic
        FOREIGN KEY (comic_id) REFERENCES comic(id)
            ON DELETE CASCADE;

-- Foreign keys for user on comentarios_lista
ALTER TABLE comentarios_lista
    ADD CONSTRAINT fk_comentarios_lista_user
        FOREIGN KEY (user_id) REFERENCES user(id)
            ON DELETE CASCADE;

-- Foreign keys for lista on comentarios_lista

ALTER TABLE comentarios_lista
    ADD CONSTRAINT fk_comentarios_lista_lista
        FOREIGN KEY (lista_id) REFERENCES lista(id)
            ON DELETE CASCADE;

------------------------------------------

------------------------------------------

-- Inserting data --

INSERT INTO publisher (name, website_url, business_place, postal_code, town, province, telephone,logo_url)
VALUES ('Planeta Cómic', 'https://www.planetadelibros.com', 'Calle Córcega 273-277', 08008, 'Barcelona', 'Barcelona', '+34 934-925-000','https://publishnews.es/wp-content/uploads/2024/02/grupo_planeta-1280x640.jpg'),
('Norma Editorial', 'https://www.normaeditorial.com', 'Calle Ávila 57', 08005, 'Barcelona', 'Barcelona', '+34 933-096-900','https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Norma_Editorial.svg/1200px-Norma_Editorial.svg.png'),
('Panini Comics', 'https://www.panini.es/shp_esp_es/', 'Calle Joaquim Vallespi 20', 17257, 'Torroella de Montgri', 'Gerona', '+34 972-757-411','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYIDzfiQig4FfvizSNPl4JqUfXrrBfPBGH4A&s'),
('Milky Way Ediciones', 'https://www.milkywayediciones.com/', 'Plaza Julio Alberto Blanco', 33428, 'Llanera', 'Asturias', '+34 985-087-430','https://pbs.twimg.com/profile_images/555125579683344388/WNNKQPfq_400x400.png'),
('Ivrea', 'https://www.editorialivrea.com/ESP/', 'Calle Ciutat de Granada 163', 08018, 'Barcelona', 'Barcelona', '+34 932-211-869','https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Ivrea_Editorial.svg/2560px-Ivrea_Editorial.svg.png');

INSERT INTO author (name, last_name, nationality, birth_date, death_date,biography,photo_url, is_scriptwriter, is_drawer)
VALUES
('Stan', 'Lee', 'Estadounidense', '1922-12-28', '2018-11-12', 'Stan Lee fue un influyente escritor y editor de cómics, conocido por co-crear personajes icónicos de Marvel como Spider-Man, los X-Men y los Vengadores. Su enfoque innovador introdujo superhéroes más humanos, lo que revolucionó la industria del cómic. Además, tuvo apariciones en muchas películas de Marvel, lo que lo convirtió en una figura querida por los fans. Su legado perdura como una de las figuras más importantes en el entretenimiento y la cultura popular.','https://upload.wikimedia.org/wikipedia/commons/7/7b/Stan_Lee_by_Gage_Skidmore_3.jpg',TRUE, FALSE),
('Jack', 'Kirby', 'Estadounidense', '1917-08-28', '1994-02-06', 'Jack Kirby fue un renombrado dibujante, escritor y editor de cómics, considerado uno de los creadores más influyentes de la industria. Co-creó muchos de los personajes más emblemáticos de Marvel, como los Cuatro Fantásticos, Thor y los X-Men, junto a Stan Lee. Su estilo artístico innovador y su enfoque dinámico transformaron la narrativa visual de los cómics. Es reconocido como un pionero del cómic moderno, dejando un legado que sigue inspirando a generaciones de artistas.','https://upload.wikimedia.org/wikipedia/commons/a/a0/Jack-Kirby_art-of-jack-kirby_wyman-skaar.jpg',FALSE, TRUE),
('Alan', 'Moore', 'Británico', '1953-11-18', NULL, 'Alan Moore es un escritor de cómics británico, reconocido por su enfoque único y experimental en la narrativa gráfica. Es conocido por obras como Watchmen, V de Vendetta y Swamp Thing, que revolucionaron la industria del cómic con sus tramas profundas y complejas. Moore es considerado uno de los guionistas más influyentes de todos los tiempos, explorando temas como la política, la moralidad y la identidad. Su estilo innovador y su crítica social continúan impactando tanto a los lectores como a los creadores de cómics.','https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Alan_Moore_at_the_ICA_on_June_2nd_2009.jpg/1200px-Alan_Moore_at_the_ICA_on_June_2nd_2009.jpg', TRUE, FALSE),
('Frank', 'Miller', 'Estadounidense', '1957-01-27', NULL,'Frank Miller es un influyente escritor y dibujante de cómics estadounidense, conocido por su estilo oscuro y su enfoque en narrativas más maduras y realistas. Es célebre por obras icónicas como The Dark Knight Returns, Sin City y 300, que han dejado una huella perdurable en la industria del cómic. Su trabajo ha redefinido personajes como Batman y Daredevil, llevando a estos héroes a nuevas direcciones más complejas y sombrías. Miller es reconocido por su capacidad para fusionar acción con reflexión profunda sobre la moralidad y el poder.','https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/FrankMillerSanDiego_crop.jpg/1200px-FrankMillerSanDiego_crop.jpg', TRUE, TRUE),
('Neil', 'Gaiman', 'Británico', '1960-11-10', NULL,'Neil Gaiman es un escritor británico conocido por su trabajo en cómics, novelas, y literatura fantástica. Es famoso por la serie The Sandman, una de las más influyentes en el mundo del cómic, que ha sido aclamada por su complejidad y profundidad literaria. Gaiman ha incursionado también en la literatura para jóvenes y adultos con obras como American Gods, Coraline y Neverwhere. Su estilo único mezcla lo fantástico con lo sombrío, y ha ganado numerosos premios, consolidándose como uno de los autores más destacados de su generación.','https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Gaiman%2C_Neil_%282007%29.jpg/800px-Gaiman%2C_Neil_%282007%29.jpg', TRUE, FALSE),
('Scott', 'Snyder', 'Estadounidense', '1976-01-15', NULL,'Scott Snyder es un escritor y guionista de cómics estadounidense, reconocido principalmente por su trabajo en el universo de Batman de DC Comics. Su colaboración con el dibujante Greg Capullo en la serie Batman a partir de 2011, especialmente en los arcos The Court of Owls y Death of the Family, ha sido muy influyente y ampliamente aclamada. Además de Batman, Snyder ha trabajado en proyectos como American Vampire, Swamp Thing y Wytches, destacándose por su enfoque en el horror, el thriller y la narrativa de suspenso.','https://upload.wikimedia.org/wikipedia/commons/a/a7/5.19.11ScottSnyderByLuigiNovi.jpg' ,TRUE, FALSE),
('Mark', 'Waid', 'Estadounidense', '1962-03-21', NULL,'Mark Waid es un escritor de cómics estadounidense conocido por su trabajo en títulos clásicos de superhéroes como The Flash, Daredevil, y Kingdom Come de DC Comics. Su enfoque en la narrativa optimista y su habilidad para revitalizar personajes establecidos lo han convertido en una figura influyente en la industria del cómic. Waid ha sido elogiado por su capacidad para explorar profundamente las motivaciones de los personajes mientras mantiene el tono accesible y emocionante para nuevos lectores. Además de sus contribuciones a Marvel y DC, también ha trabajado en títulos independientes como Irredeemable y Incorruptible.','https://upload.wikimedia.org/wikipedia/commons/c/cf/4.16.16MarkWaidByLuigiNovi2.jpg', TRUE, FALSE),
('Jonathan', 'Hickman', 'Estadounidense', '1972-09-03', NULL,'Jonathan Hickman es un escritor y dibujante de cómics estadounidense, conocido por sus trabajos complejos y profundamente estructurados en Marvel Comics y otras editoriales. Es famoso por su enfoque innovador en las tramas, caracterizado por un uso audaz de la ciencia ficción, el misterio y la exploración de grandes conceptos. Su trabajo en Fantastic Four y Avengers transformó el universo Marvel, especialmente con su obra Secret Wars, que se ha convertido en un hito dentro de los cómics modernos. Además, ha creado historias originales como East of West y The Nightly News, que también han sido muy aclamadas por la crítica.','https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/JonathanHickman.jpg/1200px-JonathanHickman.jpg', TRUE, FALSE),
('Yūgo', 'Kobayashi', 'Japonés', '1980-05-25', NULL,'Yugo Kobayashi es un escritor y guionista japonés conocido por su trabajo en la industria del manga. Aunque su nombre no es tan ampliamente reconocido como algunos de los grandes nombres del manga, ha trabajado en varios proyectos, destacándose en títulos de géneros como acción, fantasía y aventura. Su estilo narrativo suele centrarse en la construcción de mundos complejos y personajes bien desarrollados. Kobayashi ha contribuido a la popularidad de varios mangas que han logrado captar la atención de audiencias tanto nacionales como internacionales.','https://pbs.twimg.com/media/FqU0SyKXgAI1Hqr.jpg', FALSE, TRUE),
('Mikoto', 'Yamaguchi', 'Japonés', '1981-07-07', NULL, 'Mikoto Yamaguchi es un mangaka japonés conocido por su estilo único en el género de thriller psicológico y acción. Es famoso por obras como Tomodachi Game, un manga que explora los límites de la amistad a través de juegos manipulados, y Dead Tube, que combina horror y ecchi en un contexto de videos extremos. Sus historias suelen estar llenas de suspenso y giros sorprendentes. A lo largo de su carrera, ha capturado la atención de los fanáticos por su capacidad para crear tramas intrigantes y personajes complejos.','https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg', TRUE, FALSE),
('Yasuhisa', 'Hara', 'Japonés', '1970-06-12', NULL, 'Yasuhisa Hara es un mangaka japonés reconocido por su obra Kingdom, una serie que ha vendido más de 100 millones de copias y que le valió el Gran Premio en los Premios Culturales Osamu Tezuka en 2013. Nació en Kiyama, Saga, y estudió en el Instituto de Diseño de Kyushu. Antes de dedicarse al manga, trabajó como ingeniero de sistemas en Fujitsu. Además de Kingdom, ha creado otras obras como Ha to Sen y Li Mu.','https://animeland.fr/wp-content/uploads/2023/07/Yasuhisa-Hara-02.jpg', TRUE, TRUE),
('Skottie', 'Young', 'Estadounidense', '1980-03-01', NULL,'Skottie Young es un dibujante y escritor de cómics estadounidense, conocido por su estilo único y caricaturesco. Ha trabajado en Marvel Comics, destacándose en títulos como Rocket Raccoon y Spider-Man. Además, ha adaptado las novelas de Oz en cómic, ganando premios Eisner. Su serie I Hate Fairyland ha consolidado su reputación como creador innovador.','https://cafans.b-cdn.net/comic-artists/images/iAOi35ez_300122195100.jpg', TRUE, TRUE);


INSERT INTO comic (title, launch_date, price, stock, ISBN, cover_url, description, page_count, is_collection, collection_volume, author_id, publisher_id)
VALUES
('Amazing Spider-Man #1', '1963-03-10', 9.99, 50, '978-0785199616', 'https://images.cdn2.buscalibre.com/fit-in/360x360/0a/ea/0aeaceb35a21817595502d7408bd8cfb.jpg', 'Primera aparición de Spider-Man', 32, TRUE, 1, 1, 3),
('Watchmen', '1986-09-01', 29.99, 30, '978-0930289232', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Watchmen-cover.svg/1200px-Watchmen-cover.svg.png', 'Clásico de Alan Moore sobre superhéroes retirados', 416, FALSE, 1, 3, 2),
('Batman: The Dark Knight Returns', '1986-02-01', 24.99, 40, '978-1563893421', 'https://m.media-amazon.com/images/I/71TfU3GnfML.jpg', 'Batman regresa de su retiro', 224, FALSE, 1, 4, 3),
('Sandman Vol. 1: Preludes & Nocturnes', '1989-01-01', 19.99, 35, '978-1401237655', 'https://m.media-amazon.com/images/I/810n6p+2ceL._AC_UF1000,1000_QL80_.jpg', 'Primer volumen de la saga de Morfeo', 240, TRUE, 1, 5, 2),
('X-Men #1', '1963-09-10', 12.99, 25, '978-0785104450', 'https://m.media-amazon.com/images/I/51hf9gBWbfL._SY445_SX342_.jpg', 'Primera aparición de los X-Men', 32, TRUE, 1, 1, 3),
('Tomodachi Game 1', '2016-03-24', 8.50, 100, '978-84-945110-5-9', 'https://www.milkywayediciones.com/cdn/shop/products/tomodachi_game_1.png?v=1464108243', 'Yûichi y sus amigos son secuestrados y obligados a participar en una competición que pondrá a prueba su amistad.', 208, TRUE, 1, 10, 4),
('Tomodachi Game 2', '2016-05-30', 8.50, 100, '978-84-945110-6-6', 'https://www.milkywayediciones.com/cdn/shop/products/tomodachi_game_2.png?v=1464174005', 'Los desafíos en los juegos se intensifican, revelando secretos y tensiones entre los participantes.', 208, TRUE, 2, 10, 4),
('Tomodachi Game 3', '2016-07-26', 8.50, 100, '978-84-945110-7-3', 'https://www.milkywayediciones.com/cdn/shop/products/tomodachi_game_3.png?v=1467215265', 'La competencia se vuelve más peligrosa, y las lealtades entre amigos se ponen a prueba.', 208, TRUE, 3, 10, 4),
('Tomodachi Game 4', '2016-09-27', 8.50, 100, '978-84-945110-8-0', 'https://www.milkywayediciones.com/cdn/shop/products/tomodachi_game_4.png?v=1467215265', 'Nuevos desafíos revelan las verdaderas intenciones de los participantes en los juegos.', 208, TRUE, 4, 10, 4),
('Tomodachi Game 5', '2016-11-28', 8.50, 100, '978-84-945110-9-7', 'https://www.milkywayediciones.com/cdn/shop/products/tomodachi_game_5.png?v=1467215265', 'La tensión alcanza su punto máximo mientras los secretos salen a la luz.', 208, TRUE, 5, 10, 4),
('Tomodachi Game 6', '2017-01-24', 8.50, 100, '978-84-945111-0-3', 'https://www.milkywayediciones.com/cdn/shop/products/tomodachi_game_6.png?v=1467215265', 'Los participantes enfrentan consecuencias inesperadas mientras los juegos continúan.', 208, TRUE, 6, 10, 4),
('Tomodachi Game 7', '2017-03-28', 8.50, 100, '978-84-945111-1-0', 'https://www.milkywayediciones.com/cdn/shop/products/tomodachi_game_7.png?v=1467215265', 'La estrategia y las tácticas son llevadas al límite en el nuevo reto de amistad y supervivencia.', 192, TRUE, 7, 10, 4),
('Tomodachi Game 8', '2017-05-24', 8.50, 100, '978-84-945111-2-7', 'https://www.milkywayediciones.com/cdn/shop/products/tomodachi_game_8.png?v=1467215265', 'Las alianzas se rompen, y los jugadores empiezan a dudar de sus propios compañeros.', 200, TRUE, 8, 10, 4),
('Tomodachi Game 9', '2017-07-27', 8.50, 100, '978-84-945111-3-4', 'https://www.milkywayediciones.com/cdn/shop/products/tomodachi_game_9.png?v=1467215265', 'El juego toma un giro inesperado, desvelando aún más secretos oscuros entre los participantes.', 200, TRUE, 9, 10, 4),
('Tomodachi Game 10', '2018-03-26', 8.50, 100, '978-84-17373-15-3', 'https://www.milkywayediciones.com/cdn/shop/products/tomodachi_game_10.png?v=1467215265', 'El juego de la amistad se intensifica mientras Yûichi se enfrenta a nuevos desafíos y dilemas morales.', 192, TRUE, 10, 10, 4),
('Tomodachi Game 11', '2018-11-29', 8.50, 100, '978-84-17373-16-0', 'https://www.milkywayediciones.com/cdn/shop/products/tomodachi_game_11.png?v=1467215265', 'Los jugadores son puestos a prueba como nunca antes, y la línea entre la amistad y la traición se vuelve más difusa.', 200, TRUE, 11, 10, 4),
('Tomodachi Game 12', '2019-07-09', 8.50, 100, '978-84-17373-17-7', 'https://www.milkywayediciones.com/cdn/shop/products/tomodachi_game_12.png?v=1467215265', 'Las revelaciones personales y los secretos de los jugadores hacen que el juego se vuelva más peligroso.', 192, TRUE, 12, 10, 4),
('Tomodachi Game 13', '2019-12-09', 8.50, 100, '978-84-17373-18-4', 'https://www.milkywayediciones.com/cdn/shop/products/tomodachi_game_13_GG.gif?v=1576062995', 'Yûichi se encuentra en una encrucijada mientras toma decisiones que cambiarán el curso del juego.', 192, TRUE, 13, 10, 4),
('Tomodachi Game 14', '2020-06-07', 8.50, 100, '978-84-17373-19-1', 'https://www.milkywayediciones.com/cdn/shop/products/tomodachi_game_14.png?v=1467215265', 'Los juegos se vuelven más complejos y peligrosos mientras Yûichi trata de descubrir la verdad detrás de los eventos.', 192, TRUE, 14, 10, 4),
('Tomodachi Game 15', '2020-12-09', 8.50, 100, '978-84-17373-20-7', 'https://www.milkywayediciones.com/cdn/shop/products/tomodachi_game_15.png?v=1467215265', 'El desafío final comienza, y los participantes tienen que enfrentarse a las decisiones más difíciles de su vida.', 192, TRUE, 15, 10, 4),
('Tomodachi Game 16', '2021-08-07', 8.50, 100, '978-84-17373-21-4', 'https://www.milkywayediciones.com/cdn/shop/products/tomodachi_game_16.png?v=1467215265', 'Yûichi se encuentra en una situación límite mientras lucha por sobrevivir al juego y desvelar sus secretos.', 192, TRUE, 16, 10, 4),
('Tomodachi Game 17', '2022-04-09', 8.50, 100, '978-84-17373-22-1', 'https://www.milkywayediciones.com/cdn/shop/products/Tomodachi_Game_17.jpg?v=1649682597', 'La estrategia final se pone en marcha, y los jugadores deben enfrentar sus propios demonios internos.', 192, TRUE, 17, 10, 4),
('Tomodachi Game 18', '2022-06-28', 8.50, 100, '978-84-19195-50-0', 'https://www.milkywayediciones.com/cdn/shop/products/Tomodachi_Game_18.jpg?v=1654696560', 'Los participantes descubren nuevos giros en el juego mientras luchan por mantener su humanidad.', 192, TRUE, 18, 10, 4),
('Tomodachi Game 19', '2024-09-25', 8.50, 100, '979-13-87506-28-5', 'https://www.milkywayediciones.com/cdn/shop/files/Tomodachi_Game_19.jpg?v=1725961024', 'El juego llega a su punto culminante, donde se revelan secretos que cambiarán todo.', 192, TRUE, 19, 10, 4),
('Tomodachi Game 20', '2024-12-23', 8.50, 100, '979-13-87506-29-2', 'https://www.milkywayediciones.com/cdn/shop/files/Tomodachi_Game_20.jpg?v=1733916558', 'La resolución final del juego comienza, y Yûichi debe tomar decisiones que cambiarán su vida para siempre.', 192, TRUE, 20, 10, 4),
('Tomodachi Game 21', '2025-02-27', 8.50, 100, '979-13-87506-63-6', 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1678623135i/123229060.jpg', 'El último juego se titula "¡Adiós, amigos!", cuyo objetivo es librarte de los amigos que ya no necesitas para nada. Con la cabaña reducida a cenizas, el grupo se muda a un pequeño almacén de suministros como único refugio. Sin comida y a merced del frío extremo, se desata la violencia... En medio del hambre y la desesperación, los jugadores reciben una nueva misión que los pondrá contra las cuerdas!', 192, TRUE, 21, 10, 4),
('Ao Ashi 1', '2022-12-08', 9.00, 100, '978-84-17931-00-2', 'https://m.media-amazon.com/images/I/71YXWSoUU3L._AC_UF894,1000_QL80_.jpg', 'Ashito Aoi, un joven con talento para el fútbol, comienza su viaje en el mundo del deporte con grandes desafíos por delante.', 208, TRUE, 1, 9, 2),
('Ao Ashi 2', '2022-12-08', 9.00, 100, '978-84-17931-01-9', 'https://www.normaeditorial.com/upload/media/albumes/0001/28/59fdb44cfc2a5663e1de470d53dad7cd2c1779bd.jpeg', 'A medida que Ashito avanza en su entrenamiento, enfrenta nuevas pruebas y aprende lecciones valiosas sobre el fútbol.', 200, TRUE, 2, 9, 2),
('Ao Ashi 3', '2023-01-13', 9.00, 100, '978-84-17931-02-6', 'https://www.normaeditorial.com/upload/media/albumes/0001/24/thumb_23446_albumes_big.jpeg', 'El esfuerzo de Ashito lo lleva a nuevos niveles, enfrentando rivales más fuertes y mostrando su verdadero potencial.', 208, TRUE, 3, 9, 2),
('Ao Ashi 4', '2023-02-17', 9.00, 100, '978-84-17931-03-3', 'https://www.normaeditorial.com/upload/media/albumes/0001/24/f8ba135477ab8fad66f225ddc3975cc034ffcbce.jpeg', 'Ashito lucha por mejorar y encontrar su lugar en el mundo del fútbol profesional mientras enfrenta varios desafíos.', 208, TRUE, 4, 9, 2),
('Ao Ashi 5', '2023-03-31', 9.00, 100, '978-84-17931-04-0', 'https://www.normaeditorial.com/upload/media/albumes/0001/25/1f7d0fcb0e949f154a5c4f7491b468be677dbb92.jpeg', 'La historia de Ashito sigue desarrollándose mientras aprende a trabajar en equipo y fortalecer su mente y cuerpo.', 208, TRUE, 5, 9, 2),
('Ao Ashi 6', '2023-04-14', 9.00, 100, '978-84-17931-05-7', 'https://www.normaeditorial.com/upload/media/albumes/0001/25/f90f82504540bc194934295eff742970f51ca94e.jpeg', 'Ashito no ha entrado en la convocatoria del primer partido oficial desde que lo cambiaron al puesto de lateral. Practica el giro de cuello de Kuribayashi mientras tanto.', 216, TRUE, 6, 9, 2),
('Ao Ashi 7', '2023-05-12', 9.00, 100, '978-84-17931-06-4', 'https://www.normaeditorial.com/upload/media/albumes/0001/26/ba754eec816575540bc0318e9ccd84a8c9206291.jpeg', 'Ashito continúa su entrenamiento, enfrentando nuevos desafíos y demostrando su dedicación al fútbol.', 208, TRUE, 7, 9, 2),
('Ao Ashi 8', '2023-06-09', 9.00, 100, '978-84-17931-07-1', 'https://www.normaeditorial.com/upload/media/albumes/0001/26/77bf62aedb0810fb52e3edff2743870d86f3a25e.jpeg', 'Tras el cambio de posición, Ashito empieza a asumir su nuevo puesto en el campo, entrenando habilidades específicas.', 216, TRUE, 8, 9, 2),
('Ao Ashi 9', '2023-07-07', 9.00, 100, '978-84-17931-08-8', 'https://www.normaeditorial.com/upload/media/albumes/0001/26/dfdf9311f2d750345bf53aa01c9e57182f68bbf3.jpeg', 'Ashito se enfrenta a nuevos desafíos en su camino hacia convertirse en un jugador destacado.', 216, TRUE, 9, 9, 2),
('Ao Ashi 10', '2023-08-04', 9.00, 100, '978-84-17931-09-5', 'https://www.normaeditorial.com/upload/media/albumes/0001/27/4a98c18c341d436dfb4efcfdca605acc8d915697.jpeg', 'Ashito continúa demostrando su talento y determinación en el mundo del fútbol.', 192, TRUE, 10, 9, 2),
('Ao Ashi 11', '2023-09-08', 9.00, 100, '978-84-17931-10-1', 'https://www.normaeditorial.com/upload/media/albumes/0001/27/7b549100a2fd01b6eded63d8c913d2fcf7668a3b.jpeg', 'Ashito asciende al juvenil A y se enfrenta a nuevos retos en la Premier League.', 208, TRUE, 11, 9, 2),
('Ao Ashi 12', '2023-10-06', 9.00, 100, '978-84-17931-11-8', 'https://www.normaeditorial.com/upload/media/albumes/0001/28/77ec1d989cbd95b796583fee2d1ef54791a045ee.jpeg', 'Ashito se adapta a su nuevo equipo y enfrenta desafíos tanto en el campo como fuera de él.', 192, TRUE, 12, 9, 2),
('Ao Ashi 13', '2023-11-10', 9.00, 100, '978-84-17931-12-5', 'https://www.normaeditorial.com/upload/media/albumes/0001/28/232752b9681c47d9986125484210ea4049bd40e7.jpeg', 'Ashito continúa su ascenso en el mundo del fútbol, enfrentando nuevos desafíos y oportunidades.', 208, TRUE, 13, 9, 2),
('Ao Ashi 14', '2023-12-08', 9.00, 100, '978-84-17931-13-2', 'https://www.normaeditorial.com/upload/media/albumes/0001/29/171c85be8547210cedbeb652037277a4a235b45b.jpeg', 'La historia de Ashito sigue desarrollándose mientras enfrenta nuevos desafíos en su carrera futbolística.', 192, TRUE, 14, 9, 2),
('Ao Ashi 15', '2024-01-19', 9.00, 100, '978-84-17931-14-9', 'https://www.normaeditorial.com/upload/media/albumes/0001/29/55557cc4ac5fb1823ea84be9740f5071a455f39d.jpeg', 'Ashito continúa demostrando su dedicación y talento en el mundo del fútbol.', 216, TRUE, 15, 9, 2),
('Ao Ashi 16', '2024-02-02', 9.00, 100, '978-84-17931-15-6', 'https://www.normaeditorial.com/upload/media/albumes/0001/29/59842ee2ed1070d027bbb2dc084fa512caebfada.jpeg', 'Ashito enfrenta nuevos desafíos y oportunidades en su camino hacia el éxito futbolístico.', 208, TRUE, 16, 9, 2),
('Ao Ashi 17', '2024-03-01', 9.00, 100, '978-84-17931-16-3', 'https://www.normaeditorial.com/upload/media/albumes/0001/30/e16efec7a1c32eaf91f9760a3246dcd18128e4af.jpeg', 'La historia de Ashito se complica con nuevos desafíos y decisiones difíciles en su carrera.', 192, TRUE, 17, 9, 2),
('Ao Ashi 18', '2024-04-05', 9.00, 100, '978-84-7969-6332-8', 'https://www.normaeditorial.com/upload/media/albumes/0001/30/ec6f1ed47fb7d91390fa4a6c7c7c4166e2f5362f.jpeg', 'Ashito enfrenta nuevos desafíos mientras continúa su ascenso en el mundo del fútbol.', 192, TRUE, 18, 9, 2),
('Ao Ashi 19', '2024-05-03', 9.00, 100, '978-84-7969-6333-5', 'https://www.normaeditorial.com/upload/media/albumes/0001/31/4bc8da7e279abd13fe1041bec54df2c1bedec060.jpeg', 'La competencia se intensifica mientras Ashito demuestra su habilidad en el campo.', 192, TRUE, 19, 9, 2),
('Ao Ashi 20', '2024-06-07', 9.00, 100, '978-84-7969-6334-2', 'https://www.normaeditorial.com/upload/media/albumes/0001/31/4eceed31a708b920d4556aa454112904aad2b411.jpeg', 'Ashito enfrenta decisiones difíciles que podrían afectar su futuro en el fútbol.', 192, TRUE, 20, 9, 2),
('Ao Ashi 21', '2024-07-05', 9.00, 100, '978-84-7969-6335-9', 'https://www.normaeditorial.com/upload/media/albumes/0001/32/890515afd4003cbaf3948781241bfd64e5e12f96.jpeg', 'La historia de Ashito continúa mientras enfrenta nuevos retos y oportunidades.', 208, TRUE, 21, 9, 2),
('Ao Ashi 22', '2024-08-02', 9.00, 100, '978-84-7969-6336-6', 'https://www.normaeditorial.com/upload/media/albumes/0001/33/b661974f6e7315211af2d39e02cc2747bb0a60fd.jpeg', 'Ashito se adapta a cambios en su equipo y enfrenta desafíos inesperados.', 192, TRUE, 22, 9, 2),
('Ao Ashi 23', '2024-09-06', 9.00, 100, '978-84-7969-6337-3', 'https://www.normaeditorial.com/upload/media/albumes/0001/33/93f9139866123904d255649c5ddcfc1751e14057.jpeg', 'La competencia por un lugar en el equipo titular se intensifica mientras Ashito lucha por destacarse.', 192, TRUE, 23, 9, 2),
('Ao Ashi 24', '2024-10-04', 9.00, 100, '978-84-7969-6338-0', 'https://www.normaeditorial.com/upload/media/albumes/0001/34/04d146a2fb93a7a0ea7861d5c75cf9fe848196c5.jpeg', 'Ashito enfrenta desafíos tanto en el campo como en su vida personal.', 200, TRUE, 24, 9, 2),
('Ao Ashi 25', '2024-11-08', 9.00, 100, '978-84-7969-6339-7', 'https://www.normaeditorial.com/upload/media/albumes/0001/34/b5a43bfdb176713f2fc9ce69aaa5dd7efc77bceb.jpeg', 'La historia de Ashito alcanza nuevos picos de emoción y tensión en su carrera futbolística.', 192, TRUE, 25, 9, 2),
('Ao Ashi 26', '2025-01-17', 9.00, 100, '978-84-7969-6340-3', 'https://www.normaeditorial.com/upload/media/albumes/0001/35/2fbf689bb4f69ccce79ac8b8a8ac9cfead9116ee.jpeg', 'Ashito se enfrenta a nuevos rivales y desafíos que pondrán a prueba su determinación.', 192, TRUE, 26, 9, 2),
('Ao Ashi 27', '2025-02-07', 9.00, 100, '978-84-7969-6341-0', 'https://www.normaeditorial.com/upload/media/albumes/0001/36/c5561866c5d1d1623832aa93c12b08643da62ca5.jpeg', 'La lucha por el campeonato se intensifica mientras Ashito y su equipo dan lo mejor de sí.', 192, TRUE, 27, 9, 2),
('Ao Ashi 28', '2025-03-07', 9.00, 100, '978-84-7969-6342-7', 'https://comicstores.es/imagenes_grandes/9788467/978846797303.JPG', 'Ashito alcanza nuevos logros y enfrenta decisiones que podrían cambiar su vida.', 192, TRUE, 28, 9, 2),
('Kingdom 1', '2021-11-25', 8.50, 100, '978-84-18776-04-5', 'https://m.media-amazon.com/images/I/812HV8qOyPL.jpg', 'La historia nos traslada a la antigua China, donde Shin, un huérfano de guerra, sueña con convertirse en un gran general. Junto a su amigo Hyou, se ve inmerso en una serie de eventos que lo llevan a unirse al ejército y luchar por unificar los siete reinos en uno solo.', 200, TRUE, 1, 11, 5),
('Kingdom 2', '2021-12-23', 8.50, 100, '978-84-18776-05-2', 'https://cdn.grupoelcorteingles.es/SGFM/dctm/MEDIA03/202202/14/00106580227814____1__1200x1200.jpg', 'Shin y Hyou enfrentan nuevos desafíos mientras ascienden en el ejército de Qin, luchando en batallas épicas y forjando alianzas cruciales en su camino hacia la unificación de China.', 200, TRUE, 2, 11, 5),
('Kingdom 3', '2022-02-24', 8.50, 100, '978-84-18776-06-9', 'https://i1.whakoom.com/large/01/33/a8126d7398dd48ed8a8bedc43b853a24.jpg', 'Las estrategias militares se intensifican mientras Shin y sus compañeros participan en campañas que definirán el destino de los reinos en guerra.', 200, TRUE, 3, 11, 5),
('Kingdom 4', '2022-04-28', 8.50, 100, '978-84-18776-07-6', 'https://i1.whakoom.com/large/10/28/e4c8f58a95924c07826fed2463bcc234.jpg', 'En medio de intrigas políticas y traiciones, Shin se enfrenta a decisiones que podrían cambiar el curso de la historia.', 200, TRUE, 4, 11, 5),
('Kingdom 5', '2022-06-30', 8.50, 100, '978-84-18776-08-3', 'https://kurogami.com/img/productos/36/64/kingdom-05-mnaga-oficial-ivrea.jpg', 'Las batallas se intensifican mientras nuevos personajes entran en escena, cada uno con sus propios objetivos y lealtades.', 200, TRUE, 5, 11, 5),
('Kingdom 6', '2022-08-25', 8.50, 100, '978-84-18776-09-0', 'https://dam.elcorteingles.es/producto/www-9788419383907-00.jpg?impolicy=Resize&width=1200&height=1200', 'Shin lidera a sus tropas en una campaña crucial, enfrentando desafíos que pondrán a prueba su liderazgo y determinación.', 200, TRUE, 6, 11, 5),
('Kingdom 7', '2022-10-27', 8.50, 100, '978-84-18776-10-6', 'https://m.media-amazon.com/images/I/919InxeaPpL.jpg', 'La guerra continúa mientras Shin y sus aliados luchan por expandir el territorio de Qin, enfrentando a enemigos formidables.', 200, TRUE, 7, 11, 5),
('Kingdom 8', '2022-12-22', 8.50, 100, '978-84-18776-11-3', 'https://cdn.grupoelcorteingles.es/SGFM/dctm/MEDIA03/202209/14/00106580251897____1__1200x1200.jpg', 'En medio de conflictos internos y externos, Shin se enfrenta a desafíos que podrían determinar el futuro de China.', 200, TRUE, 8, 11, 5),
('Kingdom 9', '2023-02-23', 8.50, 100, '978-84-18776-12-0', 'https://sgfm.elcorteingles.es/SGFM/dctm/MEDIA03/202210/06/00106580255377____1__640x640.jpg', 'Las alianzas se ponen a prueba mientras las batallas se vuelven más intensas y las estrategias más complejas.', 200, TRUE, 9, 11, 5),
('Kingdom 10', '2023-04-27', 8.50, 100, '978-84-18776-13-7', 'https://sgfm.elcorteingles.es/SGFM/dctm/MEDIA03/202211/23/00106580260971____1__640x640.jpg', 'Shin lidera una expedición peligrosa, enfrentando enemigos y desafíos que lo llevan al límite de sus habilidades.', 200, TRUE, 10, 11, 5),
('Kingdom 11', '2023-06-29', 8.50, 100, '978-84-18776-14-4', 'https://sgfm.elcorteingles.es/SGFM/dctm/MEDIA03/202302/21/00106580270145____1__640x640.jpg', 'La guerra se intensifica mientras nuevos generales y estrategas entran en escena, cambiando el curso de las batallas.', 200, TRUE, 11, 11, 5),
('Kingdom 12', '2023-08-31', 8.50, 100, '978-84-18776-15-1', 'https://i1.whakoom.com/large/1e/07/7e4179846f7849fd9dc829cb3003e1b0.jpg', 'Shin enfrenta desafíos personales mientras lidera a sus tropas en una campaña crucial para la unificación de China.', 200, TRUE, 12, 11, 5),
('Kingdom 13', '2023-10-26', 8.50, 100, '978-84-18776-16-8', 'https://i1.whakoom.com/large/09/3a/58b1d48ad9844261b895e2604ab4b57a.jpg', 'Las tácticas militares se vuelven más sofisticadas mientras las fuerzas de Qin avanzan hacia nuevos territorios.', 200, TRUE, 13, 11, 5),
('Kingdom 14', '2023-12-28', 8.50, 100, '978-84-18776-17-5', 'https://i1.whakoom.com/large/3c/38/050b17d487cc4e009c2add0620dcd4a9.jpg', 'En medio de traiciones y alianzas cambiantes, Shin y sus compañeros luchan por mantener su posición en el campo de batalla.', 200, TRUE, 14, 11, 5),
('Kingdom 15', '2024-02-22', 8.50, 100, '978-84-18776-18-2', 'https://i1.whakoom.com/large/36/01/a6bbe7fd3ddd41fb92f0cfad7b92b601.jpg', 'La historia de la unificación de China continúa mientras nuevos desafíos y enemigos aparecen en el horizonte.', 200, TRUE, 15, 11, 5),
('Kingdom 16', '2024-01-25', 8.50, 100, '978-84-18776-20-5', 'https://i1.whakoom.com/large/2b/38/85752183acc24c0181c9a77e76742e6f.jpg', 'Shin enfrenta desafíos personales mientras lidera a sus tropas en una campaña crucial para la unificación de China.', 200, TRUE, 16, 11, 5),
('Kingdom 17', '2024-03-28', 8.50, 100, '978-84-18776-21-2', 'https://i1.whakoom.com/large/22/17/2fe2ec38b0b1481580eb9d698954c5b1.jpg', 'Las tácticas militares se vuelven más sofisticadas mientras las fuerzas de Qin avanzan hacia nuevos territorios.', 200, TRUE, 17, 11, 5),
('Kingdom 18', '2024-05-30', 8.50, 100, '978-84-18776-22-9', 'https://i1.whakoom.com/large/35/24/320431b87c5943f58f2b2c5f5209e264.jpg', 'En medio de traiciones y alianzas cambiantes, Shin y sus compañeros luchan por mantener su posición en el campo de batalla.', 200, TRUE, 18, 11, 5),
('Kingdom 19', '2024-07-25', 8.50, 100, '978-84-18776-23-6', 'https://i1.whakoom.com/large/04/05/d32f99f112064f7a899019387d818f8e.jpg', 'La historia de la unificación de China continúa mientras nuevos desafíos y enemigos aparecen en el horizonte.', 200, TRUE, 19, 11, 5),
('Kingdom 20', '2024-09-26', 8.50, 100, '978-84-18776-24-3', 'https://i1.whakoom.com/large/13/2f/18b3ebc94a55458ab138829c6624fee4.jpg', 'Shin lidera una expedición peligrosa, enfrentando enemigos y desafíos que lo llevan al límite de sus habilidades.', 200, TRUE, 20, 11, 5),
('Kingdom 21', '2024-11-28', 8.50, 100, '978-84-18776-25-0', 'https://i1.whakoom.com/large/06/1d/0a3a254f725947b7b9f99920a194ef26.jpg', 'Las batallas se intensifican mientras nuevos personajes entran en escena, cada uno con sus propios objetivos y lealtades.', 200, TRUE, 21, 11, 5),
('Kingdom 22', '2025-01-30', 8.50, 100, '978-84-18776-26-7', 'https://i1.whakoom.com/large/3c/31/5103c216dc43432ca516e4d6813d2358.jpg', 'En medio de intrigas políticas y traiciones, Shin se enfrenta a decisiones que podrían cambiar el curso de la historia.', 200, TRUE, 22, 11, 5),
('Kingdom 23', '2025-03-27', 8.50, 100, '978-84-18776-27-4', 'https://i1.whakoom.com/large/1a/2e/af6c7a29678348e5aad4cbb7c1eee478.jpg', 'Las estrategias militares se intensifican mientras Shin y sus aliados participan en campañas que definirán el destino de los reinos en guerra.', 200, TRUE, 23, 11, 5),
('Kingdom 24', '2025-05-29', 8.50, 100, '978-84-18776-28-1', 'https://i1.whakoom.com/large/24/07/930b08f5026c4c91a83ccd7053fb52ae.jpg', 'Shin y Hyou enfrentan nuevos desafíos mientras ascienden en el ejército de Qin, luchando en batallas épicas y forjando alianzas cruciales en su camino hacia la unificación de China.', 200, TRUE, 24, 11, 5),
('Kingdom 25', '2025-07-31', 8.50, 100, '978-84-18776-29-8', 'https://i1.whakoom.com/large/1e/1a/18291e1251184fa3b5c350f7b4139f1d.jpg', 'La historia nos traslada a la antigua China, donde Shin, un huérfano de guerra, sueña con convertirse en un gran general. Junto a su amigo Hyou, se ve inmerso en una serie de eventos que lo llevan a unirse al ejército y luchar por unificar los siete reinos en uno solo.', 200, TRUE, 25, 11, 5),
('Kingdom 26', '2025-09-25', 8.50, 100, '978-84-18776-30-4', 'https://i1.whakoom.com/large/1d/36/c74114e1a9574a03b0874c92aa7b2fce.jpg', 'Shin lidera a sus tropas en una campaña crucial, enfrentando desafíos que pondrán a prueba su liderazgo y determinación.', 200, TRUE, 26, 11, 5),
('Kingdom 27', '2025-11-27', 8.50, 100, '978-84-18776-31-1', 'https://i1.whakoom.com/large/3f/11/308fb209681149dc8091601e78416453.jpg', 'Las batallas se intensifican mientras Shin y sus aliados luchan por expandir el territorio de Qin, enfrentando a enemigos formidables.', 200, TRUE, 27, 11, 5),
('Kingdom 28', '2026-01-29', 8.50, 100, '978-84-18776-32-8', 'https://i1.whakoom.com/large/2f/3d/336408a2ea7a41a7815e859a01aea54a.jpg', 'Shin se encuentra en una situación límite mientras lucha por sobrevivir al juego y desvelar sus secretos.', 200, TRUE, 28, 11, 5),
('Kingdom 29', '2026-03-26', 8.50, 100, '978-84-18776-33-5', 'https://i1.whakoom.com/large/20/2b/7950405f1852477283b22bf9fc066e12.jpg', 'La estrategia final se pone en marcha, y los jugadores deben enfrentar sus propios demonios internos.', 200, TRUE, 29, 11, 5),
('Kingdom 30', '2026-05-28', 8.50, 100, '978-84-18776-34-2', 'https://i1.whakoom.com/large/18/09/87bacae433e14a4abea4dbd2cf739332.jpg', 'Los participantes descubren nuevos giros en el juego mientras luchan por mantener su humanidad.', 200, TRUE, 30, 11, 5),
('Soy quien amas en la sombra', '2022-10-28', 22.00, 100, '978-84-679-5929-1', 'https://m.media-amazon.com/images/I/61aZnDAUi7L.jpg', 'Una pintora llamada Ro se retira a una vieja casa en un pueblo pequeño con la esperanza de encontrar paz e inspiración, pero descubre que la musa que encuentra no es lo que esperaba.', 128, FALSE, NULL, 12, 2),
('Ultimate Spider-Man #1', '2024-05-02', 3.30, 100, '977-29-386-09006-00-1', 'https://www.zonanegativa.com/imagenes/2024/01/Ultimate-Spider-Man-001-2024-00000.jpg', 'Inicio de la nueva línea Ultimate con Peter Parker enfrentando su rol como héroe, esposo y padre.', 48, TRUE, 1, 8, 3),
('Ultimate Spider-Man #2', '2024-06-06', 3.30, 100, '977-29-386-09006-00-2', 'https://m.media-amazon.com/images/I/91OputKp6wL._UF1000,1000_QL80_.jpg', 'Spider-Man enfrenta a El Duende Verde mientras J. Jonah Jameson investiga al nuevo héroe de la ciudad.', 48, TRUE, 2, 8, 3),
('Ultimate Spider-Man #3', '2024-07-04', 3.30, 100, '977-29-386-09006-00-3', 'https://m.media-amazon.com/images/I/8148lJqJbpL._UF1000,1000_QL80_.jpg', 'La vida de Peter se complica con la aparición de nuevos héroes y amenazas en Nueva York.', 48, TRUE, 3, 8, 3),
('Ultimate Spider-Man #4', '2024-08-01', 3.30, 100, '977-29-386-09006-00-4', 'https://i1.whakoom.com/large/01/24/0c7cf375c39d40e6b3e4240046e1eac3.jpg', 'Los secretos de Peter afectan su vida personal y profesional mientras enfrenta nuevos desafíos.', 48, TRUE, 4, 8, 3),
('Ultimate Spider-Man #5', '2024-09-05', 3.30, 100, '977-29-386-09006-00-5', 'https://i1.whakoom.com/large/08/1e/6a87ef6cb13a40af8e9c888dc6a27fe4.jpg', 'La historia secreta de Harry Osborn y su conexión con El Duende Verde se revela.', 48, TRUE, 5, 8, 3),
('Ultimate Spider-Man #6', '2024-10-03', 3.30, 100, '977-29-386-09006-00-6', 'https://i1.whakoom.com/large/0f/1e/45e8c8eb1be042fc9dde46d6437b3ddd.jpg', 'Spider-Man enfrenta amenazas que ponen en riesgo su identidad y la seguridad de sus seres queridos.', 48, TRUE, 6, 8, 3),
('Ultimate Spider-Man #7', '2024-11-07', 3.30, 100, '977-29-386-09006-00-7', 'https://i1.whakoom.com/large/2b/21/2624cbb18cde476987dc0cd9e55688f1.jpg', 'Nuevos desafíos y enemigos ponen a prueba la determinación y habilidades de Spider-Man.', 48, TRUE, 7, 8, 3),
('Ultimate Spider-Man #8', '2024-12-05', 3.30, 100, '977-29-386-09006-00-8', 'https://i1.whakoom.com/large/38/19/206aa923562449f187c06c7acfee3e88.jpg', 'La familia Parker enfrenta desafíos durante las fiestas, mientras Peter lidia con cambios inesperados.', 48, TRUE, 8, 8, 3),
('Ultimate Spider-Man #9', '2025-01-09', 3.30, 100, '977-29-386-09006-00-9', 'https://i1.whakoom.com/large/1f/16/40d99fe4511e42e7954205fb88d967b2.jpg', 'Spider-Man enfrenta nuevos villanos y desafíos que amenazan la paz de Nueva York.', 48, TRUE, 9, 8, 3),
('Ultimate Spider-Man #10', '2025-02-06', 3.30, 100, '977-29-386-09006-00-10', 'https://i1.whakoom.com/large/3d/0f/d4b105808862408aaaf5fc747db678b6.jpg', 'Revelaciones impactantes sobre el pasado de Peter y su futuro como héroe.', 48, TRUE, 10, 8, 3),
('Ultimate Spider-Man #11', '2025-03-06', 3.30, 100, '977-29-386-09006-00-11', 'https://i1.whakoom.com/large/3d/01/fdd323b0176f4a65a5974d7bd1b551bc.jpg', 'La batalla contra un nuevo villano pone en riesgo la vida de Peter y sus seres queridos.', 48, TRUE, 11, 8, 3),
('Ultimate Spider-Man #12', '2025-04-03', 3.30, 100, '977-29-386-09006-00-12', 'https://cdn.marvel.com/u/prod/marvel/i/mg/6/40/676039abda516/clean.jpg', 'Conclusión del primer año de Spider-Man, con desafíos que redefinen su destino como héroe.', 48, TRUE, 12, 8, 3),
('Absolute Power', '2025-04-03', 7.60, 100, '978-84-1051-958-9', 'https://i1.whakoom.com/small/0d/28/fde46ef76096453981847d897aa48980.jpg', 'Una historia épica donde Amanda Waller roba los poderes de los héroes de DC, sumiendo al mundo en el caos. Los héroes, despojados de sus habilidades, luchan por sobrevivir y restaurar el orden.', 192, FALSE, NULL, 7, 3),
('Absolute Batman #1', '2025-04-03', 2.50, 50, '977308128600700001', 'https://comicsbarcelona.com/wp-content/uploads/2025/02/GkpAwa5WYAAAw91.jpg', 'Es uno de los héroes más icónicos héroes de DC, pero sin su mansión, sin su dinero, sin su mayordomo… ¡Lo que queda es el Caballero Oscuro en su versión Absolute! Prepárate para esta reinterpretación de la mitología de Batman y, también, de un viejo conocido, Alfred Pennyworth.', 48, TRUE, 1, 6, 3);


INSERT INTO roles (nombre) VALUES ('ADMIN'), ('USER');


INSERT INTO user(name,last_name,email,nick,password,active,role_id) VALUES ('Oliver', 'Garcia', '426@gmail.com', 'oli699', '$2a$12$wVJ4g3TO1AmAcV4cpr6LROmhb6B6yxqCVKPGgptnpy4CkGF5SYt4W', 1,1);
INSERT INTO user(name,last_name,email,nick,password,active,role_id) VALUES ('Juan', 'Pérez', 'juan.perez@example.com', 'juanp', '$2a$12$roFcBOy06rKwyhZJE9sAj.aECBgpuOiKnJoEV6c5Gy.4Ic3Bjjht6', 1,2);

INSERT INTO review(rating,review_text,user_id,comic_id) VALUES (5,'Batman es dios',1,3);
-- ----------------------------------------