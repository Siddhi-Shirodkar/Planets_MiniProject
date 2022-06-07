const { parse } = require('csv-parse');
const fs = require('fs');

const habitablePlanets = [];
function ishabitableplannet(plannet) {
    return plannet['koi_disposition'] === 'CONFIRMED'
    && plannet['koi_insol'] > 0.36 && plannet['koi_insol'] < 1.11
    && plannet['koi_prad'] <1.6;
}
fs.createReadStream('kepler_data.csv')
    .pipe(parse({
        comment:'#',
        columns:true,
    }))
    .on('data',(data)=>{
        if(ishabitableplannet(data)){
            habitablePlanets.push(data);
        }
    })
    .on('end',()=>{
        console.log(habitablePlanets.map((plannet)=>{
            return plannet['kepler_name'];
        }))
        console.log(`The number of Habitable Plannets are ${habitablePlanets.length} `);
    })
    .on('error',(err)=>{
        console.log(err);
    })