import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddCityIdToDeposition1650075342765
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'deposition',
      new TableColumn({
        name: 'city_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'deposition',
      new TableForeignKey({
        name: 'cityID',
        columnNames: ['city_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'city',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('deposition', 'cityID');
    await queryRunner.dropColumn('deposition', 'city_id');
  }
}
