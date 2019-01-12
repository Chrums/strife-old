import Component, { Constructor as ComponentConstructor } from '@core/Component';
import Entity from '@core/Entity';

export interface IStorage {
    add(entity: Entity): Component;
    remove(entity: Entity): boolean;
    get(entity: Entity): Optional<Component>;
}

export default class Storage<C extends Component> implements IStorage {
    
    private type: ComponentConstructor<C>;
    private components: Map<string, C> = new Map();
    
    public constructor(type: ComponentConstructor<C>) {
        this.type = type;
    }
    
    public add(entity: Entity): C {
        const component = new this.type(entity);
        this.components.set(entity.id, component);
        return component;
    }
    
    public remove(entity: Entity): boolean {
        return this.components.delete(entity.id);
    }
    
    public get(entity: Entity): Optional<C> {
        return this.components.get(entity.id);
    }
    
}