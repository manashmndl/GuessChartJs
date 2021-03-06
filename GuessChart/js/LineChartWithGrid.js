// set the dimensions and margins of the graph
var margin = { top: 20, right: 20, bottom: 30, left: 50 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
// parse the date / time
var parseTime = d3.timeParse("%d-%b-%y");
// set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);
// define the line
var valueline = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });
// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("#chart_container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
// gridlines in x axis function
function make_x_gridlines() {
    return d3.axisBottom(x)
        .ticks(5);
}
// gridlines in y axis function
function make_y_gridlines() {
    return d3.axisLeft(y)
        .ticks(5);
}


// Get the data
d3.csv("data/data.csv", function(error, data) {
    if (error) throw error;
    // format the data
    data.forEach(function(d) {
        d.date = parseTime(d.date);
        d.close = +d.close;
    });

    data = data;
    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.close; })]);
    // add the X gridlines
    svg.append("g")
        .attr("class", "grid")
        .attr('id', 'xgrid')
        .attr("transform", "translate(0," + height + ")")
        .call(make_x_gridlines()
            .tickSize(-height)
            .tickFormat("")
        )
        // add the Y gridlines
    svg.append("g")
        .attr('id', 'ygrid')
        .attr("class", "grid")
        .call(make_y_gridlines()
            .tickSize(-width)
            .tickFormat("")
        )
        // add the valueline path.
    svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", valueline);
    // add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    // add the Y Axis
    svg.append("g")
        .call(d3.axisLeft(y));
});

var click_coords = [];


var bisector = d3.bisector(function(d) {
    return d.date;
}).left;

//Get transformed value
function getTranslation(transform) {
    // Create a dummy g for calculation purposes only. This will never
    // be appended to the DOM and will be discarded once this function 
    // returns.
    var g = document.createElementNS("http://www.w3.org/2000/svg", "g");

    // Set the transform attribute to the provided string value.
    g.setAttributeNS(null, "transform", transform);

    // consolidate the SVGTransformList containing all transformations
    // to a single SVGTransform of type SVG_TRANSFORM_MATRIX and get
    // its SVGMatrix. 
    var matrix = g.transform.baseVal.consolidate().matrix;

    // As per definition values e and f are the ones for the translation.
    return [matrix.e, matrix.f];
}

svg.on('click', function() {
    // click_coords.push(d3.mouse(this));
    // console.log(click_coords);

    var x0 = x.invert(d3.mouse(this)[0]);
    var y0 = y.invert(d3.mouse(this)[1]);

    console.log("X:  " + x0);
    console.log("y: " + y0);


    yTicks = d3.select("#xgrid");

    yTicks.selectAll('.tick').each(function(data) {
        var tick = d3.select(this);
        // var transform = tick.attr('transform');
        var transform = getTranslation(tick.attr('transform'));

        console.log("tick: " + data + ",  " + transform);
    });


});

d3.select('xgrid').selectAll('ticks').each(function(data) {
    var transform = d3.transform(tick.attr('transform')).translate;

    console.log('transform: ' + transform);
});

function clearMouseCoordinates() {
    click_coords = [];
}

function plot_circle(c) {

}

function drawIt() {
    for (var index in click_coords) {

    }
}