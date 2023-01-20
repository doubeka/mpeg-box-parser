const MPEGParse = require('../mpeg');
const parse = new MPEGParse()
const validUrl = 'http://techslides.com/demos/sample-videos/small.mp4'
const testLayout = { 'ftyp': {}, 'free': {}, 'mdat': {}, 'moov': {} }

describe('Basic functional tests for MPEG Parser', () => {
  test("Test of valid URL string", async () => {
    const parsedData = await parse.layoutfromURL(validUrl)
    const boxes = Object.keys(parsedData)
    expect(boxes).toEqual(Object.keys(testLayout))
  });
  test("Test of invalid URL string", async () => {
    const invalidUrl = 'http://techslides.com/demos/sample-videos/small.jpg'
    await expect(async () => await parse.layoutfromURL(invalidUrl)).rejects.toThrow('Invalid file URL')
  });
  test("Test layout parsing", async () => {
    const parsedData = await parse.layoutfromURL(validUrl)
    const boxes = Object.keys(parsedData)
    expect(boxes).toEqual(Object.keys(testLayout))
  });

});