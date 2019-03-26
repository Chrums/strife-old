import Base from '@core/Scene';
import Component, { Constructor as ComponentConstructor } from '@common/core/Component';
import Entity from '@common/core/Entity';
import Storage from '@common/core/Storage';

export default class Scene extends Base<Entity, Storage<any>> {
    
    public constructor() {
        super(Entity, Storage);
    }
    
}