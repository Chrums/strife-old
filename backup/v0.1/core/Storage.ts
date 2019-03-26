import Component, { Constructor as ComponentConstructor } from '@core/Component';
import Entity from '@core/Entity';

export type Constructor<IEntity extends Entity, C extends Component<IEntity>, IStorage extends Storage<IEntity, C>> = new (componentConstructor: ComponentConstructor<IEntity, C>) => IStorage;

export default class Storage<IEntity extends Entity, C extends Component<IEntity>> {
    
    private m_componentConstructor: ComponentConstructor<IEntity, C>;
    private m_components: Map<string, C> = new Map();
    
    public constructor(componentConstructor: ComponentConstructor<IEntity, C>) {
        this.m_componentConstructor = componentConstructor;
    }
    
    public add(entity: IEntity, id?: string): C {
        let component = this.m_components.get(entity.id);
        if (typeof component === 'undefined') {
            component = new this.m_componentConstructor(entity, id);
            this.m_components.set(entity.id, component);
        }
        return component;
    }
    
    public remove(entity: IEntity): boolean {
        return this.m_components.delete(entity.id);
    }
    
    public get(entity: IEntity): Optional<C> {
        return this.m_components.get(entity.id);
    }
    
    public forEach(callback: (component: C, entity: IEntity, storage: Storage<IEntity, C>) => void) {
        this.m_components.forEach((component: C) => callback(component, component.entity, this));
    }
    
}