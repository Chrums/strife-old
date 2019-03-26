import Base from '@core/Entity';
import Scene from '@common/core/Scene';
import Hierarchy from '@common/components/Hierarchy';

export default class Entity extends Base<Entity> {
    
    public get hierarchy(): Hierarchy {
        return this.m_hierarchy;
    }
    private m_hierarchy: Hierarchy;
    
    public constructor(scene: Scene) {
        super(scene);
        this.m_hierarchy = this.components.add(Hierarchy);
    }
    
}