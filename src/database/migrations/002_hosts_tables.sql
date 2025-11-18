CREATE TABLE IF NOT EXISTS places (
    id VARCHAR(10) NOT NULL PRIMARY KEY,
    title VARCHAR(20) NOT NULL,
    description VARCHAR(200) NOT NULL,
    type VARCHAR(12) NOT NULL,
    region VARCHAR(50) NOT NULL,
    sigla VARCHAR(2) NOT NULL,
    city VARCHAR(50) NOT NULL,
    max_people INT NOT NULL,
    default_value DOUBLE NOT NULL,
    owner_id INT NOT NULL,
    lat VARCHAR(30) NOT NULL UNIQUE,
    lon VARCHAR(30) NOT NULL UNIQUE,
    available BOOLEAN NOT NULL DEFAULT TRUE  
);

CREATE TABLE IF NOT EXISTS reviews (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    place_id VARCHAR(10) NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    FOREIGN KEY (place_id) REFERENCES places(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS services (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    place_id VARCHAR(10) NOT NULL,
    type VARCHAR(30) NOT NULL  CHECK (type IN ('wifi', 'storage', 'kitchen', 'pool', 'cleaning', 'laundry', 'breakfast', 'air')),
    FOREIGN KEY (place_id) REFERENCES places(id) ON DELETE CASCADE,
    UNIQUE (place_id, type)
);

CREATE TABLE IF NOT EXISTS comments (
    id VARCHAR(10) NOT NULL UNIQUE PRIMARY KEY,
    place_id VARCHAR(10) NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    content VARCHAR(255) NOT NULL,  
    FOREIGN KEY (place_id) REFERENCES places(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS media_places(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    place_id VARCHAR(10) NOT NULL,
    url VARCHAR(300) NOT NULL,
    FOREIGN KEY (place_id) REFERENCES places(id) ON DELETE CASCADE
);