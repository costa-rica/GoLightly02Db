import { sequelize } from "./_connection";

import { initUser, User } from "./User";
import { initMeditation, Meditation } from "./Meditation";
import {
  initContractUsersMeditations,
  ContractUsersMeditations,
} from "./ContractUsersMeditations";
import {
  initContractUserMeditationListen,
  ContractUserMeditationListen,
} from "./ContractUserMeditationListen";
import { initElevenLabsFiles, ElevenLabsFiles } from "./ElevenLabsFiles";
import { initQueue, Queue } from "./Queue";
import { initSoundFiles, SoundFiles } from "./SoundFiles";
import {
  initContractMeditationsElevenLabsFiles,
  ContractMeditationsElevenLabsFiles,
} from "./ContractMeditationsElevenLabsFiles";
import {
  initContractMeditationsSoundFiles,
  ContractMeditationsSoundFiles,
} from "./ContractMeditationsSoundFiles";

import { applyAssociations } from "./_associations";

export function initModels() {
  initUser();
  initMeditation();
  initContractUsersMeditations();
  initContractUserMeditationListen();
  initElevenLabsFiles();
  initQueue();
  initSoundFiles();
  initContractMeditationsElevenLabsFiles();
  initContractMeditationsSoundFiles();

  applyAssociations();

  return {
    sequelize,
    User,
    Meditation,
    ContractUsersMeditations,
    ContractUserMeditationListen,
    ElevenLabsFiles,
    Queue,
    SoundFiles,
    ContractMeditationsElevenLabsFiles,
    ContractMeditationsSoundFiles,
  };
}

export {
  sequelize,
  User,
  Meditation,
  ContractUsersMeditations,
  ContractUserMeditationListen,
  ElevenLabsFiles,
  Queue,
  SoundFiles,
  ContractMeditationsElevenLabsFiles,
  ContractMeditationsSoundFiles,
};
