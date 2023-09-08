import axios from 'axios';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { describe } from 'mocha';
import { DB } from '../../../src/utility/DB';
import { RootDB } from '../../utility/RootDB';
import { TestServer } from '../../utility/TestServer';

chai.use(chaiAsPromised);

describe("Country CRUD routes", function () {
  
  before(async function() {
    // Vider la base de données de test
    await RootDB.Reset();
    // Lancer le serveur
    await TestServer.Start();
  });

  after(async function() {
    // Forcer la fermeture de la base de données
    await DB.Close();
    // Arreter le serveur
    await TestServer.Stop();    
  });

  it("Create a new country", async function () {
    const result = await axios.post(process.env.API_HOST + '/country', 
      {
        name: "South Africa",
        capital: "Pretoria",
        population: 58048332,
        size: 1221037
      }, 
      {
        headers: {
          Authorization: "Bearer INSERT HERE"
        }
      }
    );

    chai.expect(result.status).to.equal(200);
    chai.expect(result.data.id).to.equal(1);    
  });

  it("Create the same country twice returns an error", async function () {

    const response = await axios.post(process.env.API_HOST + '/country', 
      {
        name: "South Africa",
        capital: "Pretoria",
        population: 58048332,
        size: 1221037
      }, 
      {        
        headers: {
          Authorization: "Bearer INSERT HERE"
        },
        validateStatus: (status) => { return true }
      }
    );

    chai.expect(response.status).to.equal(400);
    chai.expect(response.data.structured).to.equal('sql/failed');

  });

  it("Population being negative returns an error", async function () {

    const response = await axios.post(process.env.API_HOST + '/country', 
      {
        name: "France",
        capital: "Paris",
        population: -68042591,
        size: 672051
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

  it("Population not an int returns an error", async function () {

    const response = await axios.post(process.env.API_HOST + '/country', 
      {
        name: "France",
        capital: "Paris",
        population: 68042591.255,
        size: 672051
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

  it("Size being negative returns an error", async function () {

    const response = await axios.post(process.env.API_HOST + '/country', 
      {
        name: "France",
        capital: "Paris",
        population: 68042591,
        size: -672051
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

  it("Size not an int returns an error", async function () {

    const response = await axios.post(process.env.API_HOST + '/country', 
      {
        name: "France",
        capital: "Paris",
        population: 68042591,
        size: 672051.155
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

  it("Input missing", async function () {

    const response = await axios.post(process.env.API_HOST + '/country', 
      {
        name: "France",
        capital: "Paris",
        population: 68042591
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

  it("Input not accepted", async function () {

    const response = await axios.post(process.env.API_HOST + '/country', 
      {
        name: "France",
        capital: "Paris",
        population: 68042591,
        size: 672051,
        input: "input"
      }, 
      {        
        headers: {
          Authorization: "Bearer INSERT HERE"
        },
        validateStatus: (status) => { return true }
      }
    );

    chai.expect(response.status).to.equal(400);
    chai.expect(response.data.structured).to.equal('sql/failed');

  });

});