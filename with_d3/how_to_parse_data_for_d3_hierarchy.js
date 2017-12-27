// https://answers.splunk.com/answers/345419/what-would-be-the-wrapper-code-for-circle-packing.html
// Making the data look how we want it to for updateView to do its job
function formatDataBad(data) {
    let newData = {
        name: "root",
        children: []
    }
    let levels = ["Vulnerabilities.signature"];

    // For each data row, loop through the expected levels traversing the output tree
    data.forEach(function(d) {
        // Keep this as a reference to the current level
        var depthCursor = newData.children;
        // Go down one level at a time
        levels.forEach(function(property, depth) {

            // Look to see if a branch has already been created
            var index;
            depthCursor.forEach(function(child, i) {
                if (d[property] == child.name) index = i;
            });
            // Add a branch if it isn't there
            if (isNaN(index)) {
                depthCursor.push({
                    name: d[property],
                    children: []
                });
                index = depthCursor.length - 1;
            }
            // Now reference the new child array as we go deeper into the tree
            depthCursor = depthCursor[index].children;
            // This is a leaf, so add the last element to the specified branch
            if (depth === levels.length - 1) depthCursor.push({
                name: d.Vulnerabilities.dest,
                size: d.count
            });
        });
    });
    return {
        "name": "TBD",
        "children": data
    };

    //return formatted_data; // this is passed into updateView as 'data'
};

// https://answers.splunk.com/answers/345419/what-would-be-the-wrapper-code-for-circle-packing.html
// GOOD
function formatDataGood(data) {
    console.log(data);
    var newData = {
        name: "TBD",
        children: []
    };

    var map = [];

    for (i in data) {
        var sign = data[i].signature;
        if (!map[sign]) map[sign] = [];
        map[sign].push({
            "dest": data[i].dest,
            "count": data[i].count
        });
    }

    for (j in map) {
        var hosts = [];

        for (k in map[j]) {
            if (map[j][k].count) {
                hosts.push({
                    "name": map[j][k].dest,
                    "size": map[j][k].count
                });

            }
        }
        if (hosts.length > 0)
            newData.children.push({
                "name": j,
                "children": hosts
            });

    }

    console.log(newData);
    return newData;
};
