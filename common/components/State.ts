import Component from '@common/core/Component';
import Entity from '@common/core/Entity';
import UpdateEvent from '@common/events/Update';

export default class Hierarchy extends Component {
    
    public get state(): boolean {
        return this.m_state;
    }
    private m_state: boolean = true;
    
    public enable(): void {
        this.m_state = true;
    }
    
    public disable(): void {
        this.m_state = false;
    }
    
}