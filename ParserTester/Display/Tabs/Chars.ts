import { CharDict } from "../../../Game/CharDict";
import { Player } from "../../../Game/Character/Player/Player";
import { createPanel, EventFunc } from "../Create";
import { IDictionary } from "../../../Engine/Utilities/Dictionary";
import { Character, ICharacter } from "../../../Game/Character/Character";
import { CharMap, PropDict, ValueProp, ArrayProp, ObjectProp, ArrayEntryProp, AnyProp } from "./CharMap";
import { objectField, selectField, setSelectorStringCallback, stringField, setStringCallback, setNumberCallback, booleanField, setBooleanCallback } from "../Fields";

let selChar: Character;
export let serializedChar: ICharacter;

interface Info {
    obj: IDictionary<any>;
    key: string;
    element: HTMLElement;
    map: PropDict | AnyProp | ArrayEntryProp;
}

export function loadCharContent(charContent: HTMLElement) {
    if (!CharDict.player)
        CharDict.player = new Player();
    selChar = CharDict.player;
    serializedChar = selChar.serialize();

    generateMappedFields(Object.keys(CharMap).reverse().map((key) => ({ obj: serializedChar, key, element: charContent, map: CharMap })));
}

function charDeserializerWrapper(callback: (obj: IDictionary<any>, key: string) => EventFunc, obj: IDictionary<any>, key: string) {
    return (evnt: Event) => {
        callback(obj, key);
        selChar.deserialize(serializedChar);
    };
}

function generateAddRemoveButtons(panel: HTMLElement, addCallback: EventFunc, removeCallback: EventFunc) {
    const addRemoveButtons = document.createElement("div");
    addRemoveButtons.className = "addRemoveButtons";
    const add = document.createElement("div");
    add.innerText = "+";
    add.className = "addRemoveButton accordion";
    add.addEventListener("click", addCallback);
    const remove = document.createElement("div");
    remove.innerText = "–";
    remove.className = "addRemoveButton accordion";
    remove.addEventListener("click", removeCallback);
    addRemoveButtons.appendChild(add);
    addRemoveButtons.appendChild(remove);
    panel.appendChild(addRemoveButtons);
}

function generateValue(mapValue: ValueProp | ArrayProp | ObjectProp) {
    if (mapValue.type === "object") return mapValue.create ? mapValue.create() : undefined;
    if (mapValue.type === "array") return [];
    if (mapValue.type === "number") return 0;
    if (mapValue.type === "string") return "";
    if (mapValue.type === "boolean") return false;
}

function processInfo(info: Info): Info | Info[] | undefined {
    const obj = info.obj;
    const key = info.key;
    let mapEntry: AnyProp | ArrayEntryProp = (info.map as PropDict)[key];
    const parentElement = info.element;
    let label = key;
    let canBeNull = true;

    if (!mapEntry) {
        mapEntry = (info.map as ArrayEntryProp);
    }

    if ((mapEntry as AnyProp).label) {
        label = (mapEntry as AnyProp).label;
    }
    else
        canBeNull = false;

    if (!obj[key]) {
        obj[key] = generateValue(mapEntry);
    }

    if (mapEntry.type === "object" || mapEntry.type === "array") {
        const panel = createPanel();
        if (mapEntry.type === "object" && mapEntry.create && canBeNull) {
            generateAddRemoveButtons(panel,
                function objectAddCallback(parent, objj, keyy, mapp) {
                    return () => {
                        if (objj[keyy] === undefined) {
                            objj[keyy] = mapp.create ? mapp.create() : {};
                            generateMappedFields(Object.keys(mapp.properties).reverse().map((mapKey) =>
                                ({ obj: objj[keyy], key: mapKey, element: parent, map: mapp.properties })
                            ));
                            selChar.deserialize(serializedChar);
                        }
                    };
                }(panel, obj, key, mapEntry),
                function objectRemoveCallback(parent, objj, keyy, mapp) {
                    return () => {
                        if (objj[keyy]) {
                            while (parent.lastChild && parent.lastChild !== parent.firstChild) {
                                parent.removeChild(parent.lastChild);
                            }
                            objj[keyy] = undefined;
                            selChar.deserialize(serializedChar);
                        }
                    };
                }(panel, obj, key, mapEntry)
            );
        }

        if (mapEntry.type === "array") {
            if (mapEntry.min)
                while (obj[key].length < mapEntry.min) {
                    obj[key].push(generateValue(mapEntry.entry));
                }

            if (!(mapEntry.min && mapEntry.max && mapEntry.min === mapEntry.max)) {
                generateAddRemoveButtons(panel,
                    function arrayAddCallback(parent, objj, keyy, mapp) {
                        return () => {
                            if (!mapp.max || (mapp.max && objj[keyy].length < mapp.max)) {
                                if (typeof objj[keyy] === 'object')
                                    generateMappedFields(processInfo({ obj: objj[keyy], key: Object.keys(objj[keyy]).length + '', element: parent, map: mapp.entry })!);
                                else
                                    generateMappedFields(processInfo({ obj: objj[keyy], key: objj[keyy].length, element: parent, map: mapp.entry })!);
                                selChar.deserialize(serializedChar);
                            }
                        };
                    }(panel, obj, key, mapEntry),
                    function arrayRemoveCallback(parent, objj, keyy, mapp) {
                        return () => {
                            if (objj[keyy]) {
                                if (objj[keyy].length > (mapp.min ? mapp.min : 0) && parent.lastChild) {
                                    parent.removeChild(parent.lastChild);
                                    if (typeof objj[keyy].pop() === "object")
                                        parent.removeChild(parent.lastChild);
                                }
                                selChar.deserialize(serializedChar);
                            }
                        };
                    }(panel, obj, key, mapEntry)
                );
            }
        }
        parentElement.appendChild(objectField(label, panel));
        parentElement.appendChild(panel);

        if (obj[key])
            if (mapEntry.type === "array")
                return Object.keys(obj[key]).reverse().map((objKey) => ({ obj: obj[key], key: objKey, element: panel, map: (mapEntry as ArrayProp).entry }));
            else if (mapEntry.type === "object")
                return Object.keys(obj[key]).reverse().map((objKey) => ({ obj: obj[key], key: objKey, element: panel, map: (mapEntry as ObjectProp).properties }));
    }
    else if (mapEntry.type === "string") {
        if (mapEntry.options)
            parentElement.appendChild(selectField(label, obj[key], mapEntry.options, charDeserializerWrapper(setSelectorStringCallback, obj, key)));
        else
            parentElement.appendChild(stringField(label, obj[key], charDeserializerWrapper(setStringCallback, obj, key)));
    }
    else if (mapEntry.type === "number") {
        if (mapEntry.options)
            parentElement.appendChild(selectField(label, obj[key], mapEntry.options, charDeserializerWrapper(setNumberCallback, obj, key)));
        else
            parentElement.appendChild(stringField(label, obj[key], charDeserializerWrapper(setNumberCallback, obj, key)));
    }
    else if (mapEntry.type === "boolean") {
        parentElement.appendChild(booleanField(label, obj[key], charDeserializerWrapper(setBooleanCallback, obj, key)));
    }
    return;
}

function generateMappedFields(startInfo?: Info | Info[]) {
    if (!startInfo)
        return;

    let queue = Array.isArray(startInfo) ? startInfo : [startInfo];

    while (queue.length > 0) {
        const results = processInfo(queue.pop()!);
        if (results)
            queue = queue.concat(results);
    }
}
