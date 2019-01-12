import Component, { Constructor as ComponentConstructor } from '@core/Component';
import Entity, { Constructor as EntityConstructor } from '@core/Entity';
import Storage, { IStorage } from '@core/Storage';

export default class Scene<E extends Entity> {
    
    public entities: Entities<E>;
    public components: Components<E> = new Components<E>(this);
    
    public constructor(type: EntityConstructor<E> = Entity as EntityConstructor<E>) {
        this.entities = new Entities(this, type);
    }
    
}

export type Constructor<E extends Entity, S extends Scene<E>> = new (type: EntityConstructor<E>) => Scene<E>;

class Entities<E extends Entity> {
    
    private scene: Scene<E>;
    private type: EntityConstructor<E>;
    
    public constructor(scene: Scene<E>, type: EntityConstructor<E> = Entity as EntityConstructor<E>) {
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

class Components<E extends Entity> {
    
    private scene: Scene<E>;
    private components: Map<ComponentConstructor, IStorage> = new Map();
    
    public constructor(scene: Scene<E>) {
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