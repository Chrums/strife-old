import Entity from '@core/Entity';
import Hierarchy from '@common/components/Hierarchy';
import Transform from '@common/components/Transform';

export default class extends Entity {
    
    public get hierarchy() {
        return this.components.get(Hierarchy);
    }
    
    public get transform() {
        return this.components.get(Transform);
    }
    
    public constructor(scene) {
        super(scene);
        this.components.add(Hierarchy);
        this.components.add(Transform);
    }
    
}