import Base from '@core/Storage';
import Component from '@common/core/Component';
import Entity from '@common/core/Entity';

export default class Storage<C extends Component> extends Base<Entity, C> {};