import Base from '@core/Entity';
import Scene from '@common/core/Scene';
import Hierarchy from '@common/components/Hierarchy';
import State from '@common/components/State';

export default class Entity extends Base {
    
    public get state(): State {
        return this.m_state;
    }
    private m_state: State;
    
    public get hierarchy(): Hierarchy {
        return this.m_hierarchy;
    }
    private m_hierarchy: Hierarchy;
    
    public constructor(scene: Scene) {
        super(scene);
        this.m_state = scene.components.add(State)(this);
        this.m_hierarchy = scene.components.add(Hierarchy)(this);
    }
    
    public destroy(): void {
        this.m_hierarchy.parent = undefined;
        this.m_hierarchy.children.forEach((child: Entity): void => child.destroy());
        this.scene.entities.remove(this);
    }
    
}