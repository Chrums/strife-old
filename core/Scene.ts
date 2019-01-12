import Component from '@core/Component';
import Entity from '@core/Entity';
import Storage from '@core/Storage';

export default class Scene {
    
    public entities = new Entities(this);;
    public components = new Components(this);
    
}

class Entities {
    
    private scene;
    private type;
    
    public constructor(scene) {
        this.scene = scene;
    }
    
    public register(type) {
        this.type = type;
    }
    
    public add() {
        const entity = new this.type(this.scene);
        // TODO: Implement this...
        return entity;
    }
    
    public remove(entity) {
        // TODO: Implement this...
        return false;
    }
    
}

class Components {
    
    private scene;
    private components = new Map();
    
    public constructor(scene) {
        this.scene = scene;
    }
    
    public register(type) {
        const storage = new Storage(type);
        this.components.set(type, storage);
    }
    
    public add(type) {
        const storage = this.components.get(type);
        return Storage.prototype.add.bind(storage);
    }
    
    public remove(type) {
        const storage = this.components.get(type);
        return Storage.prototype.remove.bind(storage);
    }
    
    public get(type) {
        const storage = this.components.get(type);
        return Storage.prototype.get.bind(storage);
    }
    
}