//import Entity from '@core/Entity';
//import Scene from '@core/Scene';

import Scene from '@common/core/Scene';
import Hierarchy from '@common/components/Hierarchy';

const s = new Scene();
s.components.register(Hierarchy);

const e = s.entities.add();
console.log(e.value);