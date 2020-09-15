import React, {useRef, useEffect} from 'react';
import * as d3 from 'd3';
import { getGroupByGroupNumber, getSegmentBySegmentNumber, getSortedChronotope, getSortedSegments } from '../../utils/dataUtils';

export function ScatterPlotChart({data}) {
  const d3Container = useRef(null);

  useEffect(() => {
    if(data && d3Container.current) {
      const {groups, segments, chronotope} = data;
      const sortedChronotope = getSortedChronotope(chronotope); // X - axis
      const sortedSegments = getSortedSegments(segments, groups); // Y - axis

      const chart = document.querySelector('.chart');
      const width = chart.clientWidth;
      const height = chart.clientHeight;
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };

      const xScale = d3
        .scaleTime()
        .domain(d3.extent(sortedChronotope, c => new Date(c.hit_time)))
        .range([150, width - margin.right - margin.left])

      const yScale = d3
        .scaleBand()
        .domain(sortedSegments.map(s => s.name))
        .range([height - margin.top - margin.bottom, 0])

      const xAxis = d3
        .axisBottom()
        .scale(xScale)

      const yAxis = d3
        .axisLeft()
        .scale(yScale)

      const svg = d3.select(d3Container.current)
      
      // Add Scatter plots
      svg
        .selectAll("dot")
        .data(sortedChronotope)
        .enter()
        .append("circle")
        .attr("r", 3.5)
        .attr("cx", c => xScale(new Date(c.hit_time)))
        .attr("cy", c => yScale(getSegmentBySegmentNumber(c.segment_no, segments).name))

      // Add Y - Axis
      svg
        .append("g")
        .attr("transform", "translate(150, 10)")
        .call(yAxis)

      // Add X - Axis
      svg
        .append("g")
        .attr("transform", `translate(50, ${(height / 1.1 ) + 10})`)
        .call(xAxis)
        .selectAll("text")
        .attr("y", 0)
        .attr("x", 9)
        .attr("dy", ".35em")
        .attr("transform", "rotate(90)")
        .style("text-anchor", "start");

    }
  })

  return (
    <svg
      width={1000}
      height={800}
      className="chart"
      ref={d3Container}
    />
  )
}
