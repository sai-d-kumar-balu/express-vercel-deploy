const db = require('../config/db');

const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name        VARCHAR(100)  NOT NULL,
    email       VARCHAR(150)  NOT NULL UNIQUE,
    password    VARCHAR(255)  NOT NULL,
    created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
  );
`;

(async () => {
    try {
        await db.promise().query(createUsersTable);
        console.log('✅  users table created (or already exists).');
    } catch (err) {
        console.error('❌  Error creating table:', err);
    } finally {
        db.end();
        process.exit();
    }
})();
