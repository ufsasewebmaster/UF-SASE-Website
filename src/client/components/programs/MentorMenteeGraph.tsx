import { useDimensions } from "@/client/hooks/useDimensions";
import * as d3 from "d3";
import React, { useEffect, useRef } from "react";
import type { ForceGraphMethods, LinkObject, NodeObject } from "react-force-graph-2d";
import ForceGraph2D from "react-force-graph-2d"; // ForceGraphProps

const data: { nodes: Array<{ id: string }>; links: Array<{ source: string; target: string }> } = {
  nodes: [{ id: "Mentor 1" }, { id: "Mentor 2" }, { id: "Mentee A" }, { id: "Mentee B" }, { id: "Mentee C" }],
  links: [
    { source: "Mentor 1", target: "Mentee A" },
    { source: "Mentor 1", target: "Mentee B" },
    { source: "Mentor 2", target: "Mentee B" },
    { source: "Mentor 2", target: "Mentee C" },
  ],
};

const MentorMenteeGraph = () => {
  const [containerRef, dims] = useDimensions<HTMLElement>();
  const fgRef = useRef<ForceGraphMethods<NodeObject<{ id: string }>, LinkObject<{ id: string }, { source: string; target: string }>> | undefined>(
    undefined,
  );

  useEffect(() => {
    if (fgRef.current && dims) {
      fgRef.current.d3Force("charge")?.strength(-400);
      fgRef.current.d3Force("link")?.distance(150);
      fgRef.current.d3Force("center", d3.forceCenter(dims.width / 2, dims.height / 2));
      setTimeout(() => {
        if (fgRef.current) {
          fgRef.current.zoomToFit(0, 100);
        }
      }, 100); // delay of 100ms
    }
  }, [dims]);

  if (!dims) console.log("AAAAAAAAHHHH");
  return (
    <div ref={containerRef} style={{ width: "100%", height: "600px", border: "2px solid black" }}>
      {dims && (
        <ForceGraph2D
          ref={fgRef}
          graphData={data}
          width={dims.width}
          height={dims.height}
          //   onEngineStop={() => fgRef.current && fgRef.current.zoomToFit(0, 100)}
        />
      )}
    </div>
  );
};

export default MentorMenteeGraph;
