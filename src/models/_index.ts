import { sequelize } from "./_connection";

import { initUser, User } from "./User";
import { initMantra, Mantra } from "./Mantra";
import { initUserMantraListen, UserMantraListen } from "./UserMantraListen";
import { initElevenLabsFiles, ElevenLabsFiles } from "./ElevenLabsFiles";

import { applyAssociations } from "./_associations";

export function initModels() {
  initUser();
  initMantra();
  initUserMantraListen();
  initElevenLabsFiles();

  applyAssociations();

  return {
    sequelize,
    User,
    Mantra,
    UserMantraListen,
    ElevenLabsFiles,
  };
}

export { sequelize, User, Mantra, UserMantraListen, ElevenLabsFiles };
