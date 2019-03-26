import Component from '@common/core/Component';
import Entity from '@common/core/Entity';

@Component.Register
export default class Hierarchy extends Component {
    
    public get parent(): Optional<Entity> {
        return this.m_parent;
    }
    public set parent(parent: Optional<Entity>) {
        if (this.m_parent == parent) return;
        if (parent) parent.hierarchy.children.push(this.entity);
        if (this.m_parent) this.m_parent.hierarchy.m_children.splice(this.m_parent.hierarchy.m_children.indexOf(this.entity));
        this.m_parent = parent;
    }
    private m_parent?: Entity;
    
    public get children(): Entity[] {
        return this.m_children;
    }
    private m_children: Entity[] = [];
    
}