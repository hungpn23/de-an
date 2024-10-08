import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTablesWithRelations1728374676407 implements MigrationInterface {
    name = 'CreateTablesWithRelations1728374676407'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`address\` (\`id\` int NOT NULL AUTO_INCREMENT, \`address\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`pincode\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`notes\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cart\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`feature\` (\`id\` int NOT NULL AUTO_INCREMENT, \`image\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`cartId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_342497b574edb2309ec8c6b62a\` (\`cartId\`)`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_342497b574edb2309ec8c6b62a\` ON \`user\` (\`cartId\`)`);
        await queryRunner.query(`ALTER TABLE \`address\` ADD CONSTRAINT \`FK_d25f1ea79e282cc8a42bd616aa3\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_342497b574edb2309ec8c6b62aa\` FOREIGN KEY (\`cartId\`) REFERENCES \`cart\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_342497b574edb2309ec8c6b62aa\``);
        await queryRunner.query(`ALTER TABLE \`address\` DROP FOREIGN KEY \`FK_d25f1ea79e282cc8a42bd616aa3\``);
        await queryRunner.query(`DROP INDEX \`REL_342497b574edb2309ec8c6b62a\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_342497b574edb2309ec8c6b62a\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`cartId\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`DROP TABLE \`feature\``);
        await queryRunner.query(`DROP TABLE \`cart\``);
        await queryRunner.query(`DROP TABLE \`address\``);
    }

}
