const config = {
    APPLICATION_ID: '1PB4TPLMI1',
    SEARCH_ONLY_API_KEY: 'd1cfdc2763ff5a7106fadd3de85c030e',
    ADMIN_API_KEY: '01d4088b9ea0953c45557e52d9dde71f'
  };
  
  const client = algoliasearch(config.APPLICATION_ID, config.SEARCH_ONLY_API_KEY);
  const index = client.initIndex('Cities');
  autocomplete('#location', { hint: true }, [
    {
      source: autocomplete.sources.hits(index /*{ hitsPerPage: 5 }*/),
      displayKey: 'name',
      templates: {
        suggestion: function(suggestion) {
          return suggestion._highlightResult.name.value;
        }
      }
    }
  ]).on('autocomplete:selected', function(event, suggestion, dataset, context) {
    console.log(event, suggestion, dataset, context);
  });