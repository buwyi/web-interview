const { deflate } = require("zlib");

const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    const versions = (await readline()).split(' ');
    const match = await readline();

    function matchVersions(versions, match) {
        // 补全这里的代码

        switch(match[0]){
            case '^':
                return minorMatch(versions,match)
            case '~':
                return patchMatch(versions, match)
            default:
                return exactMatch(versions, match)
        }

    }

    function minorMatch(versions, match){
      let result = []
      const compare = match.slice(1).split('.')[0]
      versions.forEach((version) => {
        let copyVersion = version
        if(copyVersion.split('.')[0]===compare){
          result.push(version)
        }
      })
      return result
    }

    function patchMatch(versions, match){
      let result = []
      const compare = match.slice(1).split('.').slice(0,2).join('.')
      versions.forEach((version) => {
        let copyVersion = version
        if(copyVersion.split('.').slice(0,2).join('.')===compare){
          result.push(version)
        }
      })
      return result
    }

    function exactMatch(versions, match){
      if(match.split('.').length === 1){
        return minorMatch(versions, '^'+match)
      }
      else if(match.split('.').length === 2){
        return patchMatch(versions, '~'+match)
      }
    }

    const result = matchVersions(versions, match);
    console.log(result.join(' '));
}()
