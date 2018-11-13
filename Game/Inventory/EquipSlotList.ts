import { EquipSlot } from './EquipSlot';
import { List } from '../../Engine/Utilities/List';
import { EquipableItem } from '../Items/EquipableItem';

export class EquipSlotList<T extends EquipableItem, EquipSlotType extends EquipSlot<T> = EquipSlot<T>> extends List<EquipSlotType> {
    public remove(index: number) {
        if (index >= 0 && index < this.list.length && this.list[index])
            this.list[index].unequip();
        super.remove(index);
    }

    public clear() {
        for (const equipmentSlot of this.list) {
            if (equipmentSlot)
                equipmentSlot.unequip();
        }
        super.clear();
    }
}
