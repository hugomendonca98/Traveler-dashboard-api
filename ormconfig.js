module.exports = [
  {
    name: "default",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "h27041998",
    database: "postgres",
    entities: [
      `./${process.env.ROOT_DIR}/modules/**/infra/typeorm/entities/*.{ts, js}`,
    ],
    migrations: [
      `./${process.env.ROOT_DIR}/shared/infra/typeorm/migrations/*.{ts, js}`,
    ],
    cli: {
      migrationsDir: `./${process.env.ROOT_DIR}/shared/infra/typeorm/migrations`,
    },
  },
];
