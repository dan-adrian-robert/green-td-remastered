import {AMBIENT_SOUND_TYPE, ENEMY_SOUND_TYPE, SPELL_SOUND_TYPE, TOWERS_SOUNDS_TYPE, UI_SOUNDS_TYPE} from "./types";

export enum SOUND_FOLDER_PATHS {
    AMBIENT= 'AMBIENT',
    ENEMIES= 'ENEMIES',
    SPELLS= 'SPELLS',
    TOWERS= 'TOWERS',
    UI= 'UI',
}

export type GAME_SOUND_FORMAT = {
    [SOUND_FOLDER_PATHS.AMBIENT]: AMBIENT_SOUND_TYPE
    [SOUND_FOLDER_PATHS.ENEMIES]: ENEMY_SOUND_TYPE,
    [SOUND_FOLDER_PATHS.SPELLS]: SPELL_SOUND_TYPE,
    [SOUND_FOLDER_PATHS.TOWERS]: TOWERS_SOUNDS_TYPE,
    [SOUND_FOLDER_PATHS.UI]: UI_SOUNDS_TYPE
}