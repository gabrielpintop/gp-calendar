import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LocalStorageMock from './__mocks__/LocalStorageMock';
configure({ adapter: new Adapter() });
global.window.alert = jest.fn();
global.localStorage = new LocalStorageMock();