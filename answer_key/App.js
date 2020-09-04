import React, { useState, useEffect, useMemo } from "react";
import * as api from "./api";
import "./App.scss";

function computeRelativeDistance(minDate, maxDate, hitTime) {
  [minDate, maxDate, hitTime] = [minDate, maxDate, hitTime].map(Number);
  return (hitTime - minDate) / (maxDate - minDate);
}

function App() {
  const [state, setState] = useState(null);
  const [highlightedHit, setHighlightedHit] = useState(null);

  useEffect(() => {
    Promise.all([
      api.fetchMap(),
      api.fetchGroups(),
      api.fetchSegments(),
      api.fetchChronotopeData(),
    ]).then((data) => {
      const [map, groups, segments, chronotope] = data;
      setState({
        map,
        groups,
        segments,
        chronotope,
      });
    });
  }, []);

  const {
    segments,
    groups,
    groupedChronotope,
    minDate,
    maxDate,
  } = useMemo(() => {
    const segments = {};
    const groups = {};
    const groupedChronotope = [];
    let minDate, maxDate;
    if (state) {
      state.groups.forEach((g) => {
        groups[g.group_no] = g;
      });
      state.segments
        .slice()
        .sort((a, b) => {
          return (
            groups[a.group_no].position - groups[b.group_no].position ||
            a.position - b.position
          );
        })
        .forEach((c) => {
          segments[c.segment_no] = c;
          groupedChronotope.push(
            state.chronotope.filter((h) => h.segment_no === c.segment_no)
          );
          groupedChronotope[groupedChronotope.length - 1].segment = c;
        });
      state.chronotope.forEach((h) => {
        const hitDate = new Date(h.hit_time);
        if (minDate == null || hitDate < minDate) {
          minDate = hitDate;
        }
        if (maxDate == null || hitDate > maxDate) {
          maxDate = hitDate;
        }
      });
    }
    return { segments, groups, groupedChronotope, minDate, maxDate };
  }, [state]);

  if (!state) return <div>Loading...</div>;
  return (
    <div>
      <h1>Chronotope Data for {state.map.name}</h1>
      <div style={{ display: "flex" }}>
        <div style={{ flex: "none" }}>
          {groupedChronotope.map((segmentChronotope, idx) => (
            <div
              key={idx}
              className="segment-label"
              style={{
                color: `#${segmentChronotope.segment.hex_color}`,
              }}
            >
              {segmentChronotope.segment.name}
              <div
                className="group-bar"
                style={{
                  background: `#${
                    groups[segmentChronotope.segment.group_no].hex_color
                  }`,
                }}
              />
            </div>
          ))}
        </div>
        <div style={{ flex: "1 0 0" }}>
          {groupedChronotope.map((segmentChronotope, idx) => (
            <div key={idx} className="segment-line">
              {segmentChronotope.map((h, idx) => (
                <span
                  key={idx}
                  className={[
                    "dot",
                    h === highlightedHit ? "highlighted" : "",
                  ].join(" ")}
                  style={{
                    left: `${(
                      computeRelativeDistance(
                        minDate,
                        maxDate,
                        new Date(h.hit_time)
                      ) * 100
                    ).toFixed(2)}%`,
                    background: `#${segments[h.segment_no].hex_color}`,
                  }}
                  onClick={() => setHighlightedHit(h)}
                />
              ))}
            </div>
          ))}
        </div>
        <div style={{ flex: "none" }}></div>
      </div>
      {highlightedHit && (
        <div>
          <div>Hit time: {new Date(highlightedHit.hit_time).toISOString()}</div>
          <div>
            Segment:{" "}
            <span
              style={{
                color: `#${segments[highlightedHit.segment_no].hex_color}`,
              }}
            >
              {segments[highlightedHit.segment_no].name}
            </span>
          </div>
          <div>
            Group:{" "}
            <span
              style={{
                color: `#${
                  groups[segments[highlightedHit.segment_no].group_no].hex_color
                }`,
              }}
            >
              {groups[segments[highlightedHit.segment_no].group_no].name}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
