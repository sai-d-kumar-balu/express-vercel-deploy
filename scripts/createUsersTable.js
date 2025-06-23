const db = require('../config/db');

// ---------- 1) users table ----------
const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id          INT PRIMARY KEY AUTO_INCREMENT,
    name        VARCHAR(100)  NOT NULL,
    email       VARCHAR(150)  NOT NULL UNIQUE,
    password    VARCHAR(255)  NOT NULL,
    created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
  );
`;

// ---------- 2) posts table ----------
const createPostsTable = `
  CREATE TABLE IF NOT EXISTS posts (
    id          INT PRIMARY KEY AUTO_INCREMENT,
    user_id     INT          NOT NULL,
    title       VARCHAR(200) NOT NULL,
    body        TEXT         NOT NULL,
    created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`;

(async () => {
  try {
    // Run in order—users first, posts second
    await db.promise().query(createUsersTable);
    console.log('✅ users table created (or already exists).');

    await db.promise().query(createPostsTable);
    console.log('✅ posts table created (or already exists).');

  } catch (err) {
    console.error('❌ Error creating tables:', err);
  } finally {
    db.end();
    process.exit();
  }
})();
