function createWikiAPI(lat, long, radius){
    let wikiAPI = "https://en.wikipedia.org/w/api.php?origin=*";
    const params = {
      action: "query",
      format: "json",
      prop: "coordinates|pageimages|info",
      generator: "geosearch",
      ggscoord: `${lat}|${long}`,
      ggsradius: radius, // radius in meters, must be between 10 and 10000
      ggslimit: "100", // max. number of pages
      inprop: "url",
      piprop: "thumbnail", 
      pithumbsize: "350", // max width in pixels of thumbnail images
      pilimit: "50", // how many pages to return
     
    };

    Object.keys(params).forEach(key => {
      wikiAPI += "&" + key + "=" + params[key]
    });

    return wikiAPI;
  }

export { createWikiAPI };