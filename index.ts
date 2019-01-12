import Scene from '@core/Scene';

import Entity from '@common/core/Entity';
import Hierarchy from '@common/components/Hierarchy';
import UpdateEvent from '@common/events/Update';

const s = new Scene();
s.entities.register(Entity);
s.components.register(Hierarchy);
s.systems.register(Hierarchy);

const e = s.entities.add();
const h = e.components.add(Hierarchy);

s.dispatcher.emit(new UpdateEvent());
s.dispatcher.dispatch();
