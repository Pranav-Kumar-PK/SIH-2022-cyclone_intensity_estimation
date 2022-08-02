let geojsonMerge = require("@mapbox/geojson-merge");
const fs = require("fs");

let geoJsonData = [];

(async () => {
  // Our starting point
  try {
    // Get the files as an array
    const files = await fs.promises.readdir("./data/bigearthnet_v1_labels");

    // Loop them all with the new for...of
    let i = 1;
    for (const file of files) {
      // const jsonFile = await fs.promises.readdir(`./data/bigearthnet_v1_labels/${file}`);
      // console.log(jsonFile.labels);
      // if (i==4) break;
      try {
        const data = fs.readFileSync(
          `./data/bigearthnet_v1_labels/${file}/labels.geojson`
        );
        let jsonData= JSON.parse(data);
        jsonData.geometry.type = "Point";
        jsonData.geometry.coordinates = jsonData.geometry.coordinates[0][0];
        const labelsArray= jsonData.properties.labels;
        
        for(let label of labelsArray){
          let newData = {
            "id": jsonData.id,
            "type": jsonData.type,
            "properties": {
                "labels": label,
                "datetime": jsonData.properties.datetime
            },
            "geometry": {
                "type": "Point",
                "coordinates": jsonData.geometry.coordinates
            }
        }
          geoJsonData.push(newData);
          // console.log(geoJsonData);
        }
        console.log(i);
      } catch (err) {
        console.error(err);
      }
      i++;
    } // End for...of

    console.log(JSON.stringify(geoJsonData));
    console.log(geoJsonData.length);
    // let mergedGeoJSON = geojsonMerge.merge(geoJsonData);
    // console.log(JSON.stringify(mergedGeoJSON));
    fs.writeFile ("bigEarth.json", JSON.stringify(geoJsonData), function(err) {
        if (err) throw err;
        console.log('complete');
        }
    );
  } catch (e) {
    // Catch anything bad that happens
    console.error("We've thrown! Whoops!", e);
  }
})(); // Wrap in parenthesis and call now


// console.log(JSON.stringify(mergedGeoJSON));
