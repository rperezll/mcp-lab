import * as sqlite3 from "sqlite3";
import { promisify } from "util";
import path from "path";

export const getDb = () => {
  const dbPath = path.resolve(__dirname, "db/users.db");
  const db = new sqlite3.Database(dbPath);
  return {
    all: promisify<string, any[]>(db.all.bind(db)),
    close: promisify(db.close.bind(db)),
  };
};
