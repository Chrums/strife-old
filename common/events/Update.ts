import Event from '@core/Event';

export default class UpdateEvent extends Event {
    
    public static Priority = 1024;
    
    public constructor() {
        super();
        
    }
    
}