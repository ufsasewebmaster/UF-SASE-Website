import { fetchMentorMenteeRelations } from "@/client/api/mentorMentee";
import { fetchUser } from "@/client/api/users";
import { useDimensions } from "@/client/hooks/useDimensions";
import { ClientOnly, SASE_COLORS } from "@/shared/utils";
import { useNavigate } from "@tanstack/react-router";
import * as d3 from "d3";
import React, { useEffect, useRef, useState } from "react";
import type { ForceGraphMethods, LinkObject, NodeObject } from "react-force-graph-2d";
import ForceGraph2D from "react-force-graph-2d";

// You need to define these yourself! Lol silly me.
type GraphNode = {
  id: string;
  name: string;
  username: string;
  role: "mentor" | "mentee" | "both";
};
type GraphLink = {
  source: string;
  target: string;
};

type FgNode = NodeObject<GraphNode>;
type FgLink = LinkObject<FgNode, GraphLink>;

interface GraphData {
  nodes: Array<GraphNode>;
  links: Array<GraphLink>;
}

const MentorMenteeGraph: React.FC = () => {
  const [containerRef, dims] = useDimensions<HTMLElement>();
  const fgRef = useRef<ForceGraphMethods<FgNode, FgLink> | null>(null);
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const centerRef = useRef<d3.ForceCenter<FgNode> | null>(null);
  const navigate = useNavigate();

  // fetch mentors & mentees once on mount
  useEffect(() => {
    async function fetchData() {
      try {
        const relations = await fetchMentorMenteeRelations();
        const links = relations.map(({ menteeId: t, mentorId: m }) => ({
          source: m,
          target: t,
        }));
        const uniqueIds = Array.from(new Set(relations.flatMap(({ menteeId, mentorId }) => [mentorId, menteeId])));
        const users = await Promise.all(uniqueIds.map((id) => fetchUser(id)));
        const mentorsSet = new Set(relations.map((r) => r.mentorId));
        const menteesSet = new Set(relations.map((r) => r.menteeId));
        const nodes: Array<GraphNode> = users.map((u) => {
          const isMentor = mentorsSet.has(u.id);
          const isMentee = menteesSet.has(u.id);
          const role: GraphNode["role"] = isMentor && isMentee ? "both" : isMentor ? "mentor" : "mentee";
          return {
            id: u.id,
            name: `${u.firstName} ${u.lastName}`,
            username: u.username,
            role,
          };
        });

        setGraphData({ nodes, links });
      } catch (err) {
        console.error("Failed to load graph data", err);
      }
    }
    // setGraphData(debugData);

    fetchData();
  }, []);

  // reconfigure forces & zoom on size or data change
  useEffect(() => {
    if (!dims || !fgRef.current || !graphData) return;
    const fg = fgRef.current;
    // We have global anti-gravity
    fg.d3Force("charge")?.strength(-10);

    fg.d3Force("link")?.distance(50);

    const centerF = d3.forceCenter(dims.width / 2, dims.height / 2);
    fg.d3Force("center", centerF);
    centerRef.current = centerF;

    const randomWind = () => {
      let nodes: Array<FgNode> = [];
      type State = { vxBias: number; vyBias: number; nextAt: number };
      let states: Array<State> = [];
      const strength = 0.05;

      function force() {
        const now = Date.now();
        nodes.forEach((n, i) => {
          const s = states[i];
          // time to pick a new random bias
          if (now >= s.nextAt) {
            s.vxBias = (Math.random() - 0.5) * strength;
            s.vyBias = (Math.random() - 0.5) * strength;
            // schedule next change 1–3 s from now
            s.nextAt = now + 1000 + Math.random() * 2000;
          }
          const nn = n as FgNode;
          nn.vx = (nn.vx ?? 0) + s.vxBias;
          nn.vy = (nn.vy ?? 0) + s.vyBias;
        });
      }

      // D3 calls this once so we can capture the node array
      force.initialize = (x: Array<FgNode>) => {
        nodes = x;
        states = nodes.map(() => ({
          vxBias: 0,
          vyBias: 0,
          nextAt: Date.now() + 1000 + Math.random() * 2000,
        }));
      };

      return force;
    };
    // register it under some name
    fg.d3Force("randomWind", randomWind());

    // Initial zoom to fit
    setTimeout(() => fg.zoomToFit(0, 100), 100);
  }, [dims, graphData]);

  return (
    <ClientOnly>
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "600px",
          border: "1px solid #ccc",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!graphData && (
          <p
            style={{
              fontSize: "2.25rem",
              fontWeight: 500,
            }}
          >
            Loading data…
          </p>
        )}{" "}
        {graphData && (
          <ForceGraph2D
            nodeCanvasObjectMode={() => "after"}
            nodeCanvasObject={(node, ctx, globalScale) => {
              // Adjust font size based on zoom
              const fontSize = 12 / globalScale;
              ctx.font = `${fontSize}px Sans-Serif`;
              ctx.textAlign = "center";
              ctx.textBaseline = "top";
              ctx.fillStyle = "#222"; // pick a legible color
              // Draw the full name (node.name) just below the circle
              ctx.fillText(node.name, node.x ?? 0, (node.y ?? 0) + (node.r ?? 5) + 2);
            }}
            nodeColor={(node) => {
              switch (node.role) {
                case "mentor":
                  return SASE_COLORS.green;
                case "mentee":
                  return SASE_COLORS.blue;
                case "both":
                  return SASE_COLORS.blueLight;
              }
            }}
            onNodeClick={(node) => {
              navigate({ to: `/users/${node.username}/${node.id}` });
            }}
            ref={fgRef as React.MutableRefObject<ForceGraphMethods<FgNode, FgLink>>}
            graphData={graphData}
            width={dims?.width}
            height={dims?.height}
            nodeLabel={(d) => d.username}
            /** arrowheads on every link, pointing from mentor → mentee **/
            linkDirectionalArrowLength={6} // a nice, visible arrow size
            linkDirectionalArrowColor={() => "#555"} // match your link color
            linkDirectionalArrowRelPos={1} // arrow sits at the target end
            // linkDirectionalParticles={1}
            // linkDirectionalParticleSpeed={0.005}
            // linkDirectionalParticleWidth={2}
            // linkDirectionalParticleColor={() => "#999"}
          />
        )}
      </div>
    </ClientOnly>
  );
};

export default MentorMenteeGraph;
