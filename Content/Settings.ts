import { Flags } from 'Engine/Flags';

export const Settings = Flags.register('Settings', {
    customFontSize: 1.5,
    lowStandards: false,
    hyperHappy: false,
    debug: false,
    easyMode: false,
    showSprites: false,
    sillyMode: false,
});
