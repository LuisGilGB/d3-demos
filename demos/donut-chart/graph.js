const RADIUS = 150;
const CHART_MARGIN = 5;
const EXTRA_SIZE = 150;

const getDimsFromRadius = r => {
    const size = r * 2;
    return {
        width: size,
        height: size,
        radius: r
    }
}

const dims = getDimsFromRadius(RADIUS);
const center = {
    x: dims.width / 2 + CHART_MARGIN,
    y: dims.height / 2 + CHART_MARGIN
}

const canvasEl = document.querySelector('.canvas');

// The SVG element
const svg = d3.select('.canvas')
    .append('svg')
    .attr('width', dims.width + EXTRA_SIZE)
    .attr('height', dims.height + EXTRA_SIZE);

// The SVG group that acts as the donut chart
const donutChart = svg.append('g')
    .attr('transform', `translate(${center.x}, ${center.y})`);

// The pie function calculates the angles that the chart elements need to be
// renderized in the right place and with the proper size.
const pie = d3.pie()
    .sort(null)
    .value(d => d.itemValue)

// The arcPath function takes the proper angles and returns the attributes
// the path element uses to build the right donut portion.
const arcPath = d3.arc()
    .outerRadius(dims.radius)
    .innerRadius(dims.radius / 2);

// Returns a color scale for the chart's items.
const color = d3.scaleOrdinal(d3['schemeSet2']);

const update = data => {
    color.domain(data.map(d => d.itemName));

    const donutPortions = donutChart.selectAll('path')
        .data(pie(data));

    donutPortions.exit().remove();

    donutPortions.attr('d', arcPath)
        .attr('stroke', '#fff')
        .attr('stroke-width', 3)
        .attr('fill', d => color(d.data.itemName));

    donutPortions.enter()
        .append('path')
        .attr('class', 'arc donut-portion')
        .attr('d', arcPath)
        .attr('stroke', '#fff')
        .attr('stroke-width', 3)
        .attr('fill', d => color(d.data.itemName));
}

document.addEventListener('itemadded', e => {
    update(chartData);
}, false);

update(chartData);