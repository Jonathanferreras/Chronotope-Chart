import React, {useRef, useEffect} from 'react';
import * as d3 from 'd3';
import { getGroupByGroupNumber } from '../../utils/dataUtils';

export function ScatterPlotChart({data}) {
  const d3Container = useRef(null);

  useEffect(() => {
    if(data && d3Container.current) {
      const {groups, segments, chronotope} = data;
      const svg = d3.select(d3Container.current);

      // Y - axis
      const sortedChronotope = chronotope.sort((a,b) => new Date(a.hit_time) - new Date(b.hit_time))

      // X - axis
      const sortedSegments = segments.sort((a, b) => {
        const segmentAGroup = getGroupByGroupNumber(a.group_no, groups);
        const segmentBGroup = getGroupByGroupNumber(b.group_no, groups);

        if (segmentAGroup.position === segmentBGroup.position) {
          return a.position - b.position;
        } else {
          return segmentAGroup.position - segmentBGroup.position;
        }
      })


    }
  })

  return (
    <svg 
      ref={d3Container}
    />
  )
}
