(function (factory) {
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined' && typeof require !== 'undefined') {
        // CommonJS
        module.exports = factory();
    } else {
        // running in browser
        window.parser = factory();
    }
})(function() {
    function XMLUtils(xmlData){ 
        this.DOMParser = new DOMParser()
        this.parsedXML = parser.parseFromString(xmlData,"text/xml")
    }
    XMLUtils.prototype = {
            getImageElement: function(xmlData) {
               
            },
    }   
  return MPEGParse
})

