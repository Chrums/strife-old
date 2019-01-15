import Event from '@common/core/Event';

export default class UpdateEvent extends Event {
    
    public static Priority: number = 1024;
    
    public constructor() {
        super();
    }
    
}