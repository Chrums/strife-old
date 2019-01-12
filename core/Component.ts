import Entity from '@core/Entity';
import Unique from '@core/Unique';

export default class Component extends Unique {
    
    public entity;
    
    public constructor(entity) {
        super();
        this.entity = entity;
    }
    
}