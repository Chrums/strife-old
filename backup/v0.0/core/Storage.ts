import Component, { Constructor as ComponentConstructor } from '@core/Component';
import Entity from '@core/Entity';

export interface Constructor<IEntity extends Entity, IComponent extends Component<IEntity>, IStorage extends Storage<IEntity, IComponent>> {
    new (componentConstructor: ComponentConstructor<IEntity, IComponent>): IStorage;
}

export default class Storage<IEntity extends Entity, IComponent extends Component<IEntity>> {
    
    private m_constructor: ComponentConstructor<IEntity, IComponent>;
    private m_components: Map<string, IComponent> = new Map();
    
    public constructor(componentConstructor: ComponentConstructor<IEntity, IComponent>) {
        this.m_constructor = componentConstructor;
    }
    
    public add(entity: IEntity): IComponent {
        const component = new this.m_constructor(entity);
        this.m_components.set(entity.id, component);
        return component;
    }
    
    public remove(entity: IEntity): boolean {
        return this.m_components.delete(entity.id);
    }
    
    public get(entity: IEntity): Optional<IComponent> {
        return this.m_components.get(entity.id);
    }
    
    public forEach(callback: (component: IComponent, entity: IEntity, storage: Storage<IEntity, IComponent>) => void) {
        this.m_components.forEach((component: IComponent) => callback(component, component.entity, this));
    }
    
}