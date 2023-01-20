(function (factory) {
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        // CommonJS
        module.exports = factory();
    }
    else {
        // browser
        window.BoxParser = factory();
    }
})(function () {
    /**
     * @class BoxParser
     * @classdesc Parse layout of mpeg file and returns object with boxes, size and data(mdat)
     */
    function BoxParser() {
        this.recursiveBoxes = ['moof', 'traf'] // Supported types of recursive boxes
        this.decoder = new TextDecoder()
        this.layout = {}
        this.parseBoxLayout = function (array, offset, size) {
            var pointer = offset
            var box = {
                size: getByteArrayToInt(array.slice(pointer, pointer += 4)),
                type: this.decoder.decode(array.slice(pointer, pointer += 4)),
            }
            console.log("Type of box ", box.type, " Size of box ", box.size)
            if (box.type === 'mdat') {
                var mdatData = array.slice(pointer, pointer + box.size)
                var mdatDataString = this.decoder.decode(mdatData) // Extract and decode mdat string assuming UTF-8
                box.data = mdatDataString
            }
            this.layout[box.type] = box
            // Recursive parse of boxes of supported types
            if (this.recursiveBoxes.indexOf(box.type) > -1) {
                this.parseBoxLayout(array, pointer, box.size)
            }
            pointer = offset + box.size
            // Parse boxes in block
            if (pointer < size) {
                this.parseBoxLayout(array, pointer, size)
            }
            // Return data
            return this.layout
        }
    }
    BoxParser.prototype = {
        /**
         * Parses file layout
         * @param {ArrayBuffer} arrayBuffer array buffer of file to be parsed
         * @returns {object} parsed object
         */
        parse: function (arrayBuffer) {
            var int8View = new Uint8Array(arrayBuffer)
            return this.parseBoxLayout(int8View, 0, int8View.byteLength)
        },
    }
    return BoxParser
})

/**
 * Converts byte array to integer, little endian
 * @param {Int8Array} byteArray 
 * @returns {number} - integer value of byte array
 */
function getByteArrayToInt(byteArray) {
    return byteArray.reduce(function (acc, byte) { return (acc << 8) | byte })
}
