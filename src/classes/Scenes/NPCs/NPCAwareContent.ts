import { BaseContent } from "../../BaseContent";
import { kGAMECLASS } from "../../GlobalFlags/kGAMECLASS";
import { FollowerInteractions } from "../FollowerInteractions";
import { TelAdre } from "../Places/TelAdre";
import { AmilyScene } from "./AmilyScene";
import { AnemoneScene } from "./AnemoneScene";
import { ArianScene } from "./ArianScene";
import { CeraphFollowerScene } from "./CeraphFollowerScene";
import { CeraphScene } from "./CeraphScene";
import { EmberScene } from "./EmberScene";
import { Exgartuan } from "./Exgartuan";
import { HelFollower } from "./HelFollower";
import { HelScene } from "./HelScene";
import { HelSpawnScene } from "./HelSpawnScene";
import { HolliScene } from "./HolliScene";
import { IsabellaFollowerScene } from "./IsabellaFollowerScene";
import { IsabellaScene } from "./IsabellaScene";
import { IzmaScene } from "./IzmaScene";
import { JojoScene } from "./JojoScene";
import { KihaFollower } from "./KihaFollower";
import { KihaScene } from "./KihaScene";
import { LatexGirl } from "./LatexGirl";
import { MarblePurification } from "./MarblePurification";
import { MarbleScene } from "./MarbleScene";
import { MilkWaifu } from "./MilkWaifu";
import { Raphael } from "./Raphael";
import { Rathazul } from "./Rathazul";
import { SheilaScene } from "./SheilaScene";
import { ShouldraFollower } from "./ShouldraFollower";
import { ShouldraScene } from "./ShouldraScene";
import { SophieBimbo } from "./SophieBimbo";
import { SophieFollowerScene } from "./SophieFollowerScene";
import { SophieScene } from "./SophieScene";
import { Urta } from "./Urta";
import { UrtaHeatRut } from "./UrtaHeatRut";
import { UrtaPregs } from "./UrtaPregs";
import { Valeria } from "./Valeria";
import { Vapula } from "./Vapula";

/**
 * Created by aimozg on 08.01.14.
 */

/**
 * Contains handy references to scenes and methods
 */
export class NPCAwareContent extends BaseContent {
    // Common scenes
    protected get telAdre(): TelAdre {
        return kGAMECLASS.telAdre;
    }
    // Follower interactions
    protected get finter(): FollowerInteractions {
        return kGAMECLASS.followerInteractions;
    }

    // Amily
    protected get amilyScene(): AmilyScene {
        return kGAMECLASS.amilyScene;
    }

    public amilyFollower(): boolean {
        return kGAMECLASS.amilyScene.amilyFollower();
    }
    // Anemone
    protected get anemoneScene(): AnemoneScene {
        return kGAMECLASS.anemoneScene;
    }
    // Arian
    protected get arianScene(): ArianScene {
        return kGAMECLASS.arianScene;
    }
    public arianFollower(): boolean {
        return kGAMECLASS.arianScene.arianFollower();
    }
    // Ceraph
    protected get ceraphScene(): CeraphScene {
        return kGAMECLASS.ceraphScene;
    }
    protected get ceraphFollowerScene(): CeraphFollowerScene {
        return kGAMECLASS.ceraphFollowerScene;
    }
    public ceraphIsFollower(): boolean {
        return kGAMECLASS.ceraphFollowerScene.ceraphIsFollower();
    }
    // Ember
    protected get emberScene(): EmberScene {
        return kGAMECLASS.emberScene;
    }
    public followerEmber(): boolean {
        return kGAMECLASS.emberScene.followerEmber();
    }
    public emberMF(man: string, woman: string): string {
        return kGAMECLASS.emberScene.emberMF(man, woman);
    }
    // Exgartuan
    protected get exgartuan(): Exgartuan {
        return kGAMECLASS.exgartuan;
    }
    // Helia
    protected get helScene(): HelScene {
        return kGAMECLASS.helScene;
    }
    protected get helFollower(): HelFollower {
        return kGAMECLASS.helFollower;
    }
    public followerHel(): boolean {
        return kGAMECLASS.helScene.followerHel();
    }
    // Helia spawn
    protected get helSpawnScene(): HelSpawnScene {
        return kGAMECLASS.helSpawnScene;
    }

    public helPregnant(): boolean {
        return kGAMECLASS.helSpawnScene.helPregnant();
    }
    public helspawnFollower(): boolean {
        return kGAMECLASS.helSpawnScene.helspawnFollower();
    }

    // Holli
    protected get holliScene(): HolliScene {
        return kGAMECLASS.holliScene;
    }
    // Isabella
    protected get isabellaScene(): IsabellaScene {
        return kGAMECLASS.isabellaScene;
    }
    protected get isabellaFollowerScene(): IsabellaFollowerScene {
        return kGAMECLASS.isabellaFollowerScene;
    }

    public isabellaFollower(): boolean {
        return kGAMECLASS.isabellaFollowerScene.isabellaFollower();
    }

    public isabellaAccent(): boolean {
        return kGAMECLASS.isabellaFollowerScene.isabellaAccent();
    }

    // Izma
    public izmaFollower(): boolean {
        return kGAMECLASS.izmaScene.izmaFollower();
    }
    protected get izmaScene(): IzmaScene {
        return kGAMECLASS.izmaScene;
    }
    // Jojo
    protected get jojoScene(): JojoScene {
        return kGAMECLASS.jojoScene;
    }
    protected get monk(): number {
        return kGAMECLASS.monk;
    }
    public campCorruptJojo(): boolean {
        return kGAMECLASS.jojoScene.campCorruptJojo();
    }
    // Kiha
    protected get kihaFollower(): KihaFollower {
        return kGAMECLASS.kihaFollower;
    }
    protected get kihaScene(): KihaScene {
        return kGAMECLASS.kihaScene;
    }

    public followerKiha(): boolean {
        return kGAMECLASS.kihaFollower.followerKiha();
    }

    // Latex Girl
    protected get latexGirl(): LatexGirl {
        return kGAMECLASS.latexGirl;
    }
    public latexGooFollower(): boolean {
        return kGAMECLASS.latexGirl.latexGooFollower();
    }
    // Marble
    protected get marbleScene(): MarbleScene {
        return kGAMECLASS.marbleScene;
    }
    protected get marblePurification(): MarblePurification {
        return kGAMECLASS.marblePurification;
    }
    public marbleFollower(): boolean {
        return kGAMECLASS.marbleScene.marbleFollower();
    }
    // Milk slave
    public milkSlave(): boolean {
        return kGAMECLASS.milkWaifu.milkSlave();
    }
    protected get milkWaifu(): MilkWaifu {
        return kGAMECLASS.milkWaifu;
    }
    // Raphael
    protected raphael(): Raphael {
        return kGAMECLASS.raphael;
    }
    public RaphaelLikes(): boolean {
        return kGAMECLASS.raphael.RaphaelLikes();
    }
    // Rathazul
    protected rathazul(): Rathazul {
        return kGAMECLASS.rathazul;
    }
    // Sheila
    protected get sheilaScene(): SheilaScene {
        return kGAMECLASS.sheilaScene;
    }
    // Shouldra
    protected get shouldraFollower(): ShouldraFollower {
        return kGAMECLASS.shouldraFollower;
    }

    protected get shouldraScene(): ShouldraScene {
        return kGAMECLASS.shouldraScene;
    }

    public followerShouldra(): boolean {
        return kGAMECLASS.shouldraFollower.followerShouldra();
    }

    // Sophie
    protected get sophieBimbo(): SophieBimbo {
        return kGAMECLASS.sophieBimbo;
    }
    protected get sophieScene(): SophieScene {
        return kGAMECLASS.sophieScene;
    }

    protected get sophieFollowerScene(): SophieFollowerScene {
        return kGAMECLASS.sophieFollowerScene;
    }

    public bimboSophie(): boolean {
        return kGAMECLASS.sophieBimbo.bimboSophie();
    }

    public sophieFollower(): boolean {
        return kGAMECLASS.sophieFollowerScene.sophieFollower();
    }
    // Urta
    public urtaLove(love: number = 0): boolean {
        return kGAMECLASS.urta.urtaLove(love);
    }
    protected get urta(): Urta {
        return kGAMECLASS.urta;
    }
    protected get urtaPregs(): UrtaPregs {
        return kGAMECLASS.urtaPregs;
    }
    protected get urtaHeatRut(): UrtaHeatRut {
        return kGAMECLASS.urtaHeatRut;
    }
    // Valeria
    protected get valeria(): Valeria {
        return kGAMECLASS.valeria;
    }
    // Vapula
    protected get vapula(): Vapula {
        return kGAMECLASS.vapula;
    }
    public vapulaSlave(): boolean {
        return kGAMECLASS.vapula.vapulaSlave();
    }
}
