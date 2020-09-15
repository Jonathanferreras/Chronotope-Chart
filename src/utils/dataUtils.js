export function getGroupByGroupNumber(groupNumber, groups) {
  return groups.filter(group => groupNumber === group.group_no)[0];
}