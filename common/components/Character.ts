import Component from '@core/Component';
import UpdateEvent from '@common/events/Update';
import RenderEvent from '@common/events/Render';
import InputEvent from '@common/events/Input';

export default class Character extends Component {
    
    @Component.On(UpdateEvent)
    public update(event) {
        
    }
    
    @Component.On(RenderEvent)
    public render(event) {
        event.context.fillStyle = "blue";
        event.context.fillRect(this.entity.transform.position, 0, 10, 10);
    }
    
    @Component.On(InputEvent)
    public input(event) {
        if (event.direction == "left") this.entity.transform.position--;
        if (event.direction == "right") this.entity.transform.position++;
    }

}