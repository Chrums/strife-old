import Event from '@common/core/Event';
import Scene from '@common/core/Scene';

import UpdateEvent from '@common/events/Update';

const s = new Scene();
const e = s.entities.add();
s.entities.add();
s.entities.add();
// const e0 = s.entities.add();
// e0.hierarchy.parent = e;
// const e1 = s.entities.add();
// e1.hierarchy.parent = e;
// console.log(e0.hierarchy);

s.dispatcher.emit(new UpdateEvent());
s.dispatcher.dispatch();