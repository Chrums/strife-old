import Component from '@core/Component';

export default class Transform extends Component {
    
    public data = new Float32Array(4);
    
    public get position() {
        return this.data[1];
    }
    
    public set position(value) {
        this.data[1] = value;
    }
    
    public get scale() {
        return this.data[0];
    }
    
    public set scale(value) {
        this.data[0] = value;
    }
    
    public constructor(entity) {
        super(entity);
        this.data[0] = 1.0;
        this.data[3] = 1.0;
    }
    
    public toGlobal() {
        if (this.entity.hierarchy.parent) return multiply(this.entity.hierarchy.parent.transform.toGlobal(), this.data);
        else return this.data;
    }

}

function multiply(a, b) {
    const result = new Float32Array(4);
    result[0] = a[0] * b[0] + a[1] * b[2];
    result[1] = a[0] * b[1] + a[1] * b[3];
    result[2] = a[2] * b[2] + a[3] * b[2];
    result[3] = a[2] * b[3] + a[3] * b[3];
    return result;
}