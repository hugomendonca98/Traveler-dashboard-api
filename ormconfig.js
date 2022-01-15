module.exports = [
  {
    name: 'default',
    type: 'postgres',
    url: process.env.DATABASE_URL,
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
