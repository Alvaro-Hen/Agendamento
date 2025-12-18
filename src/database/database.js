import { open } from "sqlite";
import sqlite3 from "sqlite3";

export const dbPromisse = open ({
    filename: "./database/filmes.db",
    driver: sqlite3.Database,
});
