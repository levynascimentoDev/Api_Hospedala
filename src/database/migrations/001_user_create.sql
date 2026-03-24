
CREATE TABLE IF NOT EXISTS users(
    id INT NOT NULL PRIMARY KEY,
    given_name VARCHAR(50) NOT NULL,
    family_name VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    icon VARCHAR(300),
    birth_date DATE NOT NULL,
    role ENUM('host', 'user', 'admin') NOT NULL
);