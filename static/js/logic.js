// Creating the map object
var myMap = L.map("map", {
    center: [39.50, -118.35],
    zoom: 5
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  // Load the GeoJSON data.
  var geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  
  var geojson;
  
  // Get the data with d3.
  d3.json(geoData).then(function(data) {
  
   // console.log(data);
     //i=0;
     for (var i = 0; i < data.features.length; i++) {
        let geopoint = [data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0]];
        // console.log(geopoint);
        depth=data.features[i].geometry.coordinates[2];
        // console.log(depth);
        magnitude = data.features[i].properties.mag;
        // console.log(magnitude);
        lugar=data.features[i].properties.place;
        // console.log(lugar);

        // Conditionals for marker color based on earthquacke depth
        var color = "";
        if (depth <= 5) {
            color = "yellow";} 
            else if (depth > 5 && depth <= 10 ) {         
                color = "lightgreen";} 
                else if (depth > 10 && depth <= 15) {
                    color = "green";} 
                    else if (depth > 15) {
                        color = "darkgreen";}
                    
        //console.log(color);
        //Calculate marker size as a function of magnitude
        r = 10000*magnitude;
       // console.log(r);
        // Add circles to the map.
        L.circle(geopoint, {
            fillOpacity: 0.75,
            color: "lightgray",
            fillColor: color,
            // Adjust the radius.
            radius: r //
        }).bindPopup(`<h1>${lugar}</h1> <hr> <h3>Magnitude: ${magnitude}</h3> <hr> <h3>Depth: ${depth} Km</h3>`).addTo(myMap);
     }
    
   
  });

