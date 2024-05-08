CREATE TABLE roles (
    id INT PRIMARY KEY,
    display_name VARCHAR,
    name VARCHAR,
    description VARCHAR
);

CREATE TABLE users (
    id INT PRIMARY KEY,
    username VARCHAR,
    name VARCHAR,
    surname VARCHAR,
    password VARCHAR,
    role INT,
    FOREIGN KEY (role) REFERENCES roles(id)
);

CREATE TABLE plug_types (
    id INT PRIMARY KEY,
    type VARCHAR
);

CREATE TABLE localizations (
    id INT PRIMARY KEY,
    display_name VARCHAR,
    street VARCHAR,
    city VARCHAR,
    postal_code VARCHAR,
    GPS_coord POINT,
    res_start_date TIMESTAMP,
    res_end_date TIMESTAMP,
    isActive BOOLEAN
);

CREATE TABLE localization_plugType (
    id_loc INT,
    id_plug INT,
    PRIMARY KEY (id_loc, id_plug),
    FOREIGN KEY (id_loc) REFERENCES localizations(id),
    FOREIGN KEY (id_plug) REFERENCES plug_types(id)
);

CREATE TABLE reservation (
    id INT PRIMARY KEY,
    localization_id INT,
    user_id INT,
    res_start_time TIMESTAMP,
    res_end_time TIMESTAMP,
    calc_price DECIMAL,
    FOREIGN KEY (localization_id) REFERENCES localizations(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE users_past_reservations (
    id_res INT,
    id_user INT,
    PRIMARY KEY (id_res, id_user),
    FOREIGN KEY (id_res) REFERENCES reservation(id),
    FOREIGN KEY (id_user) REFERENCES users(id)
);
