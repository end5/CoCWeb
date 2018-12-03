import { Gender } from './Character/Body/GenderIdentity';
import { Time } from './Utilities/Time';
import { ISettings, Settings } from './Settings';
import { Character, ICharacter } from './Character/Character';
import { CharConstructorLib } from './Character/CharConstructorLib';
import { CharDict } from './CharDict';
import { Flags } from './Flags';
import { attachCharToUI } from './ScreenDisplay';
import { MainScreen } from '../Page/MainScreen';
import { CombatManager } from './Combat/CombatManager';
import { IDictionary } from '../Engine/Utilities/Dictionary';
import { PartyDict, ICharInfo } from './PartyDict';

export interface SaveFile {
    name: string;
    days: number;
    hour: number;
    gender: Gender;
    notes: string;
    user: {
        activeChar: string,
        chars: IDictionary<ICharacter>,
        parties: IDictionary<IDictionary<ICharInfo>>,
        settings: ISettings,
        flags: IDictionary<object>
    };
}

let lastSave: SaveFile;

export function generateSave(notes?: string): SaveFile {
    if (!CharDict.player) throw new Error('Tried to save without a character');
    const player = CharDict.player;
    lastSave = {
        name: player.desc.name,
        days: Time.day,
        hour: Time.hour,
        gender: player.gender,
        notes: notes ? notes : (lastSave && lastSave.notes ? lastSave.notes : ""),
        user: {
            activeChar: CharDict.player.uuid,
            chars: CharDict.serialize(),
            parties: PartyDict.serialize(),
            settings: Settings.serialize(),
            flags: Flags.serialize(),
        }
    };
    return lastSave;
}

export function loadFromSave(save: SaveFile) {
    CombatManager.encounter = undefined;
    for (const charKey of Object.keys(save.user.chars)) {
        const charConstr = CharConstructorLib.get((save.user.chars[charKey] as ICharacter).type);
        if (charConstr) {
            const char: Character = new charConstr();
            if (char.deserialize)
                char.deserialize(save.user.chars[charKey]);
            CharDict.set(charKey, char);
        }
    }
    const player = CharDict.get(save.user.activeChar);
    if (!player) throw new Error('Player does not exist');
    CharDict.player = player;

    attachCharToUI(player);
    MainScreen.statsPanel.show();

    Settings.deserialize(save.user.settings);
    Flags.deserialize(save.user.flags);
    Time.day = save.days;
    Time.hour = save.hour;
    lastSave = save;
}
