import { pgEnum } from "drizzle-orm/pg-core";

export const dbDialectEnum = pgEnum("db_dialect", ["postgres", "mysql"]);
