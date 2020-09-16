import React, { useEffect, useState } from "react"
import * as api from "./api"
import {Header, ScatterPlotChart, ChartToolTip, Loader} from './components'
import "./App.scss"

function App() {
  const [data, setData] = useState({
    map: null,
    groups: [],
    segments: [],
    chronotope: []
  })

  useEffect(() => {
    async function fetchData() {
      const map = await api.fetchMap()
      const groups = await api.fetchGroups()
      const segments = await api.fetchSegments()
      const chronotope = await api.fetchChronotopeData()

      setData({map, groups, segments, chronotope})
    }

    if(!data.map) {
      fetchData()
    }
  })

  const {map, groups, segments, chronotope} = data

  return (
    <div className="app-container">
      {map ? (
        <React.Fragment>
          <Header text={`Chronotope Data for ${map.name}`} />
          <ScatterPlotChart 
            data={{groups, segments, chronotope}}
          />
        </React.Fragment>
      ) : (
        <Loader />
      )}
    </div>
  )
}

export default App
