import Entity from '@core/Entity';
import Event, { Constructor as EventConstructor } from '@core/Event';
import Scene from '@core/Scene';
import Unique from '@core/Unique';

export type Constructor<EntityType extends Entity<EntityType>, ComponentType extends Component<EntityType>> = new (entity: EntityType) => ComponentType;

type Callback<EntityType extends Entity<EntityType>, EventType extends Event<EntityType>> = (event: EventType) => void;

export default class Component<EntityType extends Entity<EntityType>> extends Unique {
    
    public static Initialize<EntityType extends Entity<EntityType>>(scene: Scene<EntityType, any>) {
        Component.Constructors.forEach((componentConstructor: Constructor<EntityType, any>): void => scene.components.register(componentConstructor));
    }
    
    public static Register<ComponentType extends Component<any>>(componentConstructor: Constructor<any, ComponentType>): void {
        Component.m_componentConstructors.push(componentConstructor);
    }
    
    public static get Constructors(): Constructor<any, any>[] {
        return Component.m_componentConstructors;
    }
    private static m_componentConstructors: Constructor<any, any>[] = [];
    
    public static On<EntityType extends Entity<EntityType>, EventType extends Event<EntityType>>(eventConstructor: EventConstructor<EntityType, EventType>): (target: any, identifier: string, descriptor: PropertyDescriptor) => void {
        return (target: any, identifier: string, descriptor: PropertyDescriptor): void => {
            const componentConstructor = target.constructor as Constructor<EntityType, any>;
            const listeners = Component.Listeners.has(eventConstructor)
                ? Component.Listeners.get(componentConstructor) as Map<EventConstructor<EntityType, EventType>, Callback<EntityType, EventType>>
                : Component.Listeners.set(componentConstructor, new Map()).get(componentConstructor) as Map<EventConstructor<EntityType, EventType>, Callback<EntityType, EventType>>;
            listeners.set(eventConstructor, descriptor.value);
        };
    }
    
    public static get Listeners(): Map<Constructor<any, any>, Map<EventConstructor<any, any>, Callback<any, any>>> {
        return Component.m_listeners;
    }
    private static m_listeners: Map<Constructor<any, any>, Map<EventConstructor<any, any>, Callback<any, any>>> = new Map();

    public get entity(): EntityType {
        return this.m_entity;
    }
    private m_entity: EntityType;
    
    public constructor(entity: EntityType) {
        super();
        this.m_entity = entity;
    }
    
}