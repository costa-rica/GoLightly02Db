import { User } from "./User";
import { Mantra } from "./Mantra";
import { ContractUsersMantras } from "./ContractUsersMantras";
import { ContractUserMantraListen } from "./ContractUserMantraListen";
import { Queue } from "./Queue";
import { ElevenLabsFiles } from "./ElevenLabsFiles";
import { ContractMantrasElevenLabsFiles } from "./ContractMantrasElevenLabsFiles";
import { SoundFiles } from "./SoundFiles";
import { ContractMantrasSoundFiles } from "./ContractMantrasSoundFiles";

export function applyAssociations() {
  // User ↔ Mantra (many-to-many through ContractUsersMantras)
  User.belongsToMany(Mantra, {
    through: ContractUsersMantras,
    foreignKey: "userId",
    otherKey: "mantraId",
    as: "mantras",
  });

  Mantra.belongsToMany(User, {
    through: ContractUsersMantras,
    foreignKey: "mantraId",
    otherKey: "userId",
    as: "users",
  });

  // ContractUsersMantras associations
  ContractUsersMantras.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

  ContractUsersMantras.belongsTo(Mantra, {
    foreignKey: "mantraId",
    as: "mantra",
  });

  // ContractUserMantraListen associations
  ContractUserMantraListen.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

  ContractUserMantraListen.belongsTo(Mantra, {
    foreignKey: "mantraId",
    as: "mantra",
  });

  User.hasMany(ContractUserMantraListen, {
    foreignKey: "userId",
    as: "mantraListens",
  });

  Mantra.hasMany(ContractUserMantraListen, {
    foreignKey: "mantraId",
    as: "contractUserMantraListenCount",
  });

  // Queue associations
  Queue.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

  User.hasMany(Queue, {
    foreignKey: "userId",
    as: "queueItems",
  });

  // Mantra ↔ ElevenLabsFiles (many-to-many through ContractMantrasElevenLabsFiles)
  Mantra.belongsToMany(ElevenLabsFiles, {
    through: ContractMantrasElevenLabsFiles,
    foreignKey: "mantraId",
    otherKey: "elevenLabsFilesId",
    as: "elevenLabsFiles",
  });

  ElevenLabsFiles.belongsToMany(Mantra, {
    through: ContractMantrasElevenLabsFiles,
    foreignKey: "elevenLabsFilesId",
    otherKey: "mantraId",
    as: "mantras",
  });

  // ContractMantrasElevenLabsFiles associations
  ContractMantrasElevenLabsFiles.belongsTo(Mantra, {
    foreignKey: "mantraId",
    as: "mantra",
  });

  ContractMantrasElevenLabsFiles.belongsTo(ElevenLabsFiles, {
    foreignKey: "elevenLabsFilesId",
    as: "elevenLabsFile",
  });

  // Mantra ↔ SoundFiles (many-to-many through ContractMantrasSoundFiles)
  Mantra.belongsToMany(SoundFiles, {
    through: ContractMantrasSoundFiles,
    foreignKey: "mantraId",
    otherKey: "soundFilesId",
    as: "soundFiles",
  });

  SoundFiles.belongsToMany(Mantra, {
    through: ContractMantrasSoundFiles,
    foreignKey: "soundFilesId",
    otherKey: "mantraId",
    as: "mantras",
  });

  // ContractMantrasSoundFiles associations
  ContractMantrasSoundFiles.belongsTo(Mantra, {
    foreignKey: "mantraId",
    as: "mantra",
  });

  ContractMantrasSoundFiles.belongsTo(SoundFiles, {
    foreignKey: "soundFilesId",
    as: "soundFile",
  });
}
