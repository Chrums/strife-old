import Event from '@core/Event';

export default class RenderEvent extends Event {
    
    public static Priority = 2048;
    
    public context;
    
    public constructor(context) {
        super();
        this.context = context;
    }
    
}