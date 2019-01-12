import Scene from '@core/Scene';
import Entity from '@common/core/Entity';

export default class extends Scene<Entity> {
    
    public constructor() {
        super(Entity);
    }
    
}