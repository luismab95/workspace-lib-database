import { DataSource } from "typeorm";
import { config } from "../environments/load-env";
import { Client } from "pg";
import {
  ScopeCondition,
  ScopeTable,
  MenuAction,
  Microservice,
  AdminAccount,
  ResourceAction,
  Resource,
  Permission,
  Scope,
  UserType,
  UserPermission,
  UserTypeLogin,
  User,
  Role,
  LoginAttempt,
  MenuRole,
  Menu,
  OtpUser,
  Parameter,
  UserRole,
  Entities,
  EndpointVersion,
  RecordEndpointEnv,
  Endpoint,
  EndpointEnv,
  Session,
  Module,
  Middleware,
} from "../../entities";

const {
  dbHost,
  dbPort,
  dbUsername,
  dbPassword,
  dbDatabase,
  dbSynchronize,
  dbLogging,
} = config.server;

const entities = [
  ScopeCondition,
  ScopeTable,
  MenuAction,
  Microservice,
  AdminAccount,
  Module,
  ResourceAction,
  Resource,
  Permission,
  Scope,
  UserType,
  UserPermission,
  UserTypeLogin,
  User,
  Role,
  LoginAttempt,
  MenuRole,
  Menu,
  OtpUser,
  Parameter,
  Session,
  UserRole,
  Entities,
  EndpointVersion,
  RecordEndpointEnv,
  Endpoint,
  EndpointEnv,
  Middleware,
];

export class Database {
  private static postgresDataSource: DataSource;

  public static async ensureSchemaExists() {
    const client = new Client({
      host: dbHost,
      port: Number(dbPort),
      user: dbUsername,
      password: dbPassword,
      database: dbDatabase,
    });

    if (dbSynchronize === "true") {
      await client.connect();
      await client.query(`CREATE SCHEMA IF NOT EXISTS security`);
      console.log(`Esquema security creado`);
      await client.end();
    }
  }

  public static async connect(): Promise<void> {
    try {
      await this.ensureSchemaExists();

      this.postgresDataSource = new DataSource({
        type: "postgres",
        host: dbHost,
        port: Number(dbPort),
        username: dbUsername,
        password: dbPassword,
        database: dbDatabase,
        entities,
        synchronize: dbSynchronize === "true",
        logging: dbLogging === "true",
      });

      if (!this.postgresDataSource.isInitialized) {
        await this.postgresDataSource.initialize();
        console.info("Conexión a la base de datos establecida");
      }
    } catch (error) {
      console.error("Error al conectar a la base de datos:", error);
      throw error;
    }
  }

  public static getConnection(): DataSource {
    if (!this.postgresDataSource) {
      throw new Error("La conexión a la base de datos no está establecida");
    }
    return this.postgresDataSource;
  }

  public static async disconnect(): Promise<void> {
    if (this.postgresDataSource) {
      await this.postgresDataSource.destroy();
      console.info("Conexión a la base de datos cerrada");
    }
  }
}
