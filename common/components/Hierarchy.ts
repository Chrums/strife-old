import Component from '@core/Component';
import Entity from '@core/Entity';

export default class Hierarchy extends Component {
    
    public parent?: Entity;
    public children: Entity[] = [];
    
}