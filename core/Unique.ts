import * as uuidv4 from 'uuid/v4';

export default class Unique {
    
    public id;
    
    public constructor() {
        this.id = uuidv4();
    }
    
}