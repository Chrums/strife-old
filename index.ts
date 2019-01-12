import Scene from '@core/Scene';

import Entity from '@common/core/Entity';
import Hierarchy from '@common/components/Hierarchy';

const s = new Scene();
s.entities.register(Entity);
s.components.register(Hierarchy);

const e = s.entities.add();
const h = e.components.add(Hierarchy);

console.log(h);