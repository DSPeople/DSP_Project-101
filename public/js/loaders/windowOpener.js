/* exported openAppWindow */

function openAppWindow(width, height) {
  var deferred = Q.defer();

  $.get(`/api/openWindow?width=${width}&height=${height}`, function(data) {
    deferred.resolve(data);
  });

  return deferred.promise;
}
