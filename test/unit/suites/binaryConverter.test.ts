
import { expect } from 'chai';
import { describe } from 'mocha';
import { convertToBinary } from "../../../src/formula/BinaryConverter";


describe("binary converter for positive integers", function () {

  it("test for 0", function () {
    expect(convertToBinary(0)).to.equal("0")
  });

  it("test for 1", function () {
    expect(convertToBinary(1)).to.equal("1")
  });

  it("test for 2", function () {
    expect(convertToBinary(2)).to.equal("10")
  });

  it("test for 3", function () {
    expect(convertToBinary(3)).to.equal("11")
  });

  it("test for 11", function () {
    expect(convertToBinary(11)).to.equal("1011")
  })

  it("test for 60", function () {
    expect(convertToBinary(60)).to.equal("111100")
  })

  it("test for 177", function () {
    expect(convertToBinary(177)).to.equal("10110001")
  })

});
