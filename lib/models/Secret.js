const pool = require('../utils/pool.js');

module.exports = class Secret {
  id;
  title;
  userId;
  description;
  createdAt;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.description = row.description;
    this.userId = row.user_id;
    this.createdAt = row.created_at;
  }

  static async insert({ title, userId, description }) {
    const { rows } = await pool.query(
      `INSERT INTO secrets(user_id, title, description) VALUES($1, $2, $3) RETURNING *`,
      [userId, title, description]
    );
    return new Secret(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(`SELECT * FROM secrets`);
    return rows.map((row) => new Secret(row));
  }
};
