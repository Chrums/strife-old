import Base from '@core/Scene';
import Component from '@common/core/Component';
import Entity from '@common/core/Entity';
import System from '@common/core/System';

import Hierarchy from '@common/components/Hierarchy';
import State from '@common/components/State';

export default class Scene extends Base<Entity, Component> {
    
    public constructor() {
        super(Entity);
        this.components.register(State);
        this.components.register(Hierarchy);
    }
    
}