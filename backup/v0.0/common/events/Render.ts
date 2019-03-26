import Event from '@common/core/Event';

export default class RenderEvent extends Event {
    
    public static Priority: number = 2048;
    
    public constructor() {
        super();
    }
    
}