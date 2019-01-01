import { EquipSlot, IEquipSlot } from './EquipSlot';
import { EquipSlotList } from './EquipSlotList';
import { ISerializable } from 'Engine/Utilities/ISerializable';
import { Character } from 'Engine/Character/Character';
import { Piercing } from 'Engine/Items/Piercing';

type PiercingSlot = EquipSlot<Piercing>;

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
    private char: Character;
    public readonly clit: PiercingSlot;
    public readonly ears: PiercingSlot;
    public readonly eyebrow: PiercingSlot;
    public readonly lip: PiercingSlot;
    public readonly nose: PiercingSlot;
    public readonly tongue: PiercingSlot;
    public readonly labia: PiercingSlot;

    public readonly nipples = new EquipSlotList<Piercing>();
    public readonly cocks = new EquipSlotList<Piercing>();

    public constructor(character: Character) {
        this.char = character;
        this.clit = new EquipSlot(character);
        this.ears = new EquipSlot(character);
        this.eyebrow = new EquipSlot(character);
        this.lip = new EquipSlot(character);
        this.nose = new EquipSlot(character);
        this.tongue = new EquipSlot(character);
        this.labia = new EquipSlot(character);

        character.body.chest.forEach(() => this.nipples.add(new EquipSlot(character)));
        character.body.cocks.forEach(() => this.cocks.add(new EquipSlot(character)));

        character.body.chest.on('add', () => {
            this.nipples.add(new EquipSlot(character));
        });
        character.body.chest.on('remove', (cock, index) => {
            this.nipples.remove(index);
        });
        character.body.cocks.on('add', () => {
            this.cocks.add(new EquipSlot(character));
        });
        character.body.cocks.on('remove', (cock, index) => {
            this.cocks.remove(index);
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
        this.nipples.deserialize(saveObject.nipples, EquipSlot, this.char);
        while (this.nipples.length < this.char.body.chest.length) {
            this.nipples.add(new EquipSlot(this.char));
        }
        while (this.nipples.length > this.char.body.chest.length) {
            this.nipples.remove(this.nipples.length - 1);
        }

        this.cocks.deserialize(saveObject.cocks, EquipSlot, this.char);
        while (this.cocks.length < this.char.body.cocks.length) {
            this.cocks.add(new EquipSlot(this.char));
        }
        while (this.cocks.length > this.char.body.cocks.length) {
            this.cocks.remove(this.cocks.length - 1);
        }

    }
}
