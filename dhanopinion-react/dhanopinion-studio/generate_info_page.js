const fs = require('fs');

const infoCentrePage = {
  _id: 'informationCentreSingleton',
  _type: 'informationCentrePage',
  title: 'Information Centre',
  filtersTitle: 'Filters',
  searchPlaceholder: 'Input Keyword...',
  noResultsText: 'No articles match your filters.'
};

fs.writeFileSync('info_centre_page.ndjson', JSON.stringify(infoCentrePage) + '\n');
console.log('Generated info_centre_page.ndjson');
