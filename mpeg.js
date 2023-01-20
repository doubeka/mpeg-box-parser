(function (factory) {
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined' && typeof require !== 'undefined') {
        // CommonJS
        module.exports = factory(require('./boxparser.js'));
    } else {
        // running in browser
        window.MPEGParse = factory(BoxParser);
    }
})(function (BoxParser) {
    /**
     * @class MPEGParse
     * @classdesc Class for parsing mpeg files
     * Using BoxParser to parse layout of file
     */
    function MPEGParse() {
        this.BoxParser = new BoxParser()
    }
    MPEGParse.prototype = {
        /** 
         * @param {string} url - valid URL of file to be parsed
         * @returns {object} - parsed file
        */
        layoutfromURL: function (url) {
            var self = this
            // Allow only valid mp4 URLs for current state of implementation
            var validateURLExp = /^(http:\/\/|https:\/\/|www\.).*(\.mp4)$/ig;
            if (!validateURLExp.test(url)) {
                throw new Error("Invalid file URL");
            }
            // IE 11 needs pollyfil on fetch
            return fetch(url)
                .then(function (res) {
                    console.log("Sucessfully loaded file: ", url)
                    return res.arrayBuffer()
                })
                .then(function (buffer) { return self.BoxParser.parse(buffer) })
                .catch(function (error) {
                    throw new Error("Service Error: " + error);
                })
        },
    }
    return MPEGParse
})