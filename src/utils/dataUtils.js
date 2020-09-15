export function getGroupByGroupNumber(groupNumber, groups) {
  return groups.filter(group => groupNumber === group.group_no)[0];
}

export function getSegmentBySegmentNumber(segmentNumber, segments) {
  return segments.filter(segment => segmentNumber === segment.segment_no)[0];
}

export function getSortedChronotope(chronotope) {
  return chronotope.sort((a,b) => new Date(a.hit_time) - new Date(b.hit_time))
}

export function getSortedSegments(segments, groups) {
  return segments.sort((a, b) => {
    const segmentAGroup = getGroupByGroupNumber(a.group_no, groups);
    const segmentBGroup = getGroupByGroupNumber(b.group_no, groups);

    if (segmentAGroup.position === segmentBGroup.position) {
      return  b.position - a.position;
    } else {
      return  segmentBGroup.position - segmentAGroup.position;
    }
  });

}