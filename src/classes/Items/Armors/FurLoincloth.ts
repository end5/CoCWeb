import { Armor } from "../Armor";

/**
 * Created by aimozg on 11.01.14.
 */
// Not used in game

export class FurLoincloth extends Armor {
    public get description(): string {
        return `A pair of loincloths to cover your crotch and ${this.game.player.buttDescript()}.  Typically worn by people named 'Conan'.`;
    }

    public constructor() {
        super(
            "FurLoin",
            "FurLoin",
            "revealing fur loincloths",
            "a front and back set of loincloths",
            0,
            100,
            "A pair of loincloths to cover your crotch and butt.  Typically worn by people named 'Conan'.",
            "Light"
        );
    }
}
