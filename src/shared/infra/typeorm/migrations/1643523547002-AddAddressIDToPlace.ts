import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddAddressIDToPlace1643523547002
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'place',
      new TableColumn({
        name: 'address_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'place',
      new TableForeignKey({
        name: 'addressID',
        columnNames: ['address_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'address',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('place', 'addressID');
    await queryRunner.dropColumn('place', 'address_id');
  }
}
