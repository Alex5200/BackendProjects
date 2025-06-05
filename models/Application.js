const db = require('../database');

class Application {
  static create(data, callback) {
    const { name, email, phone, message } = data;
    const sql = `
      INSERT INTO applications (name, email, phone, message) 
      VALUES (?, ?, ?, ?)
    `;
    
    db.run(sql, [name, email, phone, message], function(err) {
      callback(err, { id: this.lastID });
    });
  }

  // Дополнительные методы (getAll, getById и т.д.)
}

module.exports = Application;