import Component from '@common/core/Component';
import Scene from '@common/core/Scene';
import Entity from '@common/core/Entity';
import Event from '@common/core/Event';
import Hierarchy from '@common/components/Hierarchy';

class TestEvent extends Event {
    
}

class UpdateEvent extends Event {
    
}

@Component.Register
class Test extends Component {
    
    @Component.On(TestEvent)
    public Test(testEvent: TestEvent) {
        console.log('test');
    }
    
    @Component.On(UpdateEvent)
    public Update(updateEvent: UpdateEvent) {
        console.log('update');
    }
    
}

const s = new Scene();
const e0 = s.entities.add();
e0.components.add(Test);
const e1 = s.entities.add();
e1.components.add(Test);

s.dispatcher.emit(new TestEvent(e0));
s.dispatcher.emit(new UpdateEvent());

s.dispatcher.dispatch();