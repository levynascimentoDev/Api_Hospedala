CREATE TABLE IF NOT EXISTS sessions (
    id VARCHAR(40) NOT NULL PRIMARY KEY,
    refresh_token_hash VARCHAR(100) NOT NULL,
    user_id INT NOT NULL,
    expire_at DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);