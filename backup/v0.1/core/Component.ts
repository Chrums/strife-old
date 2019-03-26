import Entity from '@core/Entity';
import Scene from '@core/Scene';
import Unique from '@core/Unique';

export type Constructor<IEntity extends Entity, IComponent extends Component<IEntity>> = new (entity: IEntity, id?: string) => IComponent;

export default class Component<IEntity extends Entity> extends Unique {
    
    public static Register(componentConstructor: Function) {
        Scene.Register(componentConstructor as unknown as Constructor<Entity, Component<Entity>>);
    }
    
    public get entity(): IEntity {
        return this.m_entity;
    }
    private m_entity: IEntity;
    
    public constructor(entity: IEntity, id?: string) {
        super(id);
        this.m_entity = entity;
    }
    
}