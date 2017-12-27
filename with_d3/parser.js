/**
 * IPv4 based parse function 
 * @param  {Array} data - array of string values of IP addresses
 * @return {Object} - D# Hierarchy based object with nested objects of kind {name: "", children: [{},{}]}
 */
export function parseIPv4Data(data) {
    var newData = {
        name: "Computers by IP Address",
        children: []
    };

    var tempArr = [];

    // Maybe
    // var newObj = _.object(['name', 'children'], ['172', [TBD]]);
    // {name: "172", children: [TBD]}

    data.forEach(function(d, i) {

        // let ipObj = Qs.parse(d, {
        //     allowDots: true
        // })

        // console.log(ipObj);

        let ipArr = d.split('.')
        let ip1 = +ipArr[0],
            ip2 = +ipArr[1],
            ip3 = +ipArr[2],
            ip4 = +ipArr[3];
        let ipSum = ip1 + ip2 + ip3 + ip4;

        let existed1 = tempArr.find(function(el1) {
            return el1 && el1.name === ip1
        })
        if (existed1) {
            let existed2 = existed1.children.find(function(el2) {
                return el2 && el2.name === ip2
            })
            if (existed2) {
                let existed3 = existed2.children.find(function(el3) {
                    return el3 && el3.name === ip3
                })
                if (existed3) {
                    let existed4 = existed3.children.find(function(el4) {
                        return el4 && el4.name === ip4
                    })
                    if (existed4) {
                        console.log('Co? A nic...');
                    } else {
                        existed3.children.push({
                            // name: ip4,
                            name: d, // full IP Address as string value
                            // size: 10
                            size: ipSum
                        })
                    }
                } else {
                    existed2.children.push({
                        name: ip3,
                        children: [{
                            // name: ip4,
                            name: d,
                            // size: 10
                            size: ipSum
                        }]
                    })
                }
            } else {
                existed1.children.push({
                    name: ip2,
                    children: [{
                        name: ip3,
                        children: [{
                            // name: ip4,
                            name: d,
                            // size: 10
                            size: ipSum
                        }]
                    }]
                });
            }
        } else {
            // initial parent object and whole hierarchy skeleton
            tempArr.push({
                name: ip1,
                children: [{
                    name: ip2,
                    children: [{
                        name: ip3,
                        children: [{
                            // name: ip4,
                            // name: d,
                            name: d,
                            // size: 10
                            size: ipSum
                        }]
                    }]
                }]
            });
        }

    });

    newData.children = tempArr

    // console.log(newData);
    // console.log(JSON.stringify(newData, null, 2));

    return newData || data;
}

export function parseIPv6Data(data) {
    var newData = {
        name: "Computers by IP Address",
        children: []
    };

    //
    // TODO
    // 

    return newData || data;
}
