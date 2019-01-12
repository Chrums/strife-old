import Event from '@core/Event';

export default class InputEvent extends Event {
    
    public direction;
    
    public constructor(direction) {
        super();
        this.direction = direction;
    }
    
}