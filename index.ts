import Scene from '@core/Scene';

import Entity from '@common/core/Entity';
import Hierarchy from '@common/components/Hierarchy';
import Transform from '@common/components/Transform';
import Character from '@common/components/Character';
import UpdateEvent from '@common/events/Update';
import RenderEvent from '@common/events/Render';
import InputEvent from '@common/events/Input';

const s = new Scene();
s.entities.register(Entity);
s.components.register(Hierarchy);
s.components.register(Transform);
s.components.register(Character);
s.systems.register(Hierarchy);
s.systems.register(Transform);
s.systems.register(Character);

const e0 = s.entities.add();
e0.transform.scale = 2.0;
e0.transform.position = 2.0;

const e00 = s.entities.add();
e00.components.add(Character);
e00.hierarchy.move(e0);
e00.transform.position = 1.0;

window.addEventListener(
    'keydown',
    (event) => {
        console.log(event.key);
        if (event.key === 'a') s.dispatcher.emit(new InputEvent('left'));
        else if (event.key === 'd') s.dispatcher.emit(new InputEvent('right'));
    }
);

const canvas = document.querySelector('canvas') as HTMLCanvasElement;
const context = canvas.getContext('2d') as CanvasRenderingContext2D;

function loop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    s.dispatcher.emit(new UpdateEvent());
    s.dispatcher.emit(new RenderEvent(context));
    s.dispatcher.dispatch();
    window.requestAnimationFrame(loop);
}

loop();