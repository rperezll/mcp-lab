const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "users.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error al conectar con la base de datos:", err.message);
    return;
  }
  console.info("Base de datos creada y conectada.");
});

db.serialize(() => {
  db.run(`DROP TABLE IF EXISTS users`);
  db.run(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age INTEGER,
      subscribedPlan TEXT,
      hasPaid BOOLEAN,
      fitnessGoal TEXT
    )
  `);

  const stmt = db.prepare(`
    INSERT INTO users (name, age, subscribedPlan, hasPaid, fitnessGoal)
    VALUES (?, ?, ?, ?, ?)
  `);

  const users = [
    ["María Gómez", 28, "Full", 1, "Tone legs and glutes"],
    ["Carlos Pérez", 35, "Basic", 0, "Lose weight"],
    ["Lucía Martínez", 42, "Premium", 1, "Improve cardiovascular endurance"],
    ["Andrés Rojas", 24, "Full", 0, "Gain muscle mass"],
    ["Sofía Navarro", 31, "Basic", 1, "Reduce stress with yoga"],
    ["Jorge Fernández", 47, "Premium", 1, "Prepare for triathlon"],
    ["Valentina Ruiz", 22, "Full", 1, "Tone abs"],
    ["Gabriel Mendoza", 38, "Basic", 0, "Post-injury recovery"],
    ["Andrés Ramos", 20, "Basic", 0, "Make friends and socialize"],
  ];

  for (const user of users) {
    stmt.run(user);
  }

  stmt.finalize();
  console.info("Datos insertados en la tabla users.");
});

db.close((err) => {
  if (err) {
    console.error("Error al cerrar la base de datos:", err.message);
    return;
  }
  console.info("Conexión cerrada.");
});
