(function (factory) {
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined' && typeof require !== 'undefined') {
        // CommonJS
        module.exports = factory(require('./boxparser.js'));
    } else {
        // running in browser
        window.parser = factory(BoxParser);
    }
})(function(BoxParser) {
    function MPEGParse(){ 
        this.BoxParser = new BoxParser()
    }
    MPEGParse.prototype = {
            layoutfromURL: function(url) {
                // Pollyfill this for IE 11
                return fetch(url)
                .then(res => {
                    console.log("Sucessfully loaded file: ", url)
                    return res.arrayBuffer()
                })
                .then((input) => { return this.BoxParser.parse(input) } )
                .catch((error) => {
                    throw new Error("Service Error: " + error);
                })
            },
    }   
  return MPEGParse
})