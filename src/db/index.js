const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
  hosts: ['http://localhost:9200/']
});

client.ping({
  requestTimeout: 30000,
}, function (error) {
  if (error) {
    console.error('Elasticsearch cluster is down!');
  } else {
    console.log('Everything is ok');
  }
});

// Create a books index

// client.indices.create({
//   index: 'books'
// }, function (error, response, status) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("created a new index", response);
//   }
// });

module.exports = {client};
