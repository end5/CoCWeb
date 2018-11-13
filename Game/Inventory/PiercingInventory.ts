import { EquipSlot, IEquipSlot } from './EquipSlot';
import { EquipSlotList } from './EquipSlotList';
import { ISerializable } from '../../Engine/Utilities/ISerializable';
import { Character } from '../Character/Character';
import { EquipableItem } from '../Items/EquipableItem';
import { Piercing } from '../Items/Misc/Piercing';
import { ListMonitor } from '../Utilities/ListMonitor';
import { Cock } from '../Body/Cock';
import { BreastRow } from '../Body/BreastRow';
import { ObservingEquipSlot } from './ObservingEquipSlot';

type PiercingSlot = EquipSlot<Piercing>;
type CockPiercingSlot = ObservingEquipSlot<Piercing, Cock>;
type NipplePiercingSlot = ObservingEquipSlot<Piercing, BreastRow>;
type BreastRowMonitor = ListMonitor<BreastRow, NipplePiercingSlot, EquipSlotList<Piercing, NipplePiercingSlot>>;
type CockMonitor = ListMonitor<Cock, CockPiercingSlot, EquipSlotList<Piercing, CockPiercingSlot>>;

export interface IPiercingInventory {
    clit?: IEquipSlot;
    ears?: IEquipSlot;
    eyebrow?: IEquipSlot;
    lip?: IEquipSlot;
    nose?: IEquipSlot;
    tongue?: IEquipSlot;
    labia?: IEquipSlot;

    nipples: IEquipSlot[];
    cocks: IEquipSlot[];
}

export class PiercingInventory implements ISerializable<IPiercingInventory> {
    public readonly clit: PiercingSlot;
    public readonly ears: PiercingSlot;
    public readonly eyebrow: PiercingSlot;
    public readonly lip: PiercingSlot;
    public readonly nose: PiercingSlot;
    public readonly tongue: PiercingSlot;
    public readonly labia: PiercingSlot;

    public readonly nipples = new EquipSlotList<Piercing, NipplePiercingSlot>();
    public readonly cocks = new EquipSlotList<Piercing, CockPiercingSlot>();

    private nipplesMonitor: BreastRowMonitor;
    private cocksMonitor: CockMonitor;

    public constructor(character: Character) {
        this.clit = new EquipSlot(character);
        this.ears = new EquipSlot(character);
        this.eyebrow = new EquipSlot(character);
        this.lip = new EquipSlot(character);
        this.nose = new EquipSlot(character);
        this.tongue = new EquipSlot(character);
        this.labia = new EquipSlot(character);
        this.addEquipEffects();

        this.nipplesMonitor = new ListMonitor<BreastRow, NipplePiercingSlot, EquipSlotList<Piercing, NipplePiercingSlot>>(this.nipples, ObservingEquipSlot, character);
        this.cocksMonitor = new ListMonitor<Cock, CockPiercingSlot, EquipSlotList<Piercing, CockPiercingSlot>>(this.cocks, ObservingEquipSlot, character);
        character.body.chest.observers.add(this.nipplesMonitor);
        character.body.cocks.observers.add(this.cocksMonitor);
    }

    // 0) **Clit (+2 sens)
    // 1) **Dick (+2 lib) adds the word 'pierced' sometimes to the description
    // 2) **Ears
    // 3) **Eyebrow (-.5 def)
    // 4) **Lip (-.5 def)
    // 5) **Nipples (+1 sens, +1 lib)
    // 6) **Nose (+.5 attack)
    // 7) **Tongue (+1 sens)
    // 8) **Labia (+1 sens)

    private addEquipEffects() {
        this.clit.addEquipEffect((_item: EquipableItem, char: Character) => {
            char.stats.sens += 2;
        });
        this.eyebrow.addEquipEffect((_item: EquipableItem, char: Character) => {
            char.stats.tou -= 0.5;
        });
        this.lip.addEquipEffect((_item: EquipableItem, char: Character) => {
            char.stats.tou -= 0.5;
        });
        this.nose.addEquipEffect((_item: EquipableItem, char: Character) => {
            char.stats.str += 0.5;
        });
        this.tongue.addEquipEffect((_item: EquipableItem, char: Character) => {
            char.stats.sens += 1;
        });
        this.labia.addEquipEffect((_item: EquipableItem, char: Character) => {
            char.stats.sens += 1;
        });
    }

    public serialize(): IPiercingInventory {
        const saveObject: { [x: string]: any } = {};
        if (this.clit.item) saveObject.clit = this.clit.serialize();
        if (this.ears.item) saveObject.ears = this.ears.serialize();
        if (this.eyebrow.item) saveObject.eyebrow = this.eyebrow.serialize();
        if (this.lip.item) saveObject.lip = this.lip.serialize();
        if (this.nose.item) saveObject.nose = this.nose.serialize();
        if (this.tongue.item) saveObject.tongue = this.tongue.serialize();
        if (this.labia.item) saveObject.labia = this.labia.serialize();
        saveObject.nipples = this.nipples.serialize();
        saveObject.cocks = this.cocks.serialize();
        return saveObject as IPiercingInventory;
    }

    public deserialize(saveObject: IPiercingInventory) {
        if (saveObject.clit) this.clit.deserialize(saveObject.clit);
        if (saveObject.ears) this.ears.deserialize(saveObject.ears);
        if (saveObject.eyebrow) this.eyebrow.deserialize(saveObject.eyebrow);
        if (saveObject.lip) this.lip.deserialize(saveObject.lip);
        if (saveObject.nose) this.nose.deserialize(saveObject.nose);
        if (saveObject.tongue) this.tongue.deserialize(saveObject.tongue);
        if (saveObject.labia) this.labia.deserialize(saveObject.labia);
        this.nipples.deserialize(saveObject.nipples, Piercing);
        this.cocks.deserialize(saveObject.cocks, Piercing);
    }
}
