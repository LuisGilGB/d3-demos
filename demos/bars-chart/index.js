const WIDTH = 600;
const HEIGHT = 600;

const SMALL_MARGIN = 20;
const LARGE_MARGIN = 100;

const margin = {top: SMALL_MARGIN, right: SMALL_MARGIN, bottom: LARGE_MARGIN, left: LARGE_MARGIN}
const chartWidth = WIDTH - margin.left - margin.right;
const chartHeight = HEIGHT - margin.top - margin.bottom;

const svg = d3.select('.d3-canvas')
    .append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT);

d3.json('data.json').then(data => {
    // Append group to act as the chart itself.
    const chart = svg.append('g')
        .attr('width', chartWidth)
        .attr('height', chartHeight)
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Append axisGroups to the chart.
    const xAxisGroup = chart.append('g')
        .attr('transform', `translate(0, ${chartHeight})`);
    const yAxisGroup = chart.append('g');

    // Create x and y scales for their respective axis.
    const x = d3.scaleBand()
        .range([0, chartWidth])
        .paddingInner(0.2)
        .paddingOuter(0.2);
    const y = d3.scaleLinear()
        .range([chartHeight, 0]);

    // Create x (bottom) and y (left) axis.
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y)
        .ticks(3)
        .tickFormat(d => `${d} units`);
    
    // Create bars.
    const bars = chart.selectAll('rect')
        .data(data);
    
    // Remove obsolete bars.
    bars.exit().remove();

    // Define axis domains.
    y.domain([0, d3.max(data, d => d.value)]);
    x.domain(data.map(d => d.name));

    // Set attributes for previously existing bars.
    bars.attr('width', x.bandwidth)
        .attr('fill', 'orange')
        .attr('x', d => x(d.name))
        .attr('height', d => chartHeight - y(d.value))
        .attr('y', d => y(d.value));
    
    // Append new needed bars and set attributes for them.
    bars.enter()
        .append('rect')
        .attr('fill', 'orange')
        .attr('width', x.bandwidth)
        .attr('height', d => chartHeight - y(d.value))
        .attr('x', d => x(d.name))
        .attr('y', d => y(d.value));

    // Call the axis to place them into their respective groups.
    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);
});