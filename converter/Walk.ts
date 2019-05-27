import { readdir, PathLike, stat } from 'fs';

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
