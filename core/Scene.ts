import Component, { Constructor as ComponentConstructor } from '@core/Component';
import Entity, { Constructor as EntityConstructor } from '@core/Entity';
import Storage, { IStorage } from '@core/Storage';

export default class Scene<E extends Entity = Entity> {
    
    public entities: Entities;
    public components: Components = new Components(this);
    
    public constructor(type: EntityConstructor<E> = Entity as EntityConstructor<E>) {
        this.entities = new Entities(this, type);
    }
    
}

export type Constructor<S extends Scene = Scene> = new () => Scene;

class Entities<E extends Entity = Entity> {
    
    private scene: Scene;
    private type: EntityConstructor<E>;
    
    public constructor(scene: Scene, type: EntityConstructor<E> = Entity as EntityConstructor<E>) {
        this.scene = scene;
        this.type = type;
    }
    
    public add(): E {
        const entity = new this.type(this.scene);
        // TODO: Implement this...
        return entity;
    }
    
    public remove(entity: E): boolean {
        // TODO: Implement this...
        return false;
    }
    
}

class Components {
    
    private scene: Scene;
    private components: Map<ComponentConstructor, IStorage> = new Map();
    
    public constructor(scene: Scene) {
        this.scene = scene;
    }
    
    public register<C extends Component>(type: ComponentConstructor<C>): void {
        const storage = new Storage(type);
        this.components.set(type, storage);
    }
    
    public add<C extends Component>(type: ComponentConstructor<C>): (entity: Entity) => C {
        const storage = this.components.get(type) as Storage<C>;
        return Storage.prototype.add.bind(storage);
    }
    
    public remove<C extends Component>(type: ComponentConstructor<C>): (entity: Entity) => boolean {
        const storage = this.components.get(type) as Storage<C>;
        return Storage.prototype.remove.bind(storage);
    }
    
    public get<C extends Component>(type: ComponentConstructor<C>): (entity: Entity) => Optional<C> {
        const storage = this.components.get(type) as Storage<C>;
        return Storage.prototype.get.bind(storage);
    }
    
}