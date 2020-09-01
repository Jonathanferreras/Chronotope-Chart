import mapData from "./map.json";
import groupsData from "./groups.json";
import clustersData from "./clusters.json";
import chronotopeData from "./chronotope.json";

/**
 * @template T
 * @param {T} value
 * @returns {Promise<T>}
 */
function delay(value) {
  const duration = Math.round(Math.random() * 3) + 2;
  return new Promise((resolve) =>
    window.setTimeout(resolve, duration * 1000, value)
  );
}

export function fetchMap() {
  return delay(mapData);
}

export function fetchClusters() {
  return delay(clustersData);
}

export function fetchGroups() {
  return delay(groupsData);
}

export function fetchChronotopeData() {
  return delay(chronotopeData);
}
