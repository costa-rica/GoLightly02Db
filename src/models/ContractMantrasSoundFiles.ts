import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from "sequelize";
import { sequelize } from "./_connection";
import { Mantra } from "./Mantra";
import { SoundFiles } from "./SoundFiles";

export class ContractMantrasSoundFiles extends Model<
  InferAttributes<ContractMantrasSoundFiles>,
  InferCreationAttributes<ContractMantrasSoundFiles>
> {
  declare id: CreationOptional<number>;
  declare mantraId: ForeignKey<Mantra["id"]>;
  declare soundFilesId: ForeignKey<SoundFiles["id"]>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export function initContractMantrasSoundFiles() {
  ContractMantrasSoundFiles.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      mantraId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "mantra_id",
        references: {
          model: "mantras",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      soundFilesId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "sound_files_id",
        references: {
          model: "sound_files",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "updated_at",
      },
    },
    {
      sequelize,
      tableName: "contract_mantras_sound_files",
      timestamps: true,
      underscored: true,
    },
  );
}
