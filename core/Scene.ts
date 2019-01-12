import Component from '@core/Component';
import Dispatcher from '@core/Dispatcher';
import Entity from '@core/Entity';
import Storage from '@core/Storage';
import System from '@core/System';

export default class Scene {
    
    public dispatcher = new Dispatcher();
    public entities = new Entities(this);;
    public components = new Components(this);
    public systems =  new Systems(this);
    
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
        return new this.type(this.scene);
    }
    
    public remove(entity) {
        return this.scene.components.remove(entity);
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
    
    public remove(...args) {
        if (args[0] instanceof Entity) this.removeByEntity(args[0]);
        else if (args[0].prototype instanceof Component) this.removeByComponent(args[0]);
        else throw new Error();
    }
    
    private removeByEntity(entity) {
        let result = false;
        this.components.forEach((storage) => result = result || storage.remove(entity));
        return result;
    }
    
    private removeByComponent(type) {
        const storage = this.components.get(type);
        return Storage.prototype.remove.bind(storage);
    }
    
    public get(type) {
        const storage = this.components.get(type);
        return Storage.prototype.get.bind(storage);
    }
    
    public all(type) {
        return this.components.get(type);
    }
    
}

class Systems {
    
    private scene;
    private systems = new Map();
    
    public constructor(scene) {
        this.scene = scene;
    }
    
    public register(type) {
        const system = new System(this.scene, type);
        this.systems.set(type, system);
    }
    
}