import { readdir, PathLike, stat, writeFileSync, readFileSync, renameSync } from 'fs';
import { fixText } from './Converter';

export function walk(dir: PathLike, modify: (file: string) => void, done: (err: NodeJS.ErrnoException, res?: string[]) => void) {
    let results: string[] = [];
    readdir(dir, (err, list) => {
        if (err) return done(err);
        let i = 0;
        (function next() {
            let file = list[i++];
            if (!file) return done(new Error('No file found'), results);
            file = dir + '/' + file;
            stat(file, (_err, stats) => {
                if (stats && stats.isDirectory()) {
                    walk(file, modify, (_errr, res) => {
                        if (res) {
                            results = results.concat(res);
                            next();
                        }
                    });
                } else {
                    results.push(file);
                    modify(file);
                    next();
                }
            });
        })();
    });
}

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
        if (overwrite)
            renameSync(file, newFile);
        writeFileSync(newFile, newValue, 'utf-8');
    }
}
