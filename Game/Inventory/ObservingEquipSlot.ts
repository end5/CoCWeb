import { EquipSlot } from './EquipSlot';
import { EquipableItem } from 'Game/Items/EquipableItem';
import { Character } from 'Game/Character/Character';
import { ObjectObserver } from 'Game/Utilities/ListMonitor';

export class ObservingEquipSlot<ItemType extends EquipableItem, ObservedType> extends EquipSlot<ItemType> implements ObjectObserver<ObservedType> {
    public observedObject: ObservedType;
    public constructor(object: ObservedType, char: Character) {
        super(char);
        this.observedObject = object;
    }
}
