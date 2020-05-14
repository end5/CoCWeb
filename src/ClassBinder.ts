function getPropList(object: object) {
    const props = new Set<[string | number, object]>();
    let obj = object;

    do {
        for (const key of Reflect.ownKeys(obj))
            props.add([key as string | number, obj]);

        obj = Reflect.getPrototypeOf(obj);
    } while (obj !== Object.prototype);

    return props;
};

export function bindToClass(self: Record<string | number, any>) {
    for (const [key, object] of getPropList(self.constructor.prototype)) {
        if (key === 'constructor') continue;

        const descriptor = Reflect.getOwnPropertyDescriptor(object, key);
        if (descriptor && typeof descriptor.value === 'function') {
            self[key] = self[key].bind(self);
        }
    }

    return self;
}
