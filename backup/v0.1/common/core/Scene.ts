import Base from '@core/Scene';
import Component from '@common/core/Component';
import Entity from '@common/core/Entity';
import Storage from '@common/core/Storage';

export default class Scene extends Base<Entity, Component, Storage<Component>> {
    
    public constructor() {
        super(Entity, Storage);
    }
    
}