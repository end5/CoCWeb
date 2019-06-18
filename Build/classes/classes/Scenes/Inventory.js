define(["require", "exports", "../BaseContent", "../ItemSlotClass", "../GlobalFlags/kFLAGS", "../Items/WeaponLib", "../StatusAffects", "../ItemType", "../CoC_Settings", "../Items/Useable", "../../console", "../Items/Armor", "../Items/Weapon", "../GlobalFlags/kGAMECLASS"], function (require, exports, BaseContent_1, ItemSlotClass_1, kFLAGS_1, WeaponLib_1, StatusAffects_1, ItemType_1, CoC_Settings_1, Useable_1, console_1, Armor_1, Weapon_1, kGAMECLASS_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 12.01.14.
     */
    class Inventory extends BaseContent_1.BaseContent {
        constructor(saveSystem) {
            super();
            this.itemStorage = [];
            this.gearStorage = [];
            saveSystem.linkToInventory(this.itemStorageDirectGet, this.gearStorageDirectGet);
        }
        showStash() {
            return this.flags[kFLAGS_1.kFLAGS.UNKNOWN_FLAG_NUMBER_00254] > 0 || this.flags[kFLAGS_1.kFLAGS.UNKNOWN_FLAG_NUMBER_00255] > 0 || this.itemStorage.length > 0 || this.flags[kFLAGS_1.kFLAGS.ANEMONE_KID] > 0;
        }
        itemStorageDirectGet() { return this.itemStorage; }
        gearStorageDirectGet() { return this.gearStorage; }
        //		public function currentCallNext() { return callNext; }
        itemGoNext() { if (this.callNext != undefined)
            this.doNext(this.callNext); }
        inventoryMenu() {
            var x;
            var foundItem = false;
            if (this.getGame().inCombat) {
                this.callNext = this.inventoryCombatHandler; //Player will return to combat after item use
            }
            else {
                this.spriteSelect(-1);
                this.callNext = this.inventoryMenu; //In camp or in a dungeon player will return to inventory menu after item use
            }
            this.hideMenus();
            this.hideUpDown();
            this.clearOutput();
            this.outputText("<b><u>Equipment:</u></b>\n");
            this.outputText("<b>Weapon</b>: " + this.player.weaponName + " (Attack - " + this.player.weaponAttack + ")\n");
            this.outputText("<b>Armor : </b>" + this.player.armorName + " (Defense - " + this.player.armorDef + ")\n");
            if (this.player.keyItems.length > 0)
                this.outputText("<b><u>\nKey Items:</u></b>\n");
            for (x = 0; x < this.player.keyItems.length; x++)
                this.outputText(this.player.keyItems[x].keyName + "\n");
            this.menu();
            for (x = 0; x < 5; x++) {
                if (this.player.itemSlots[x].unlocked && this.player.itemSlots[x].quantity > 0) {
                    this.addButton(x, (this.player.itemSlots[x].itype.shortName + " x" + this.player.itemSlots[x].quantity), this.useItemInInventory, x);
                    foundItem = true;
                }
            }
            if (this.player.weapon != WeaponLib_1.WeaponLib.FISTS) {
                this.addButton(5, "Unequip", this.unequipWeapon);
            }
            if (!this.getGame().inCombat && this.inDungeon == false && this.inRoomedDungeon == false) {
                if (this.getGame().nieveHoliday() && this.flags[kFLAGS_1.kFLAGS.NIEVE_STAGE] > 0 && this.flags[kFLAGS_1.kFLAGS.NIEVE_STAGE] < 5) {
                    if (this.flags[kFLAGS_1.kFLAGS.NIEVE_STAGE] == 1)
                        this.outputText("\nThere's some odd snow here that you could do something with...\n");
                    else
                        this.outputText("\nYou have a snow" + this.getGame().nieveMF("man", "woman") + " here that seems like it could use a little something...\n");
                    this.addButton(6, "Snow", this.getGame().nieveBuilding);
                    foundItem = true;
                }
                if (this.flags[kFLAGS_1.kFLAGS.FUCK_FLOWER_KILLED] == 0 && this.flags[kFLAGS_1.kFLAGS.FUCK_FLOWER_LEVEL] >= 1) {
                    if (this.flags[kFLAGS_1.kFLAGS.FUCK_FLOWER_LEVEL] == 4)
                        this.outputText("\nHolli is in her tree at the edges of your camp.  You could go visit her if you want.\n");
                    this.addButton(7, (this.flags[kFLAGS_1.kFLAGS.FUCK_FLOWER_LEVEL] >= 3 ? "Tree" : "Plant"), this.getGame().holliScene.treeMenu);
                    foundItem = true;
                }
                if (this.player.hasKeyItem("Dragon Egg") >= 0) {
                    this.getGame().emberScene.emberCampDesc();
                    this.addButton(8, "Egg", this.getGame().emberScene.emberEggInteraction);
                    foundItem = true;
                }
            }
            if (!foundItem) {
                this.outputText("\nYou have no usable items.");
                this.doNext(this.playerMenu);
                return;
            }
            if (this.getGame().inCombat && this.player.findStatusAffect(StatusAffects_1.StatusAffects.Sealed) >= 0 && this.player.statusAffectv1(StatusAffects_1.StatusAffects.Sealed) == 3) {
                this.outputText("\nYou reach for your items, but you just can't get your pouches open.  <b>Your ability to use items was sealed, and now you've wasted a chance to attack!</b>\n\n");
                this.getGame().enemyAI();
                return;
            }
            this.outputText("\nWhich item will you use?");
            if (this.getGame().inCombat)
                this.addButton(9, "Back", kGAMECLASS_1.kGAMECLASS.combatMenu, false); //Player returns to the combat menu on cancel
            else
                this.addButton(9, "Back", this.playerMenu);
            //Gone			menuLoc = 1;
        }
        stash() {
            /*Hacked in cheat to enable shit
            flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00254] = 1;
            flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00255] = 1;*/
            //REMOVE THE ABOVE BEFORE RELASE ()
            this.clearOutput();
            this.spriteSelect(-1);
            this.menu();
            if (this.flags[kFLAGS_1.kFLAGS.ANEMONE_KID] > 0) {
                kGAMECLASS_1.kGAMECLASS.anemoneScene.anemoneBarrelDescription();
                if (this.model.time.hours >= 6)
                    this.addButton(4, "Anemone", kGAMECLASS_1.kGAMECLASS.anemoneScene.approachAnemoneBarrel);
            }
            if (this.player.hasKeyItem("Camp - Chest") >= 0) {
                this.outputText("You have a large wood and iron chest to help store excess items located near the portal entrance.\n\n");
                this.addButton(0, "Chest Store", this.pickItemToPlaceInCampStorage);
                if (this.hasItemsInStorage())
                    this.addButton(1, "Chest Take", this.pickItemToTakeFromCampStorage);
            }
            //Weapon Rack
            if (this.flags[kFLAGS_1.kFLAGS.UNKNOWN_FLAG_NUMBER_00254] > 0) {
                this.outputText("There's a weapon rack set up here, set up to hold up to nine various weapons.");
                this.addButton(2, "W.Rack Put", this.pickItemToPlaceInWeaponRack);
                if (this.weaponRackDescription())
                    this.addButton(3, "W.Rack Take", this.pickItemToTakeFromWeaponRack);
                this.outputText("\n\n");
            }
            //Armor Rack
            if (this.flags[kFLAGS_1.kFLAGS.UNKNOWN_FLAG_NUMBER_00255] > 0) {
                this.outputText("Your camp has an armor rack set up to hold your various sets of gear.  It appears to be able to hold nine different types of armor.");
                this.addButton(5, "A.Rack Put", this.pickItemToPlaceInArmorRack);
                if (this.armorRackDescription())
                    this.addButton(6, "A.Rack Take", this.pickItemToTakeFromArmorRack);
                this.outputText("\n\n");
            }
            this.addButton(9, "Back", this.playerMenu);
        }
        takeItem(itype, nextAction, overrideAbandon, source) {
            if (itype == undefined) {
                CoC_Settings_1.CoC_Settings.error("takeItem(undefined)");
                return;
            }
            if (itype == ItemType_1.ItemType.NOTHING)
                return;
            if (nextAction != undefined)
                this.callNext = nextAction;
            else
                this.callNext = this.playerMenu;
            //Check for an existing stack with room in the inventory and return the value for it.
            var temp = this.player.roomInExistingStack(itype);
            if (temp >= 0) { //First slot go!
                this.player.itemSlots[temp].quantity++;
                this.outputText("You place " + itype.longName + " in your " + Inventory.inventorySlotName[temp] + " pouch, giving you " + this.player.itemSlots[temp].quantity + " of them.");
                this.itemGoNext();
                return;
            }
            //If not done, then put it in an empty spot!
            //Throw in slot 1 if there is room
            temp = this.player.emptySlot();
            if (temp >= 0) {
                this.player.itemSlots[temp].setItemAndQty(itype, 1);
                this.outputText("You place " + itype.longName + " in your " + Inventory.inventorySlotName[temp] + " pouch.");
                this.itemGoNext();
                return;
            }
            if (overrideAbandon != undefined) //callOnAbandon only becomes important if the inventory is full
                this.callOnAbandon = overrideAbandon;
            else
                this.callOnAbandon = this.callNext;
            //OH NOES! No room! Call replacer functions!
            this.takeItemFull(itype, true, source);
        }
        returnItemToInventory(item, showNext = true) {
            if (!this.debug) {
                if (this.currentItemSlot == undefined) {
                    this.takeItem(item, this.callNext, this.callNext, undefined); //Give player another chance to put item in inventory
                }
                else if (this.currentItemSlot.quantity > 0) { //Add it back to the existing stack
                    this.currentItemSlot.quantity++;
                }
                else { //Put it back in the slot it came from
                    this.currentItemSlot.setItemAndQty(item, 1);
                }
            }
            if (this.getGame().inCombat) {
                this.enemyAI();
                return;
            }
            if (showNext)
                this.doNext(this.callNext); //Items with sub menus should return to the inventory screen if the player decides not to use them
            else
                this.callNext(); //When putting items back in your stash we should skip to the take from stash menu
        }
        //Check to see if anything is stored
        hasItemsInStorage() { return this.itemAnyInStorage(this.itemStorage, 0, this.itemStorage.length); }
        hasItemInStorage(itype) { return this.itemTypeInStorage(this.itemStorage, 0, this.itemStorage.length, itype); }
        consumeItemInStorage(itype) {
            this.temp = this.itemStorage.length;
            while (this.temp > 0) {
                this.temp--;
                if (this.itemStorage[this.temp].itype == itype && this.itemStorage[this.temp].quantity > 0) {
                    this.itemStorage[this.temp].quantity--;
                    return true;
                }
            }
            return false;
        }
        giveHumanizer() {
            if (this.flags[kFLAGS_1.kFLAGS.TIMES_CHEATED_COUNTER] > 0) {
                this.outputText("<b>I was a cheater until I took an arrow to the knee...</b>", true);
                this.getGame().gameOver();
                return;
            }
            this.outputText("I AM NOT A CROOK.  BUT YOU ARE!  <b>CHEATER</b>!\n\n", true);
            this.inventory.takeItem(this.consumables.HUMMUS_, this.playerMenu);
            this.flags[kFLAGS_1.kFLAGS.TIMES_CHEATED_COUNTER]++;
        }
        //Create a storage slot
        createStorage() {
            if (this.itemStorage.length >= 16)
                return false;
            var newSlot = new ItemSlotClass_1.ItemSlotClass();
            this.itemStorage.push(newSlot);
            return true;
        }
        //Clear storage slots
        clearStorage() {
            //Various Errors preventing action
            if (this.itemStorage == undefined)
                console_1.trace("ERROR: Cannot clear storage because storage does not exist.");
            else {
                console_1.trace("Attempted to remove " + this.itemStorage.length + " storage slots.");
                this.itemStorage.splice(0, this.itemStorage.length);
            }
        }
        clearGearStorage() {
            //Various Errors preventing action
            if (this.gearStorage == undefined)
                console_1.trace("ERROR: Cannot clear storage because storage does not exist.");
            else {
                console_1.trace("Attempted to remove " + this.gearStorage.length + " storage slots.");
                this.gearStorage.splice(0, this.gearStorage.length);
            }
        }
        initializeGearStorage() {
            //Completely empty storage array
            if (this.gearStorage == undefined)
                console_1.trace("ERROR: Cannot clear gearStorage because storage does not exist.");
            else {
                console_1.trace("Attempted to remove " + this.gearStorage.length + " gearStorage slots.");
                this.gearStorage.splice(0, this.gearStorage.length);
            }
            //Rebuild a new one!
            var newSlot;
            while (this.gearStorage.length < 18) {
                newSlot = new ItemSlotClass_1.ItemSlotClass();
                this.gearStorage.push(newSlot);
            }
        }
        useItemInInventory(slotNum) {
            this.clearOutput();
            if (this.player.itemSlots[slotNum].itype instanceof Useable_1.Useable) {
                var item = this.player.itemSlots[slotNum].itype;
                if (item.canUse()) { //If an item cannot be used then canUse should provide a description of why the item cannot be used
                    if (!this.debug)
                        this.player.itemSlots[slotNum].removeOneItem();
                    this.useItem(item, this.player.itemSlots[slotNum]);
                    return;
                }
            }
            else {
                this.outputText("You cannot use " + this.player.itemSlots[slotNum].itype.longName + "!\n\n");
            }
            this.itemGoNext(); //Normally returns to the inventory menu. In combat it goes to the inventoryCombatHandler function
            /* menuLoc is no longer needed, after enemyAI game will always move to the next round
                        else if (menuLoc == 1) {
                            menuLoc = 0;
                            if (!combatRoundOver()) {
                                outputText("\n\n");
                                enemyAI();
                            }
                        }
            */
        }
        inventoryCombatHandler() {
            if (!this.combatRoundOver()) { //Check if the battle is over. If not then go to the enemy's action.
                this.outputText("\n\n");
                this.enemyAI();
            }
        }
        useItem(item, fromSlot) {
            item.useText();
            if (item instanceof Armor_1.Armor) {
                this.player.armor.removeText();
                let oldItem = this.player.setArmor(item); //Item is now the player's old armor
                if (oldItem == undefined)
                    this.itemGoNext();
                else
                    this.takeItem(oldItem, this.callNext);
            }
            else if (item instanceof Weapon_1.Weapon) {
                this.player.weapon.removeText();
                let oldItem = this.player.setWeapon(item); //Item is now the player's old weapon
                if (oldItem == undefined)
                    this.itemGoNext();
                else
                    this.takeItem(oldItem, this.callNext);
            }
            else {
                this.currentItemSlot = fromSlot;
                if (!item.useItem())
                    this.itemGoNext(); //Items should return true if they have provided some form of sub-menu.
                //This is used for Reducto and GroPlus (which always present the player with a sub-menu)
                //and for the Kitsune Gift (which may show a sub-menu if the player has a full inventory)
                //				if (!item.hasSubMenu()) itemGoNext(); //Don't call itemGoNext if there's a sub menu, otherwise it would never be displayed
            }
        }
        takeItemFull(itype, showUseNow, source) {
            this.outputText("There is no room for " + itype.longName + " in your inventory.  You may replace the contents of a pouch with " + itype.longName + " or abandon it.");
            this.menu();
            for (var x = 0; x < 5; x++) {
                if (this.player.itemSlots[x].unlocked)
                    this.addButton(x, (this.player.itemSlots[x].itype.shortName + " x" + this.player.itemSlots[x].quantity), this.createCallBackFunction2(this.replaceItem, itype, x));
            }
            if (source != undefined) {
                this.currentItemSlot = source;
                this.addButton(7, "Put Back", this.createCallBackFunction2(this.returnItemToInventory, itype, false));
            }
            if (showUseNow && itype instanceof Useable_1.Useable)
                this.addButton(8, "Use Now", this.createCallBackFunction2(this.useItemNow, itype, source));
            this.addButton(9, "Abandon", this.callOnAbandon); //Does not doNext - immediately executes the callOnAbandon function
        }
        useItemNow(item, source) {
            this.clearOutput();
            if (item.canUse()) { //If an item cannot be used then canUse should provide a description of why the item cannot be used
                this.useItem(item, source);
            }
            else {
                this.takeItemFull(item, false, source); //Give the player another chance to take this item
            }
        }
        replaceItem(itype, slotNum) {
            this.clearOutput();
            if (this.player.itemSlots[slotNum].itype == itype) //If it is the same as what's in the slot...just throw away the new item
                this.outputText("You discard " + itype.longName + " from the stack to make room for the new one.");
            else { //If they are different...
                if (this.player.itemSlots[slotNum].quantity == 1)
                    this.outputText("You throw away " + this.player.itemSlots[slotNum].itype.longName + " and replace it with " + itype.longName + ".");
                else
                    this.outputText("You throw away " + this.player.itemSlots[slotNum].itype.longName + "(x" + this.player.itemSlots[slotNum].quantity + ") and replace it with " + itype.longName + ".");
                this.player.itemSlots[slotNum].setItemAndQty(itype, 1);
            }
            this.itemGoNext();
        }
        unequipWeapon() {
            this.clearOutput();
            const otherItem = this.player.setWeapon(WeaponLib_1.WeaponLib.FISTS);
            if (otherItem)
                this.takeItem(otherItem, this.inventoryMenu);
            else
                this.inventoryMenu();
        }
        /* Never called
                public  hasItemsInRacks(itype:ItemType, armor: boolean): boolean {
                    if (armor) return itemTypeInStorage(gearStorage, 9, 18, itype);
                    return itemTypeInStorage(gearStorage, 0, 9, itype);
                }
        */
        armorRackDescription() {
            if (this.itemAnyInStorage(this.gearStorage, 9, 18)) {
                var itemList = [];
                for (var x = 9; x < 18; x++)
                    if (this.gearStorage[x].quantity > 0)
                        itemList[itemList.length] = this.gearStorage[x].itype.longName;
                this.outputText("  It currently holds " + Inventory.formatStringArray(itemList) + ".");
                return true;
            }
            return false;
        }
        weaponRackDescription() {
            if (this.itemAnyInStorage(this.gearStorage, 0, 9)) {
                var itemList = [];
                for (var x = 0; x < 9; x++)
                    if (this.gearStorage[x].quantity > 0)
                        itemList[itemList.length] = this.gearStorage[x].itype.longName;
                this.outputText("  It currently holds " + Inventory.formatStringArray(itemList) + ".");
                return true;
            }
            return false;
        }
        itemAnyInStorage(storage, startSlot, endSlot) {
            for (var x = startSlot; x < endSlot; x++)
                if (storage[x].quantity > 0)
                    return true;
            return false;
        }
        itemTypeInStorage(storage, startSlot, endSlot, itype) {
            for (var x = startSlot; x < endSlot; x++)
                if (storage[x].quantity > 0 && storage[x].itype == itype)
                    return true;
            return false;
        }
        pickItemToTakeFromCampStorage() {
            this.callNext = this.pickItemToTakeFromCampStorage;
            this.pickItemToTakeFromStorage(this.itemStorage, 0, this.itemStorage.length, "storage");
        }
        pickItemToTakeFromArmorRack() {
            this.callNext = this.pickItemToTakeFromArmorRack;
            this.pickItemToTakeFromStorage(this.gearStorage, 9, 18, "rack");
        }
        pickItemToTakeFromWeaponRack() {
            this.callNext = this.pickItemToTakeFromWeaponRack;
            this.pickItemToTakeFromStorage(this.gearStorage, 0, 9, "rack");
        }
        pickItemToTakeFromStorage(storage, startSlot, endSlot, text) {
            this.clearOutput(); //Selects an item from a gear slot. Rewritten so that it no longer needs to use numbered events
            this.hideUpDown();
            if (!this.itemAnyInStorage(storage, startSlot, endSlot)) { //If no items are left then return to the camp menu. Can only happen if the player removes the last item.
                this.playerMenu();
                return;
            }
            this.outputText("What " + text + " slot do you wish to take an item from?");
            var button = 0;
            this.menu();
            for (var x = startSlot; x < endSlot; x++, button++) {
                if (storage[x].quantity > 0)
                    this.addButton(button, (storage[x].itype.shortName + " x" + storage[x].quantity), this.createCallBackFunction2(this.pickFrom, storage, x));
            }
            this.addButton(9, "Back", this.stash);
        }
        pickFrom(storage, slotNum) {
            this.clearOutput();
            var itype = storage[slotNum].itype;
            storage[slotNum].quantity--;
            this.inventory.takeItem(itype, this.callNext, this.callNext, storage[slotNum]);
        }
        pickItemToPlaceInCampStorage() { this.pickItemToPlaceInStorage(this.placeInCampStorage, this.allAcceptable, "storage containers", false); }
        pickItemToPlaceInArmorRack() { this.pickItemToPlaceInStorage(this.placeInArmorRack, this.armorAcceptable, "armor rack", true); }
        pickItemToPlaceInWeaponRack() { this.pickItemToPlaceInStorage(this.placeInWeaponRack, this.weaponAcceptable, "weapon rack", true); }
        allAcceptable(itype) { return true; }
        armorAcceptable(itype) { return itype instanceof Armor_1.Armor; }
        weaponAcceptable(itype) { return itype instanceof Weapon_1.Weapon; }
        pickItemToPlaceInStorage(placeInStorageFunction, typeAcceptableFunction, text, showEmptyWarning) {
            this.clearOutput(); //Selects an item to place in a gear slot. Rewritten so that it no longer needs to use numbered events
            this.hideUpDown();
            this.outputText("What item slot do you wish to empty into your " + text + "?");
            this.menu();
            var foundItem = false;
            for (var x = 0; x < 5; x++) {
                if (this.player.itemSlots[x].unlocked && this.player.itemSlots[x].quantity > 0 && typeAcceptableFunction(this.player.itemSlots[x].itype)) {
                    this.addButton(x, (this.player.itemSlots[x].itype.shortName + " x" + this.player.itemSlots[x].quantity), placeInStorageFunction, x);
                    foundItem = true;
                }
            }
            if (showEmptyWarning && !foundItem)
                this.outputText("\n<b>You have no appropriate items to put in this rack.</b>");
            this.addButton(9, "Back", this.stash);
        }
        placeInCampStorage(slotNum) {
            this.placeIn(this.itemStorage, 0, this.itemStorage.length, slotNum);
            this.doNext(this.pickItemToPlaceInCampStorage);
        }
        placeInArmorRack(slotNum) {
            this.placeIn(this.gearStorage, 9, 18, slotNum);
            this.doNext(this.pickItemToPlaceInArmorRack);
        }
        placeInWeaponRack(slotNum) {
            this.placeIn(this.gearStorage, 0, 9, slotNum);
            this.doNext(this.pickItemToPlaceInWeaponRack);
        }
        placeIn(storage, startSlot, endSlot, slotNum) {
            this.clearOutput();
            var x;
            var temp;
            var itype = this.player.itemSlots[slotNum].itype;
            var qty = this.player.itemSlots[slotNum].quantity;
            var orig = qty;
            this.player.itemSlots[slotNum].emptySlot();
            for (x = startSlot; x < endSlot && qty > 0; x++) { //Find any slots which already hold the item that is being stored
                if (storage[x].itype == itype && storage[x].quantity < 5) {
                    temp = 5 - storage[x].quantity;
                    if (qty < temp)
                        temp = qty;
                    this.outputText("You add " + temp + "x " + itype.shortName + " into storage slot " + Inventory.num2Text(x + 1 - startSlot) + ".\n");
                    storage[x].quantity += temp;
                    qty -= temp;
                    if (qty == 0)
                        return;
                }
            }
            for (x = startSlot; x < endSlot && qty > 0; x++) { //Find any empty slots and put the item(s) there
                if (storage[x].quantity == 0) {
                    storage[x].setItemAndQty(itype, qty);
                    this.outputText("You place " + qty + "x " + itype.shortName + " into storage slot " + Inventory.num2Text(x + 1 - startSlot) + ".\n");
                    qty = 0;
                    return;
                }
            }
            this.outputText("There is no room for " + (orig == qty ? "" : "the remaining ") + qty + "x " + itype.shortName + ".  You leave " + (qty > 1 ? "them" : "it") + " in your inventory.\n");
            this.player.itemSlots[slotNum].setItemAndQty(itype, qty);
        }
    }
    Inventory.inventorySlotName = ["first", "second", "third", "fourth", "fifth"];
    exports.Inventory = Inventory;
});
//# sourceMappingURL=Inventory.js.map