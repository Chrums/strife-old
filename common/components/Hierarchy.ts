import Component from '@core/Component';
import UpdateEvent from '@common/events/Update';

export default class Hierarchy extends Component {
    
    public parent;
    public children = [];
    
    @Component.On(UpdateEvent)
    public update(event) {
        console.log(event);
    }
    
}