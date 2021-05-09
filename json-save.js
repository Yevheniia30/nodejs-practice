const fs = require('fs/promises')
const argv = process.argv
const path = require('path')
    const yargs=require('yargs/yargs')

// const dataFile = fs.readFile('data.json')
//     console.log(dataFile);
    
// const dataFile = path.join('demo', 'data.json')
//                 console.log(dataFile);


    ; (async () => {
        const dataFile = path.join('demo', 'data.json')

        const data = await fs.readFile(dataFile)
        // console.log(data);
        const content = JSON.parse(data)
        if (argv[2] === '--list') {
            console.table(content);
        } else {
            const [_, __, name, age] = argv
            content.push({ name, age })
            await fs.writeFile(dataFile, JSON.stringify(content, null, 2))
        }
    })()