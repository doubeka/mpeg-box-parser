# MPEG­4 - Box Parser

Simple parser for ISO ISO Base Media File Format MPEG­4 Standart. 
Returns content of MDAT box.

## Requirements

- ArrayBuffer, TypedArrays, Fetch (Pollyfil for IE 11)
- Nodejs v18

## Usage
See [examples](./examples/). [Browser example](./examples/index.html) contains parsing of SMPTE images.

browser
```javascript
<script src="../boxparser.js"></script>
<script src="../mpeg.js"></script>
<script>
    var parse = new MPEGParse()
    parse.layoutfromURL(url).then(...)
</script>
```

nodejs CommonJS
```javascript
const MPEGParse = require('../parse');
const url = 'http://techslides.com/demos/sample-videos/small.mp4'
const parse = new MPEGParse()
const values = parse.layoutfromURL(url).then(...)
```

## Limitations

- Limited functionality for overview and size of boxes, expects mdat data of XML SMPTE
- Supports `'moof', 'traf'` recursive boxes