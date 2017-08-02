const chai = require('chai');
const sinonChai = require('sinon-chai');
const chaiEnzyme = require('chai-enzyme');

chai.use(sinonChai);
chai.use(chaiEnzyme());

global.expect = chai.expect;
