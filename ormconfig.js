module.exports = [
  {
    name: "default",
    type: "postgres",
    ssl: true,
    extra: {
      ssl: { rejectUnauthorized: false }
    },
    url: process.env.DATABASE_URL,
    entities: [
      `./${process.env.ROOT_DIR}/modules/**/infra/typeorm/entities/*.{ts, js}`,
    ],
    migrations: [
      `./${process.env.ROOT_DIR}/shared/infra/typeorm/migrations/*.{ts, js}`,
    ],
    cli: {
      migrationsDir: `./src/shared/infra/typeorm/migrations`,
    },
  },
];
