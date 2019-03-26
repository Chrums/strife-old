import * as uuidv4 from 'uuid/v4';

export type Constructor<U extends Unique> = new (id?: string) => U;

export default class Unique {
    
    public get id(): string {
        return this.m_id;
    }
    private m_id = uuidv4();
    
    public constructor (id?: string) {
        if (typeof id !== 'undefined') this.m_id = id;
    }
    
}