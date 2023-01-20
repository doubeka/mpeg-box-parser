const MPEGParse = require('../mpeg');
const url = 'http://techslides.com/demos/sample-videos/small.mp4'
const parse = new MPEGParse()
parse.layoutfromURL(url).then(console.log)
