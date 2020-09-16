import React from 'react'

export function ChartToolTip({ data }) {
  const {hitTime, cluster, clusterColor, group, groupColor} = data;
  
  return (
    <div>
      <p>
        Hit Time: {hitTime} <br />
        <span style={{color: `#${clusterColor}`}}>Cluster: {cluster}</span><br />
        <span style={{color: `#${groupColor}`}}>Group: {group}</span><br />
      </p>
    </div>
  )
}
