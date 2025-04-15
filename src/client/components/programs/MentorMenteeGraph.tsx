import { useDimensions } from "@/client/hooks/useDimensions";
import * as d3 from "d3";
import React, { useEffect, useRef, useState } from "react";
import type { ForceGraphMethods, LinkObject, NodeObject } from "react-force-graph-2d";
import ForceGraph2D from "react-force-graph-2d";

type MyNode = {
  id: string;
  type: "mentor" | "mentee";
};

type MyLink = {
  source: string;
  target: string;
};

const rawData = {
  mentors: ["Mentor 1", "Mentor 2"],
  mentees: ["Mentee A", "Mentee B", "Mentee C"],
  connections: [
    ["Mentor 1", "Mentee A"],
    ["Mentor 1", "Mentee B"],
    ["Mentor 2", "Mentee B"],
    ["Mentor 2", "Mentee C"],
  ],
};

const data = {
  nodes: [...rawData.mentors.map((id) => ({ id, type: "mentor" as const })), ...rawData.mentees.map((id) => ({ id, type: "mentee" as const }))],
  links: rawData.connections.map(([source, target]) => ({ source, target })),
};

const MentorMenteeGraph = () => {
  const [containerRef, dims] = useDimensions<HTMLElement>();
  const fgRef = useRef<ForceGraphMethods<NodeObject<MyNode>, LinkObject<MyNode, MyLink>>>();
  const [hoverNode, setHoverNode] = useState<NodeObject<MyNode> | null>(null);

  useEffect(() => {
    if (fgRef.current && dims) {
      fgRef.current.d3Force("charge")?.strength(-400);
      fgRef.current.d3Force("link")?.distance(150);
      fgRef.current.d3Force("center", d3.forceCenter(dims.width / 2, dims.height / 2));
      setTimeout(() => {
        fgRef.current?.zoomToFit(0, 200);
      }, 150);
    }
  }, [dims]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "600px", border: "2px solid black" }}>
      {dims && (
        <ForceGraph2D
          ref={fgRef}
          graphData={data}
          width={dims.width}
          height={dims.height}
          nodeLabel={(node) => node.id}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.id;
            const fontSize = 12 / globalScale;
            const radius = node.type === "mentor" ? 12 : 8;

            // Node shape
            ctx.beginPath();
            ctx.arc(node.x!, node.y!, radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = node.type === "mentor" ? "#38a169" : "#3182ce"; // green or blue
            ctx.fill();

            // Highlight if hovered
            if (
              hoverNode &&
              (hoverNode.id === node.id ||
                data.links.some(
                  (link) => (link.source === node.id && link.target === hoverNode.id) || (link.target === node.id && link.source === hoverNode.id),
                ))
            ) {
              ctx.lineWidth = 2;
              ctx.strokeStyle = "#facc15"; // yellow border
              ctx.stroke();
            }

            // Node label
            ctx.font = `${fontSize}px Oswald`;
            ctx.textAlign = "center";
            ctx.textBaseline = "top";
            ctx.fillStyle = "#333";
            ctx.fillText(label, node.x!, node.y! + radius + 2);
          }}
          nodePointerAreaPaint={(node, color, ctx) => {
            const radius = node.type === "mentor" ? 12 : 8;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(node.x!, node.y!, radius + 5, 0, 2 * Math.PI, false);
            ctx.fill();
          }}
          linkDirectionalArrowLength={6}
          linkDirectionalArrowRelPos={1}
          linkColor={() => "#ccc"}
          linkWidth={(link) => (hoverNode && (link.source === hoverNode.id || link.target === hoverNode.id) ? 2.5 : 1)}
          onNodeHover={(node) => setHoverNode(node || null)}
          onNodeClick={(node) => alert(`You clicked on ${node.id}`)}
        />
      )}
    </div>
  );
};

export default MentorMenteeGraph;
