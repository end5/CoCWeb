import { Dictionary, IDictionary } from 'Engine/Utilities/Dictionary';
import { Character } from './Character/Character';
import { generateUUID } from './Utilities/Uuid';
import { CharDict } from './CharDict';
import { ISerializable } from 'Engine/Utilities/ISerializable';

export interface ICharInfo {
    type: string;
}

class PartyDictionary implements ISerializable<IDictionary<IDictionary<ICharInfo>>> {
    // { partyUUID: { charUUID: { type: charType } } }
    private dictionary = new Dictionary<string, IDictionary<ICharInfo>>();

    /**
     * Adds newMembers to the char's party. If their is no party, a new one is created.
     * All existing parties between the newMembers are combined.
     * @param char Character
     * @param newMembers List of Characters
     */
    public addToParty(char: Character, ...newMembers: Character[]) {
        const party: IDictionary<ICharInfo> = {};
        const partyUUID = generateUUID();

        for (const newMember of [char].concat(newMembers)) {
            if (newMember.partyUUID) {
                const existingParty = this.dictionary.get(newMember.partyUUID);
                if (existingParty) {
                    for (const partyMemberUUID in existingParty)
                        party[partyMemberUUID] = existingParty[partyMemberUUID];
                }
            }
            if (!party[newMember.uuid])
                party[newMember.uuid] = { type: newMember.charType };
            if (newMember.partyUUID !== partyUUID)
                newMember.partyUUID = partyUUID;
        }
        this.dictionary.set(partyUUID, party);
    }

    /**
     * Returns specified char's party members, excluding the specified char, as an array of chars.
     * Returns empty array if their is no party.
     * @param char Character
     */
    public getMembers(char: Character): Character[] {
        if (!char.partyUUID) return [];

        const partyInfo = this.dictionary.get(char.partyUUID);
        if (!partyInfo) return [];

        return Object.keys(partyInfo).reduce((party: Character[], key) => {
            const member = CharDict.get(key);
            if (!member) {
                console.error("Error - Unknown character - UUID: " + key);
                delete partyInfo[key];
            }
            else if (member.uuid !== char.uuid)
                party.push(member);
            return party;
        }, []);
    }

    /**
     * Remove membersToRemove from the char's party.
     * @param char Character
     * @param membersToRemove List of Characters
     */
    public removeFromParty(char: Character, ...membersToRemove: Character[]) {
        if (!char.partyUUID) return;
        const partyInfo = this.dictionary.get(char.partyUUID);
        if (!partyInfo) return;

        for (const member of membersToRemove)
            delete partyInfo[member.uuid];
    }

    public serialize(): IDictionary<IDictionary<ICharInfo>> {
        return this.dictionary.serialize();
    }

    public deserialize(saveObject: IDictionary<IDictionary<ICharInfo>>): void {
        this.dictionary.deserialize(saveObject);
    }
}

export const PartyDict = new PartyDictionary();

// tslint:disable-next-line:no-string-literal
(window as any)["parties"] = PartyDict;
