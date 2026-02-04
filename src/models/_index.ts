import { sequelize } from "./_connection";

import { initUser, User } from "./User";
import { initMantra, Mantra } from "./Mantra";
import {
  initContractUsersMantras,
  ContractUsersMantras,
} from "./ContractUsersMantras";
import {
  initContractUserMantraListen,
  ContractUserMantraListen,
} from "./ContractUserMantraListen";
import { initElevenLabsFiles, ElevenLabsFiles } from "./ElevenLabsFiles";
import { initQueue, Queue } from "./Queue";
import { initSoundFiles, SoundFiles } from "./SoundFiles";
import {
  initContractMantrasElevenLabsFiles,
  ContractMantrasElevenLabsFiles,
} from "./ContractMantrasElevenLabsFiles";
import {
  initContractMantrasSoundFiles,
  ContractMantrasSoundFiles,
} from "./ContractMantrasSoundFiles";

import { applyAssociations } from "./_associations";

export function initModels() {
  initUser();
  initMantra();
  initContractUsersMantras();
  initContractUserMantraListen();
  initElevenLabsFiles();
  initQueue();
  initSoundFiles();
  initContractMantrasElevenLabsFiles();
  initContractMantrasSoundFiles();

  applyAssociations();

  return {
    sequelize,
    User,
    Mantra,
    ContractUsersMantras,
    ContractUserMantraListen,
    ElevenLabsFiles,
    Queue,
    SoundFiles,
    ContractMantrasElevenLabsFiles,
    ContractMantrasSoundFiles,
  };
}

export {
  sequelize,
  User,
  Mantra,
  ContractUsersMantras,
  ContractUserMantraListen,
  ElevenLabsFiles,
  Queue,
  SoundFiles,
  ContractMantrasElevenLabsFiles,
  ContractMantrasSoundFiles,
};
