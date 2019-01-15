import Base from '@core/Scene';
import Entity from '@common/core/Entity';

import Hierarchy from '@common/components/Hierarchy';
import State from '@common/components/State';

export default class Scene extends Base<Entity> {
    
    public constructor() {
        super(Entity);
        this.components.register(State);
        this.systems.register(State);
        this.components.register(Hierarchy);
        this.systems.register(Hierarchy);
    }
    
}