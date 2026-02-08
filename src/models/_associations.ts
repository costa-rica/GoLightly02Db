import { User } from "./User";
import { Meditation } from "./Meditation";
import { ContractUsersMeditations } from "./ContractUsersMeditations";
import { ContractUserMeditationListen } from "./ContractUserMeditationListen";
import { Queue } from "./Queue";
import { ElevenLabsFiles } from "./ElevenLabsFiles";
import { ContractMeditationsElevenLabsFiles } from "./ContractMeditationsElevenLabsFiles";
import { SoundFiles } from "./SoundFiles";
import { ContractMeditationsSoundFiles } from "./ContractMeditationsSoundFiles";

export function applyAssociations() {
  // User ↔ Meditation (many-to-many through ContractUsersMeditations)
  User.belongsToMany(Meditation, {
    through: ContractUsersMeditations,
    foreignKey: "userId",
    otherKey: "mantraId",
    as: "mantras",
  });

  Meditation.belongsToMany(User, {
    through: ContractUsersMeditations,
    foreignKey: "mantraId",
    otherKey: "userId",
    as: "users",
  });

  // ContractUsersMeditations associations
  ContractUsersMeditations.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

  ContractUsersMeditations.belongsTo(Meditation, {
    foreignKey: "mantraId",
    as: "meditation",
  });

  User.hasMany(ContractUsersMeditations, {
    foreignKey: "userId",
    as: "userMeditations",
  });

  Meditation.hasMany(ContractUsersMeditations, {
    foreignKey: "mantraId",
    as: "contractUsersMeditations",
  });

  // ContractUserMeditationListen associations
  ContractUserMeditationListen.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

  ContractUserMeditationListen.belongsTo(Meditation, {
    foreignKey: "mantraId",
    as: "meditation",
  });

  User.hasMany(ContractUserMeditationListen, {
    foreignKey: "userId",
    as: "mantraListens",
  });

  Meditation.hasMany(ContractUserMeditationListen, {
    foreignKey: "mantraId",
    as: "contractUserMeditationListenCount",
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

  // Meditation ↔ ElevenLabsFiles (many-to-many through ContractMeditationsElevenLabsFiles)
  Meditation.belongsToMany(ElevenLabsFiles, {
    through: ContractMeditationsElevenLabsFiles,
    foreignKey: "mantraId",
    otherKey: "elevenLabsFilesId",
    as: "elevenLabsFiles",
  });

  ElevenLabsFiles.belongsToMany(Meditation, {
    through: ContractMeditationsElevenLabsFiles,
    foreignKey: "elevenLabsFilesId",
    otherKey: "mantraId",
    as: "mantras",
  });

  // ContractMeditationsElevenLabsFiles associations
  ContractMeditationsElevenLabsFiles.belongsTo(Meditation, {
    foreignKey: "mantraId",
    as: "meditation",
  });

  ContractMeditationsElevenLabsFiles.belongsTo(ElevenLabsFiles, {
    foreignKey: "elevenLabsFilesId",
    as: "elevenLabsFile",
  });

  // Meditation ↔ SoundFiles (many-to-many through ContractMeditationsSoundFiles)
  Meditation.belongsToMany(SoundFiles, {
    through: ContractMeditationsSoundFiles,
    foreignKey: "mantraId",
    otherKey: "soundFilesId",
    as: "soundFiles",
  });

  SoundFiles.belongsToMany(Meditation, {
    through: ContractMeditationsSoundFiles,
    foreignKey: "soundFilesId",
    otherKey: "mantraId",
    as: "mantras",
  });

  // ContractMeditationsSoundFiles associations
  ContractMeditationsSoundFiles.belongsTo(Meditation, {
    foreignKey: "mantraId",
    as: "meditation",
  });

  ContractMeditationsSoundFiles.belongsTo(SoundFiles, {
    foreignKey: "soundFilesId",
    as: "soundFile",
  });
}
