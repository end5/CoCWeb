import { Material } from 'Engine/Items/Material';
import { MaterialName } from './MaterialName';
import { KitsuneStatue } from './Materials/KitsuneStatue';
import { ItemDesc } from 'Engine/Items/ItemDesc';
import { ItemDict } from 'Engine/Items/ItemDict';

ItemDict.add(new Material(MaterialName.BlackChitin, new ItemDesc("B.Chitn", "a large shard of chitinous plating",
    "A perfect piece of black chitin from a bee-girl.  It still has some fuzz on it."),
    "You look over the scale carefully but cannot find a use for it.  Maybe someone else will know how to use it."));
ItemDict.add(new KitsuneStatue());
ItemDict.add(new Material(MaterialName.GreenGel, new ItemDesc("GreenGl", "a clump of green gel",
    "This tough substance has no obvious use that you can discern."),
    "You examine the gel thoroughly, noting it is tough and resiliant, yet extremely pliable.  Somehow you know eating it would not be a good idea."));
ItemDict.add(new Material(MaterialName.ToughSpiderSilk, new ItemDesc("T.SSilk", "a bundle of tough spider-silk",
    "This bundle of fibrous silk is incredibly tough and strong, though somehow not sticky in the slightest.  You have no idea how to work these tough little strand(s into anything usable.  Perhaps one of this land's natives might have an idea?"),
    "You look over the tough webbing, confusion evident in your expression.  There's really nothing practical you can do with these yourself.  It might be best to find someone more familiar with the odd materials in this land to see if they can make sense of it."));
