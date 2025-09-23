const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
    // Write your code here
    while ((line = await readline())) {
        let tokens = line.split(" ");
        let a = parseInt(tokens[0]);

        function formatByte(bytes) {
            // 补全formatByte代码
            if(bytes===0) return '0B'
            let count = 0
            let copyBytes = bytes;
            while(copyBytes < 1024 && copyBytes>1){
                copyBytes = copyBytes  / 1024
                count += 1
            }
            let pair;
            switch(count){
                case 0:
                    pair = 'B'
                    break;
                case 1:
                    pair = 'KB'
                    break;
                case 2:
                    pair = 'MB'
                    break;
                case 3:
                    pair = 'GB'
                    break;
                default: 
                    pair = 'B'
            }
            if(copyBytes % 1 === 0) {
                return String(copyBytes.toFixed(0)+pair)
            }
            return String(copyBytes.toFixed(1)+pair)
        }

        const ret = formatByte(a)
        console.log(ret)
    }
})();

