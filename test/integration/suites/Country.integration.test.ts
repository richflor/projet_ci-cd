import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { describe } from 'mocha';
import { RootDB } from '../../utility/RootDB';
import { DB } from '../../../src/utility/DB';
import { CountryController } from '../../../src/controllers/CountryController';

chai.use(chaiAsPromised);

describe("Country CRUD", function () {

    before(async function () {
        // Vider la base de données de test
        await RootDB.Reset();
    });

    after(async function () {
        // Forcer la fermeture de la base de données
        await DB.Close();
    });

    it("Create a new country", async function () {
        const country = new CountryController();
        const result = await country.insert({
            name: "South Africa",
            capital: "Pretoria",
            population: 58048332,
            size: 1221037
        })

        expect(result[0].insertId).to.equal(1);
    });

    it("Create the same Country twice throws an exception", async function () {
        const country = new CountryController();

        await expect(country.insert({
            name: "South Africa",
            capital: "Pretoria",
            population: 58048332,
            size: 1221037
        })).to.be.rejected;

    });

});