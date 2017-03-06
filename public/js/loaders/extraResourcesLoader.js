/* exported loadExtraResources */

function loadExtraResources() {
  var deferred = Q.defer();

  $.get('/api/extraResourcesLoader', function(data) {
    deferred.resolve(data);
  });

  return deferred.promise;
}
