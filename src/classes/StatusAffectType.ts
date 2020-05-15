import { CocSettings } from "./CoC_Settings";

/**
 * Created by aimozg on 31.01.14.
 */

export class StatusAffectType {
    private static STATUSAFFECT_LIBRARY: Record<string, any> = {};

    public static lookupStatusAffect(id: string): StatusAffectType {
        return StatusAffectType.STATUSAFFECT_LIBRARY[id];
    }

    public static getStatusAffectLibrary(): Record<string, any> {
        return StatusAffectType.STATUSAFFECT_LIBRARY;
    }

    private _id: string;

    /**
     * Unique perk id, should be kept in future game versions
     */
    public get id(): string {
        return this._id;
    }

    public constructor(id: string) {
        this._id = id;
        if (StatusAffectType.STATUSAFFECT_LIBRARY[id] != undefined) {
            CocSettings.error(`Duplicate status affect ${id}`);
        }
        StatusAffectType.STATUSAFFECT_LIBRARY[id] = this;
    }

    public toString(): string {
        return `"${this._id}"`;
    }
}
