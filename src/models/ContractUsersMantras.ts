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

export class ContractUsersMantras extends Model<
  InferAttributes<ContractUsersMantras>,
  InferCreationAttributes<ContractUsersMantras>
> {
  declare id: CreationOptional<number>;
  declare userId: ForeignKey<User["id"]>;
  declare mantraId: ForeignKey<Mantra["id"]>;

  // Timestamps
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export function initContractUsersMantras() {
  ContractUsersMantras.init(
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
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: "contract_users_mantras",
      timestamps: true,
    }
  );
  return ContractUsersMantras;
}
