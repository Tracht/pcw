function sortAtoZ (wikiResults, fieldName) {
    return wikiResults.sort(function (a, b) {
      var nameA = a[fieldName].toLowerCase();
      var nameB = b[fieldName].toLowerCase();
      
      if (nameA < nameB) //sort string ascending
        return -1
      if (nameA > nameB)
        return 1
      return 0 //default return value (no sorting)
    })
  }

function distance(lat1, lon1, lat2, lon2, unit) {
  // source: https://www.geodatasource.com/developers/javascript
    if ((lat1 === lat2) && (lon1 === lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit==="K") { dist = dist * 1.609344 }
      if (unit==="N") { dist = dist * 0.8684 }
      const roundedDistance = Math.round(dist * 100) / 100;
      return roundedDistance;
      // return Math.round(dist * 100) / 100;
    }
}

export { sortAtoZ, distance };