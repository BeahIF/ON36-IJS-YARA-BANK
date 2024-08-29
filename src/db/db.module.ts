import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClienteModule } from "src/cliente/cliente.module";

@Module({
    imports:[]
})
export class DbModule{}