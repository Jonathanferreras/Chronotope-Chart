import React, {useRef, useEffect, useState} from 'react'
import * as d3 from 'd3'
import { ChartToolTip } from '../ChartToolTip/ChartToolTip'
import { 
  getGroupByGroupNumber, 
  getSegmentBySegmentNumber, 
  getSortedChronotope, 
  getSortedSegments } from '../../utils/dataUtils'

export function ScatterPlotChart({data}) {
  const d3Container = useRef(null)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if(data && d3Container.current && !selected) {
      const {groups, segments, chronotope} = data
      const sortedChronotope = getSortedChronotope(chronotope)
      const sortedSegments = getSortedSegments(segments, groups)

      const handleDataPointClick = (dataPoint) => {
        const {segment_no} = dataPoint
        const segment = getSegmentBySegmentNumber(segment_no, sortedSegments)
        const group = getGroupByGroupNumber(segment.group_no, groups)

        setSelected({
          hitTime: dataPoint.hit_time,
          cluster: segment.name,
          group: group.name,
          colors: {
            groupColor: group.hex_color,
            clusterColor: segment.hex_color
          }
        })
      }

      const chart = document.querySelector('.chart')
      const width = chart.clientWidth
      const height = chart.clientHeight
      const margin = { top: 20, right: 20, bottom: 10, left: 40 }

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
      const dot = svg.selectAll("dot")
      
      dot
        .data(sortedChronotope)
        .enter()
        .append("circle")
        .attr("transform", "translate(0, 15)")
        .attr("r", 3.5)
        .attr("cx", c => xScale(new Date(c.hit_time)))
        .attr("cy", c => yScale(getSegmentBySegmentNumber(c.segment_no, sortedSegments).name))
        .style("fill", c => `#${getSegmentBySegmentNumber(c.segment_no, sortedSegments).hex_color}`)
        .on("click", (event, dataPoint) => handleDataPointClick(dataPoint))

      svg
        .append("g")
        .attr("transform", "translate(10, 10)")
        .call(yAxis)
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll("line").remove())
        .call(g => g
          .selectAll("text")
          .style("text-anchor", "start")
          .style("fill", (name, i) => `#${sortedSegments[i].hex_color}`)
        )

      svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis)
    }
  })

  return (
    <React.Fragment>
      <svg
        width={1000}
        height={800}
        className="chart"
        ref={d3Container}
      />
      {selected && <ChartToolTip data={selected} />}
    </React.Fragment>
  )
}
