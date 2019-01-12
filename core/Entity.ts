import Component from '@core/Component';
import Scene from '@core/Scene';
import Unique from '@core/Unique';

export default class Entity extends Unique {
    
    public scene;
    public components = new Components(this);
    
    public constructor(scene) {
        super();
        this.scene = scene;
    }
    
}

class Components {
    
    private entity;
    
    public constructor(entity) {
        this.entity = entity;
    }
    
    public add(type) {
        return this.entity.scene.components.add(type)(this.entity);
    }
    
    public remove(type) {
        return this.entity.scene.components.remove(type)(this.entity);
    }
    
    public get(type) {
        return this.entity.scene.components.get(type)(this.entity);
    }
    
}