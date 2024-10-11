import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserCartTables1728606140833 implements MigrationInterface {
    name = 'UpdateUserCartTables1728606140833'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_756f53ab9466eb52a52619ee019\``);
        await queryRunner.query(`DROP INDEX \`IDX_756f53ab9466eb52a52619ee01\` ON \`cart\``);
        await queryRunner.query(`DROP INDEX \`REL_756f53ab9466eb52a52619ee01\` ON \`cart\``);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`cartId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_342497b574edb2309ec8c6b62a\` (\`cartId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_342497b574edb2309ec8c6b62a\` ON \`user\` (\`cartId\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_342497b574edb2309ec8c6b62aa\` FOREIGN KEY (\`cartId\`) REFERENCES \`cart\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_342497b574edb2309ec8c6b62aa\``);
        await queryRunner.query(`DROP INDEX \`REL_342497b574edb2309ec8c6b62a\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_342497b574edb2309ec8c6b62a\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`cartId\``);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD \`userId\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_756f53ab9466eb52a52619ee01\` ON \`cart\` (\`userId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_756f53ab9466eb52a52619ee01\` ON \`cart\` (\`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD CONSTRAINT \`FK_756f53ab9466eb52a52619ee019\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
