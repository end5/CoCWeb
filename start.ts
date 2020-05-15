import "regenerator-runtime/runtime";
import { CoC } from "./src/classes/CoC";

const coc = new CoC();
coc.run();
document.body.classList.remove("loading")
