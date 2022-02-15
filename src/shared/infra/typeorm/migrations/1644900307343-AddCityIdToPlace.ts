import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddCityIdToPlace1644900307343
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'place',
      new TableColumn({
        name: 'city_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'place',
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
    await queryRunner.dropForeignKey('place', 'cityID');
    await queryRunner.dropColumn('place', 'city_id');
  }
}
