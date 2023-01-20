require('jest-fetch-mock').enableMocks()
const MPEGParse = require('../parse');
const parse = new MPEGParse()
const url = 'http://techslides.com/demos/sample-videos/small.mp4'

const testLayout = {'ftyp':{}, 'free':{}, 'mdat':{}, 'moov':{}}

beforeEach(() => {
  fetch.resetMocks()
})

test("Test rejected url of parse", async () => {
  fetch.mockReject(() => Promise.reject("Unavailable"));
  await expect(async () => await parse.layoutfromURL(url)).rejects.toThrow('Service Error: Unavailable')
});

test("Test parsing of url", async () => {
  fetch.disableMocks()
  const parsedData = await parse.layoutfromURL(url)
  const boxes = Object.keys(parsedData)
  expect(boxes).toEqual(Object.keys(testLayout)) 
});