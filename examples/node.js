var MPEGParse = require('../parse');
const url = 'http://demo.castlabs.com/tmp/text0.mp4'
const bunnyUrl = 'http://techslides.com/demos/sample-videos/small.mp4'
var parse = new MPEGParse()
var values = parse.layoutfromURL(bunnyUrl).then(console.log)


