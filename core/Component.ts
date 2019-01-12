import Entity from '@core/Entity';
import System from '@core/System';
import Unique from '@core/Unique';

export default class Component extends Unique {
    
    public static On(type) {
        return System.On(type);
    }
    
    public entity;
    
    public constructor(entity) {
        super();
        this.entity = entity;
    }
    
}