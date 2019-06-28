import { writeFileSync, readFileSync, renameSync, existsSync } from 'fs';
import { fixText } from './Converter';
import { walk } from './walk';

// walk('Converter/Test', (file) => fix(file), (err) => console.error(err));
// walk('Game/Scenes', (file) => fix(file, true), (err) => console.error(err));
walk('classes', (file) => fix(file, true), (err) => console.error(err));
walk('includes', (file) => fix(file, true), (err) => console.error(err));
walk('lib/src/coc/view', (file) => fix(file, true), (err) => console.error(err));
// fix('test.as');

function fix(file: string, overwrite?: boolean) {
    if (file.endsWith('.as')) {
        console.log('Fixing ' + file);

        const data = readFileSync(file, 'utf-8');
        const newValue = fixText(data);
        const newFile = file.replace('.as', '.ts');
        if (existsSync(newFile))
            renameSync(newFile, newFile.replace('.ts', '_old.ts'));
        if (overwrite)
            renameSync(file, newFile);
        writeFileSync(newFile, newValue, 'utf-8');
    }
}
