import {parseIPv4Data} from './parser.js'

// 
// https://bl.ocks.org/mbostock/4063530) - "static circle packing"
// 
var svg = d3.select("svg"),
    diameter = +svg.attr("width"),
    g = svg.append("g").attr("transform", "translate(2,2)"),
    format = d3.format(",d");

var pack = d3.pack()
    .size([diameter - 4, diameter - 4]);

// d3.json("flare.json", function(error, data) {
// d3.json("computers3.json", function(error, data) {

d3.json("computers.json", function(error, data) {
    data = parseIPv4Data(data);

    if (error) throw error;

    var root = d3.hierarchy(data)
        .sum(function(d) {
            return d.size;
        })
        .sort(function(a, b) {
            return b.value - a.value;
        });

    var node = g.selectAll(".node")
        .data(pack(root).descendants())
        .enter().append("g")
        .attr("class", function(d) {
            return d.children ? "node" : "leaf node";
        })
        .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

    node.append("title")
        .text(function(d) {
            return d.data.name + "\n" + format(d.value);
        });

    node.append("circle")
        .attr("r", function(d) {
            return d.r;
        });

    node.filter(function(d) {
            return !d.children;
        }).append("text")
        .attr("dy", "0.3em")
        .text(function(d) {
            return d.data.name.substring(0, d.r / 3);
        });
});
