import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTables1728574608249 implements MigrationInterface {
    name = 'AddTables1728574608249'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_342497b574edb2309ec8c6b62aa\``);
        await queryRunner.query(`DROP INDEX \`IDX_342497b574edb2309ec8c6b62a\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`REL_342497b574edb2309ec8c6b62a\` ON \`user\``);
        await queryRunner.query(`CREATE TABLE \`cart_item\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quantity\` int NOT NULL DEFAULT '0', \`productId\` int NULL, \`cartId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`cartId\``);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD UNIQUE INDEX \`IDX_756f53ab9466eb52a52619ee01\` (\`userId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_756f53ab9466eb52a52619ee01\` ON \`cart\` (\`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD CONSTRAINT \`FK_756f53ab9466eb52a52619ee019\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cart_item\` ADD CONSTRAINT \`FK_75db0de134fe0f9fe9e4591b7bf\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cart_item\` ADD CONSTRAINT \`FK_29e590514f9941296f3a2440d39\` FOREIGN KEY (\`cartId\`) REFERENCES \`cart\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart_item\` DROP FOREIGN KEY \`FK_29e590514f9941296f3a2440d39\``);
        await queryRunner.query(`ALTER TABLE \`cart_item\` DROP FOREIGN KEY \`FK_75db0de134fe0f9fe9e4591b7bf\``);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_756f53ab9466eb52a52619ee019\``);
        await queryRunner.query(`DROP INDEX \`REL_756f53ab9466eb52a52619ee01\` ON \`cart\``);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP INDEX \`IDX_756f53ab9466eb52a52619ee01\``);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`cartId\` int NULL`);
        await queryRunner.query(`DROP TABLE \`cart_item\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_342497b574edb2309ec8c6b62a\` ON \`user\` (\`cartId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_342497b574edb2309ec8c6b62a\` ON \`user\` (\`cartId\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_342497b574edb2309ec8c6b62aa\` FOREIGN KEY (\`cartId\`) REFERENCES \`cart\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
