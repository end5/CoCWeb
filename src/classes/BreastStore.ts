import { trace } from "../console";
import { Appearance } from "./Appearance";
import { CoC } from "./CoC";
import { Utils } from "./internals/Utils";
import { SaveAwareInterface } from "./SaveAwareInterface";

export class BreastStore extends Utils implements SaveAwareInterface {
    private static MAX_FLAG_VALUE = 2999;
    private static BREAST_STORE_VERSION_1 = "1";
    private static LACTATION_BOOST: any[] = [0, 0, 2, 3, 6, 9, 17]; // Disabled, None, Light, Moderate, Strong, Heavy, Epic

    public static LACTATION_DISABLED = 0;
    public static LACTATION_NONE = 1; // Full == (>= 50), Overfull == (>= 60 + 5 * _lactationLevel), Overload == (>= 60 + 20 * _lactationLevel)
    public static LACTATION_LIGHT = 2; // Full after 25 hours, overfull after 35 hours, overloaded after 50 hours
    public static LACTATION_MODERATE = 3; // Full after 17 hours, overfull after 25 hours, overloaded after 40 hours
    public static LACTATION_STRONG = 4; // Full after  9 hours, overfull after 15 hours, overloaded after 30 hours
    public static LACTATION_HEAVY = 5; // Full after  6 hours, overfull after 12 hours, overloaded after 27 hours
    public static LACTATION_EPIC = 6; // Full after  3 hours, overfull after  9 hours, overloaded after 24 hours

    private _breastFlag: number;
    private _cupSize = 0;
    private _fullness = 0; // How much milk the breasts currently hold - use milkQuantity to decide how much milk is produced in a scene
    // The milkIsFull and milkIsOverflowing functions let you know how much the NPC wants to be milked
    private _lactation = 0; // How fast the breasts refill with milk
    private _nippleLength = 0;
    private _timesMilked = 0; // How many times has this NPC been milked - only used internally
    private _rows = 0; // Number of rows of breasts. All assumed to be the same size

    public preventLactationIncrease = 0; // Control the points at which the lactation stops increasing or decreasing
    public preventLactationDecrease = 0;

    public constructor(breastFlag: number) {
        super();
        this._breastFlag = breastFlag;
        if (this._breastFlag < 1 || this._breastFlag > BreastStore.MAX_FLAG_VALUE)
            trace(`Error: BreastStore created with invalid flag value. BreastStore(${breastFlag})`);
    }

    // Implementation of SaveAwareInterface
    public updateAfterLoad(game: CoC): void {
        if (this._breastFlag < 1 || this._breastFlag > BreastStore.MAX_FLAG_VALUE) return;
        const flagData: any[] = String(game.flags[this._breastFlag]).split("^");
        if (flagData.length < 9) {
            // Loading from a file that doesn't contain appropriate save data.
            // Values will either have to be assigned in Saves.unFuckSave() or by the first encounter with this NPC
            return;
        }
        // For now there's no need to check the version. If this class is ever updated to save more the version will become useful.
        this.rows = Math.floor(flagData[1]);
        this.cupSize = Math.floor(flagData[2]);
        this.lactationLevel = Math.floor(flagData[3]);
        this.nippleLength = Number(flagData[4]);
        this._fullness = Math.floor(flagData[5]);
        this._timesMilked = Math.floor(flagData[6]);
        this.preventLactationIncrease = Math.floor(flagData[7]);
        this.preventLactationDecrease = Math.floor(flagData[8]);
    }

    public updateBeforeSave(game: CoC): void {
        if (this._breastFlag < 1 || this._breastFlag > BreastStore.MAX_FLAG_VALUE) return;
        game.flags[
            this._breastFlag
        ] = `${BreastStore.BREAST_STORE_VERSION_1}^${this.rows}^${this.cupSize}^${this.lactationLevel}^${this.nippleLength}^${this._fullness}^${this._timesMilked}^${this.preventLactationIncrease}^${this.preventLactationDecrease}`;
    }
    // End of Interface Implementation

    public static breastDescript(size: number, lactation = 0): string {
        if (size < 1) return "flat breasts";
        let descript: string = BreastStore.rand(2) == 0 ? Appearance.breastSize(size) : ""; // Add a description of the breast size 50% of the time
        switch (BreastStore.rand(10)) {
            case 1:
                if (lactation > 2) return `${descript}milk-udders`;
                break;
            case 2:
                if (lactation > 1.5) descript += "milky ";
                if (size > 4) return `${descript}tits`;
                break;
            case 4:
            case 5:
            case 6:
                return `${descript}tits`;
            case 7:
                if (lactation >= 2.5) return `${descript}udders`;
                if (lactation >= 1) descript += "milk ";
                return `${descript}jugs`;
            case 8:
                if (size > 6) return `${descript}love-pillows`;
                return `${descript}boobs`;
            case 9:
                if (size > 6) return `${descript}tits`;
            default:
        }
        return `${descript}breasts`;
    }

    public get cupSize(): number {
        return this._cupSize;
    }

    public set cupSize(value: number) {
        if (value < CoC.BREAST_CUP_FLAT) value = CoC.BREAST_CUP_FLAT;
        if (value > CoC.BREAST_CUP_ZZZ_LARGE) value = CoC.BREAST_CUP_ZZZ_LARGE;
        this._cupSize = value;
    }

    public get lactationLevel(): number {
        return this._lactation;
    }

    public set lactationLevel(value: number) {
        if (value < BreastStore.LACTATION_DISABLED) value = BreastStore.LACTATION_DISABLED;
        if (value > BreastStore.LACTATION_EPIC) value = BreastStore.LACTATION_EPIC;
        if (this._lactation <= BreastStore.LACTATION_NONE && value >= BreastStore.LACTATION_LIGHT) {
            // Lactation is just starting - zero the other vars involved
            this._fullness = 0;
            this._timesMilked = 0;
        }
        this._lactation = value;
    }

    public advanceTime(): void {
        if (this._lactation <= BreastStore.LACTATION_NONE) return;
        // Add to breastFullness and possibly adjust lactationLevel. Even when lactationLevel == LACTATION_NONE this is still doing something useful, adjusting _breastTimesMilked
        this._fullness += BreastStore.LACTATION_BOOST[this._lactation]; // Higher lactation means faster refill
        if (this._fullness > 60 + 20 * BreastStore.LACTATION_BOOST[this._lactation]) {
            // 100 at LACTATION_LIGHT, 180 at LACTATION_EPIC - fullness over this value is overloaded, lactation may be reduced
            this._fullness = 50; // This way fullness won't immediately hit the limit again
            if (this._timesMilked >= 5) {
                this._timesMilked -= 5; // If enough milkings have occured then don't reduce lactation level right away
            } else if (this.preventLactationDecrease != this._lactation) {
                this._lactation--;
            }
        }
    }

    public adj(): string {
        switch (this._cupSize) {
            case CoC.BREAST_CUP_FLAT:
                return "non-existent";
            case CoC.BREAST_CUP_A:
                return "small";
            case CoC.BREAST_CUP_B:
            case CoC.BREAST_CUP_C:
                return "palmable";
            case CoC.BREAST_CUP_D:
            case CoC.BREAST_CUP_DD:
            case CoC.BREAST_CUP_DD_BIG:
                return "sizeable";
            case CoC.BREAST_CUP_E:
            case CoC.BREAST_CUP_E_BIG:
            case CoC.BREAST_CUP_EE:
            case CoC.BREAST_CUP_EE_BIG:
            case CoC.BREAST_CUP_F:
            case CoC.BREAST_CUP_F_BIG:
            case CoC.BREAST_CUP_FF:
            case CoC.BREAST_CUP_FF_BIG:
                return "huge";
            case CoC.BREAST_CUP_G:
            case CoC.BREAST_CUP_G_BIG:
            case CoC.BREAST_CUP_GG:
            case CoC.BREAST_CUP_GG_BIG:
            case CoC.BREAST_CUP_H:
            case CoC.BREAST_CUP_H_BIG:
            case CoC.BREAST_CUP_HH:
            case CoC.BREAST_CUP_HH_BIG:
            case CoC.BREAST_CUP_I:
            case CoC.BREAST_CUP_I_BIG:
            case CoC.BREAST_CUP_II:
            case CoC.BREAST_CUP_II_BIG:
                return "gigantic";
            case CoC.BREAST_CUP_J:
            case CoC.BREAST_CUP_J_BIG:
            case CoC.BREAST_CUP_JJ:
            case CoC.BREAST_CUP_JJ_BIG:
            case CoC.BREAST_CUP_K:
            case CoC.BREAST_CUP_K_BIG:
            case CoC.BREAST_CUP_KK:
            case CoC.BREAST_CUP_KK_BIG:
            case CoC.BREAST_CUP_L:
            case CoC.BREAST_CUP_L_BIG:
            case CoC.BREAST_CUP_LL:
            case CoC.BREAST_CUP_LL_BIG:
            case CoC.BREAST_CUP_M:
            case CoC.BREAST_CUP_M_BIG:
            case CoC.BREAST_CUP_MM:
            case CoC.BREAST_CUP_MM_BIG:
            case CoC.BREAST_CUP_MMM:
            case CoC.BREAST_CUP_MMM_LARGE:
                return "mammoth";
            default:
        }
        return "titanic";
    }

    public canTitFuck(): boolean {
        return this._cupSize >= CoC.BREAST_CUP_C;
    }

    public cup(): string {
        return Appearance.breastCup(this._cupSize);
    } // The cup size alone

    public description(useAdj = false, isMale = false): string {
        if (this._cupSize == CoC.BREAST_CUP_FLAT) return `flat${isMale ? " manly," : ""} chest`;
        return `${(useAdj ? `${this.adj()} ` : "") + this.cup()} breasts`;
    }

    public breastDesc(): string {
        return BreastStore.breastDescript(this.cupSize, 0.5 * this.lactationLevel);
    }

    public hasBreasts(): boolean {
        return this._cupSize != CoC.BREAST_CUP_FLAT;
    }

    public lactating(): boolean {
        return this._lactation >= BreastStore.LACTATION_LIGHT;
    }

    public milked(): boolean {
        // Returns true if this milking increased the NPC's lactationLevel
        this._fullness = 0;
        this._timesMilked++;
        if (this.preventLactationIncrease == this._lactation) return false;
        switch (
            this._lactation // With enough milking the lactation level increases
        ) {
            case BreastStore.LACTATION_NONE: // If you suckle enough times the NPC will eventually start producing milk if they're set to LACTATION_NONE
                if (this._timesMilked < 12) return false;
                break;
            case BreastStore.LACTATION_LIGHT:
                if (this._timesMilked < 10) return false;
                break;
            case BreastStore.LACTATION_MODERATE:
                if (this._timesMilked < 12) return false;
                break;
            case BreastStore.LACTATION_HEAVY:
                if (this._timesMilked < 15) return false;
                break;
            case BreastStore.LACTATION_STRONG:
                if (this._timesMilked < 20) return false;
                break;
            default:
                // No amount of suckling will increase lactation levels for this NPC
                return false;
        }
        // Only reach this point if the NPC has been milked enough times to justify increasing their milk production
        this._timesMilked = 5;
        this.lactationLevel++;
        return true;
    }

    public milkIsFull(): boolean {
        return this._lactation <= BreastStore.LACTATION_NONE ? false : this._fullness >= 50;
    }

    public milkIsOverflowing(): boolean {
        return this._lactation <= BreastStore.LACTATION_NONE
            ? false
            : this._fullness >= 60 + 5 * BreastStore.LACTATION_BOOST[this._lactation]; // Probably pretty desperate to be milked by this point
    }

    // At fullness == 50 the maximum amount of milk is produced. When overfull, lactation level is reduced and fullness drops to 50.
    // So a higher lactationLevel means more milk is produced and the breasts can stay full without drying up for longer. Will always return 0 if not lactating
    public milkQuantity(): number {
        if (this._lactation <= BreastStore.LACTATION_NONE) return 0;
        return (
            0.01 *
            Math.max(100, 2 * this._fullness) *
            Number(20 * this._rows * this._cupSize * (this._lactation - 1))
        );
    }

    public nippleDescript(
        tiny = "tiny",
        small = "prominent",
        large = "large",
        huge = "elongated",
        massive = "massive"
    ): string {
        if (this._nippleLength < 3) return tiny;
        if (this._nippleLength < 10) return small;
        if (this._nippleLength < 20) return large;
        if (this._nippleLength < 32) return huge;
        return massive;
    }

    public get nippleLength(): number {
        return this._nippleLength;
    }

    public set nippleLength(value: number) {
        if (value < 0) value = 0;
        this._nippleLength = 0.1 * Math.round(10 * value); // Ensure nipple length only goes to one decimal place
    }

    public get rows(): number {
        return this._rows;
    }

    public set rows(value: number) {
        if (value < 1) value = 1;
        this._rows = value;
    }
}
