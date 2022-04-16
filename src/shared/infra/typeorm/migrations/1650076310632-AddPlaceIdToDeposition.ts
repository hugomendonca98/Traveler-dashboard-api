import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddPlaceIdToDeposition1650076310632
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'deposition',
      new TableColumn({
        name: 'place_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'deposition',
      new TableForeignKey({
        name: 'placeID',
        columnNames: ['place_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'place',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('deposition', 'placeID');
    await queryRunner.dropColumn('deposition', 'place_id');
  }
}
