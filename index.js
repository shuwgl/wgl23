import { startDialogue } from "./exo.js";
import { createCharac, createRenderEngine } from "./render2d.js";
import {minus, add} from "./utils.js";

//startDialogue()

var martine = createCharac("martine",100,"./img/pc.png")
var pyta = createCharac("pyta",100)

createRenderEngine(".render2d")