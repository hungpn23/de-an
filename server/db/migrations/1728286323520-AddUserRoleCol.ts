import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserRoleCol1728286323520 implements MigrationInterface {
    name = 'AddUserRoleCol1728286323520'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`role\` varchar(255) NOT NULL DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
    }

}
