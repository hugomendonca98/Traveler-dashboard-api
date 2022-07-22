module.exports = [
  {
    type: "postgres",
    ssl: true,
    extra: {
      ssl: { rejectUnauthorized: false }
    },
    url: process.env.DATABASE_URL,
    entities: [
      `./${process.env.ROOT_DIR}/modules/**/infra/typeorm/entities/*.${process.env.FILE_TYPE}`,
    ],
    migrations: [
      `./${process.env.ROOT_DIR}/shared/infra/typeorm/migrations/*.${process.env.FILE_TYPE}`,
    ],
    cli: {
      migrationsDir: `./src/shared/infra/typeorm/migrations`,
    },
  },
];
