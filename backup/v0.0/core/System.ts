import Component, { Constructor as ComponentConstructor } from '@core/Component';
import Entity from '@core/Entity';
import Event, { Constructor as EventConstructor } from '@core/Event';
import Scene from '@core/Scene';
import Storage from '@core/Storage';

export interface Constructor<IEntity extends Entity, IComponent extends Component<IEntity>, ISystem extends System<IEntity, IComponent>> {
    new (scene: Scene<IEntity>, componentConstructor: ComponentConstructor<IEntity, IComponent>): ISystem;
}

type Callback<IEntity extends Entity, IEvent extends Event<IEntity>> = (event: IEvent) => void;

export default class System<IEntity extends Entity, IComponent extends Component<IEntity>> {
    
    public static Listeners: Map<ComponentConstructor<any, any>, Map<EventConstructor<any, any>, Callback<any, any>>> = new Map();
    
    public static On<IEntity extends Entity, IEvent extends Event<IEntity>>(eventConstructor: EventConstructor<IEntity, IEvent>): (target: any, identifier: string, descriptor: PropertyDescriptor) => void {
        return (target: any, identifier: string, descriptor: PropertyDescriptor): void => {
            const componentConstructor = target.constructor as ComponentConstructor<IEntity, any>;
            const listeners = System.Listeners.has(eventConstructor)
                ? System.Listeners.get(componentConstructor) as Map<EventConstructor<IEntity, IEvent>, Callback<IEntity, IEvent>>
                : System.Listeners.set(componentConstructor, new Map()).get(componentConstructor) as Map<EventConstructor<IEntity, IEvent>, Callback<IEntity, IEvent>>;
            listeners.set(eventConstructor, descriptor.value);
        };
    }
    
    private m_scene: Scene<IEntity>;
    private m_constructor: ComponentConstructor<IEntity, IComponent>;

    public constructor(scene: Scene<IEntity>, componentConstructor: ComponentConstructor<IEntity, IComponent>) {
        this.m_scene = scene;
        this.m_constructor = componentConstructor;
        if (System.Listeners.has(componentConstructor)) {
            console.log(componentConstructor);
            const listeners = System.Listeners.get(componentConstructor) as Map<EventConstructor<any, any>, Callback<any, Event<any>>>;
            listeners.forEach((listener: Callback<any, Event<any>>, eventConstructor: EventConstructor<any, any>) => this.m_scene.dispatcher.on(eventConstructor)(this.dispatch.bind(this)));
        }
    }
    
    private dispatch<IEvent extends Event<IEntity>>(event: IEvent) {
        const eventConstructor = event.constructor as EventConstructor<IEntity, typeof event>;
        const listeners = System.Listeners.get(this.m_constructor);
        if (listeners) {
            const listener = listeners.get(eventConstructor);
            if (listener) {
                if (event.entity) {
                    const component = event.entity.components.get(this.m_constructor);
                    if (component) listener.call(component, event);
                } else {
                    const components = this.m_scene.components.all(this.m_constructor);
                    if (components) components.forEach((component: Component<IEntity>) => listener.call(component, event));
                }
            }
        }
    }
    
}