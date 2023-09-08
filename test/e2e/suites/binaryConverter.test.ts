import axios from 'axios';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { describe } from 'mocha';
import { TestServer } from '../../utility/TestServer';

chai.use(chaiAsPromised);

describe("convert_to_binary route", function () {
  
  before(async function() {
    // Lancer le serveur
    await TestServer.Start();
  });

  after(async function() {
    // Arreter le serveur
    await TestServer.Stop();    
  });

  it("Return a binary from an integer input", async function () {
    const result = await axios.post(process.env.API_HOST + '/convert_to_binary', 
      {
        number:11,
      }, 
      {
        headers: {
          Authorization: "Bearer INSERT HERE"
        }
      }
    );

    chai.expect(result.status).to.equal(200);
    chai.expect(result.data.integer).to.equal(11);
    chai.expect(result.data.binary).to.equal("1011");    
  });

  it("Param must be an integer", async function () {

    const response = await axios.post(process.env.API_HOST + '/convert_to_binary', 
      {
        number:11.12,
      }, 
      {        
        headers: {
          Authorization: "Bearer INSERT HERE"
        },
        validateStatus: (status) => { return true }
      }
    );

    chai.expect(response.status).to.equal(400);
    chai.expect(response.data.structured).to.equal('validation/failed');

  });

  it("Param must be positive", async function () {

    const response = await axios.post(process.env.API_HOST + '/convert_to_binary', 
      {
        number: -11,
      }, 
      {        
        headers: {
          Authorization: "Bearer INSERT HERE"
        },
        validateStatus: (status) => { return true }
      }
    );

    chai.expect(response.status).to.equal(400);
    chai.expect(response.data.structured).to.equal('validation/failed');

  });

  it("Parameter missing", async function () {

    const response = await axios.post(process.env.API_HOST + '/convert_to_binary', 
      {
        integer:11,
      }, 
      {        
        headers: {
          Authorization: "Bearer INSERT HERE"
        },
        validateStatus: (status) => { return true }
      }
    );

    chai.expect(response.status).to.equal(400);
    chai.expect(response.data.structured).to.equal('validation/failed');

  });


});