import { walk } from "./walk";
import { readFileSync, writeFile } from "fs";

walk('classes', () => { }, (err, list) => getNums('classes', err, list));
walk('includes', () => { }, (err, list) => getNums('includes', err, list));
// walk('lib/src/coc/view', () => { }, (err, list) => getNums('view', err, list));

function getNums(title: string, err: Error, fileList?: string[]) {
    if (err) console.log(err);

    if (fileList) {

        const regex = /spriteSelect\((\d+)\)/g;
        const filenameRegex = /\/([^\/]+).ts$/;
        const total: Record<number | string, string[]> = {};
        for (const file of fileList)
            if (file.endsWith('.ts')) {
                // console.log('Fixing ' + fileList);

                const data = readFileSync(file, 'utf-8');

                let result = regex.exec(data);
                while (result) {
                    if (result && result[1]) {
                        // console.log('Found in ' + file + ': ' + result[1]);
                        let matchFileList = total[result[1]];
                        if (!matchFileList)
                            matchFileList = total[result[1]] = [];

                        const filename = filenameRegex.exec(file)![1]!;
                        if (matchFileList.indexOf(filename) === -1)
                            matchFileList.push(filename);
                    }
                    result = regex.exec(data);
                }
            }

        console.log(JSON.stringify(total));

        writeFile('./' + title + 'SpriteNums.json', JSON.stringify(total), function (err) {
            if (err) return console.log(err);
        });
    }
}
