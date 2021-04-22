function createWikiAPI(lat, long){
    let wikiAPI = "https://en.wikipedia.org/w/api.php?origin=*";
    const params = {
      action: "query",
      format: "json",
      prop: "coordinates|pageimages|info",
      generator: "geosearch",
      inprop: "url",
      inlinkcontext: "Main%20Page",
      piprop: "thumbnail",
      pithumbsize: "350",
      pilimit: "50",
      ggscoord: `${lat}|${long}`,
      ggsradius: "1000", // radius in meters
      ggslimit: "100", // max. number of pages
    };

    Object.keys(params).forEach(key => {
      wikiAPI += "&" + key + "=" + params[key]
    });

    return wikiAPI;
  }

export {createWikiAPI };