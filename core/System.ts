import Component from '@core/Component';
import Event from '@core/Event';
import Scene from '@core/Scene';
import Storage from '@core/Storage';

type Callback<E extends Event> = (event: E) => void;

export default class System {
    
    public static Listeners = new Map();
    
    public static On(type) {
        return (target, identifier, descriptor) => {
            if (!System.Listeners.has(target.constructor)) System.Listeners.set(target.constructor, new Map());
            const listeners = System.Listeners.get(target.constructor);
            listeners.set(type, descriptor.value);
        };
    }
    
    public scene;
    public type;

    public constructor(scene, type) {
        this.scene = scene;
        this.type = type;
        if (System.Listeners.has(type)) {
            const listeners = System.Listeners.get(type);
            listeners.forEach((listener, type) => this.scene.dispatcher.on(type)(this.dispatch.bind(this)));
        }
    }
    
    private dispatch(event) {
        const type = event.constructor;
        const listeners = System.Listeners.get(this.type);
        if (listeners) {
            const listener = listeners.get(type);
            if (listener) {
                if (event.entity) {
                    const component = event.entity.components.get(this.type);
                    if (component) listener.call(component, event);
                } else {
                    const components = this.scene.components.all(this.type);
                    if (components) components.forEach((component: Component) => listener.call(component, event));
                }
            }
        }
    }
    
}