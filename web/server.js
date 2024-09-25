const fs = require('fs');
const path = require('path');
const os = require('os');
const express = require('express');
const app = express();
const redis = require('redis');
const redisClient = redis.createClient({
  host: 'redis',
  port: 6379
});

app.get('/', function(req, res) {
    redisClient.get('numVisits', function(err, numVisits) {
        numVisitsToDisplay = parseInt(numVisits) + 1;
        if (isNaN(numVisitsToDisplay)) {
            numVisitsToDisplay = 1;
        }
       res.send(os.hostname() +': Number of visits is: ' + numVisitsToDisplay + '\n');
        numVisits++;
        redisClient.set('numVisits', numVisits);
    });
});

const dirs = fs.readdirSync('node_modules');
const data = {};
//add ones you care about
const trackedPackages = ['express', 'passport', 'body-parser'];
dirs.forEach(function(dir) {

   if(trackedPackages.indexOf(dir) > -1){
      try{
        const json = JSON.parse(
          fs.readFileSync(path.join('node_modules', dir, 'package.json'), 'utf8')
        );
        data[dir] = json.version;
      }catch(e){
        console.log(`failed to read/parse package.json for ${dir}`, e);
      }
   }

});
console.debug(data['express']); //= 4.11.2
app.listen(5000, function() {
    console.log('Web application is listening on port 5000');
});
