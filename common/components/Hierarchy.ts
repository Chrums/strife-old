import Component from '@core/Component';
import UpdateEvent from '@common/events/Update';

export default class Hierarchy extends Component {
    
    public parent;
    public children: any[] = [];
    
    public move(target?: any): void {
        if (this.parent == target) return;
        if (this.parent) {
            const hierarchy = this.parent.components.get(Hierarchy);
            if (hierarchy) hierarchy.removeChild(this.entity);
        }
        if (target) {
            const hierarchy = target.components.get(Hierarchy);
            if (hierarchy) hierarchy.addChild(this.entity);
        }
        this.parent = target;
    }
    
    private addChild(child) {
        this.children.push(child);
    }
    
    private removeChild(child) {
        const index = this.children.indexOf(child);
        if (index) this.children.splice(index, 1);
    }
    
}