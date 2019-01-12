import Component from '@core/Component';
import Entity from '@core/Entity';

export default class Storage {
    
    private type;
    private components = new Map();
    
    public constructor(type) {
        this.type = type;
    }
    
    public add(entity) {
        const component = new this.type(entity);
        this.components.set(entity.id, component);
        return component;
    }
    
    public remove(entity) {
        return this.components.delete(entity.id);
    }
    
    public get(entity) {
        return this.components.get(entity.id);
    }
    
}