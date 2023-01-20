(function (factory) {
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined' && typeof require !== 'undefined') {
        // CommonJS
        module.exports = factory();
    } else {
        // running in browser
        window.XMLUtils = factory();
    }
})(function () {
    /**
     * @class XMLUtils
     * @classdesc Class for parsing XML SMPTE-TT standart files
     * @param {string} xmlData - XML SMPTE-TT data to be parsed
     * Limited support for smpte:image elements
     */
    function XMLUtils(xmlData) {
        this.DOMParser = new DOMParser()
        this.parsedXML = this.DOMParser.parseFromString(xmlData, "text/xml")
    }
    XMLUtils.prototype = {
        getBASE64SmpteImageElements: function () {
            var imageElements = this.parsedXML.getElementsByTagName('smpte:image')
            return Array.from(imageElements).map(function(image){
                return "data:image/png;base64,"+image.innerHTML.trim()
            })
        },
    }
    return XMLUtils
})

