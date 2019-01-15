import * as uuidv4 from 'uuid/v4';

export interface Constructor<U extends Unique> {
    new (): U;
}

export default class Unique {
    
    public get id(): string {
        return this.m_id;
    }
    private m_id = uuidv4();
    
}