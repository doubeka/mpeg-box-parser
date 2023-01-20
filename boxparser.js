function hextoString(hex) {
    return hex.match(/.{1,2}/g).map(function(v) {
        return String.fromCharCode(parseInt(v, 16))
    }).join('')
}
//Look into DataView and little endian
function intToHex(array) {
    let hexString = ""
    const genericArray = [...array]
    genericArray.forEach((byte)=> {
       hexString = hexString + byte.toString(16);
     })
    return hexString
}

(function (factory) {            
    if(typeof exports === 'object' && typeof module !== 'undefined') {
        // CommonJS
        module.exports = factory();
    }
    else {
        // browser
        window.BoxParser = factory();
    }
    })(function() {
    function BoxParser(){
        this.recursiveBoxes = ['moof', 'traf'] // Supported types of recursive boxes
        this.decoder = new TextDecoder()
        this.layout = {}
        this.parseBoxLayout = function (array, offset, size) {
            let pointer = offset
            const boxSize = intToHex(array.slice(pointer, pointer+=4)) // Non-sense
            const box = {
                size: parseInt(boxSize,16),
                type: this.decoder.decode(array.slice(pointer, pointer+=4)),
            }
            console.log("Type of box ", box.type, " Size of box ", box.size)
            if(box.type === 'mdat'){
                const mdatData = array.slice(pointer, pointer + box.size)
                const mdatDataString = this.decoder.decode(mdatData) // Extract and decode mdat string assuming UTF-8 and XML
                box.data = mdatDataString
            }
            this.layout[box.type] = box
            // Recursive parse of boxes of supported types
            if(this.recursiveBoxes.indexOf(box.type) > -1){        
                this.parseBoxLayout(array, pointer, box.size)
            }
            pointer = offset + box.size
            // Parse boxes in block
            if(pointer < size){
                this.parseBoxLayout(array, pointer, size)
            }
            // Return data
            return this.layout
        }   
    }

    BoxParser.prototype = {
        parse: function (arrayBuffer, parseMdat) {
            const int8View = new Uint8Array(arrayBuffer)
            return this.parseBoxLayout(int8View, 0, int8View.byteLength, parseMdat)
        },
    }
    return BoxParser
})
