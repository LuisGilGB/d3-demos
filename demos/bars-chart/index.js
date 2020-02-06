const WIDTH = 600;
const HEIGHT = 600;

const svg = d3.select('.d3-canvas')
    .append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT);

const graphGroup = svg.append('g')
    .attr('width', WIDTH)
    .attr('height', HEIGHT);

const xAxisGroup = graphGroup.append('g')
    .attr('transform', `translate(0, ${WIDTH})`);

const yAxisGroup = graphGroup.append('g');

const x = d3.scaleBand()
    .range([0, WIDTH])
    .paddingInner(0.2)
    .paddingOuter(0.2);

const y = d3.scaleLinear()
    .range([HEIGHT, 0]);

const xAxis = d3.axisBottom(x);
const yAxis = d3.axisLeft(y)
    .ticks(3)
    .tickFormat(d => `d + ${units}`);

xAxisGroup.call(xAxis);
yAxisGroup.call(yAxis);