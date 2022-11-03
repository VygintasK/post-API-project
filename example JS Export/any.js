
// whatever text because default exports only 1 "defaultExprotas"
import whateverText from './exportDefault.js'
console.log(whateverText)

//reik rasyt tikslu varda nes gali but keli
import {namedExport1, namedExport2, duKart} from './exportNamed.js'
console.log(namedExport1)
console.log(namedExport2)

console.log(duKart(4))