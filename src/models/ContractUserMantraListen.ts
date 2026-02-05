import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  ForeignKey,
} from "sequelize";
import { sequelize } from "./_connection";
import { User } from "./User";
import { Mantra } from "./Mantra";

export class ContractUserMantraListen extends Model<
  InferAttributes<ContractUserMantraListen>,
  InferCreationAttributes<ContractUserMantraListen>
> {
  declare id: CreationOptional<number>;
  declare userId: ForeignKey<User["id"]>;
  declare mantraId: ForeignKey<Mantra["id"]>;
  declare listenCount: number;
  declare favorite: CreationOptional<boolean>;

  // Timestamps
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export function initContractUserMantraListen() {
  ContractUserMantraListen.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      mantraId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "mantras",
          key: "id",
        },
      },
      listenCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      favorite: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: "contract_user_mantra_listens",
      timestamps: true,
    },
  );
  return ContractUserMantraListen;
}
