import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

const chai = require('chai');
const sinonChai = require('sinon-chai');
const chaiEnzyme = require('chai-enzyme');

chai.use(sinonChai);
chai.use(chaiEnzyme());

Enzyme.configure({ adapter: new Adapter() });

global.expect = chai.expect;
