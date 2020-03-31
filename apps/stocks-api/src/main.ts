/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/
import { Server } from 'hapi';
import { environment } from './environments/environment';
const rp = require('request-promise');
var HashMap = require('hashmap');


const init = async () => {

  var cache = new HashMap();
 
  const server = new Server({
    port: 3333,
    host: 'localhost',
    routes: {
      cors: true
  }
  });



  server.route({
    method: 'GET',
    path: '/beta/stock/{symbol}/chart/{period}',
    handler: async (request, h) => {
      
      const { symbol, period } = request.params;
      const { token } = request.query;

      const url = `${environment.apiURL}/beta/stock/${symbol}/chart/${period}?token=${token}`;

      if(cache.get(url)){
        console.log("CACHE HIT");
        return cache.get(url);
      }
      let resp = await rp(url);

      cache.set(url, resp);

      return resp;
    }
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
