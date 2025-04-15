import { fetchMentorMenteeRelations } from "@/client/api/mentorMentee";
import { fetchPersonalInfo } from "@/client/api/userInfo";
import { useDimensions } from "@/client/hooks/useDimensions";
import { ClientOnly } from "@/shared/utils";
import * as d3 from "d3";
import React, { useEffect, useRef, useState } from "react";
import type { ForceGraphMethods, LinkObject, NodeObject } from "react-force-graph-2d";
import ForceGraph2D from "react-force-graph-2d";

// You need to define these yourself! Lol silly me.
type GraphNode = { id: string; name: string };
type GraphLink = { source: string; target: string };

type FgNode = NodeObject<GraphNode>;
type FgLink = LinkObject<FgNode, GraphLink>;

interface GraphData {
  nodes: Array<{ id: string; name: string }>;
  links: Array<{ source: string; target: string }>;
}

const MentorMenteeGraph: React.FC = () => {
  const [containerRef, dims] = useDimensions<HTMLElement>();
  const fgRef = useRef<ForceGraphMethods<FgNode, FgLink> | null>(null);
  const [graphData, setGraphData] = useState<GraphData | null>(null);

  // fetch mentors & mentees once on mount
  useEffect(() => {
    async function fetchData() {
      try {
        const relations = await fetchMentorMenteeRelations();
        const links = relations.map(({ mentee_id: t, mentor_id: m }) => ({
          source: m,
          target: t,
        }));
        const uniqueIds = Array.from(new Set(relations.flatMap(({ mentee_id, mentor_id }) => [mentor_id, mentee_id])));
        const users = await Promise.all(uniqueIds.map((id) => fetchPersonalInfo(id)));
        const nodes = users.map((u) => ({
          id: u.user_id,
          name: `${u.first_name} ${u.last_name}`,
        }));
        // console.log("nodes", nodes);
        // console.log("links", links);
        // setGraphData(debugData);

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
    fg.d3Force("charge")?.strength(-400);
    fg.d3Force("link")?.distance(150);
    fg.d3Force("center", d3.forceCenter(dims.width / 2, dims.height / 2));
    setTimeout(() => fg.zoomToFit(0, 100), 100);
  }, [dims, graphData]);

  if (!dims) console.log("AAAAAAAAHHHH");
  return (
    <ClientOnly>
      <div ref={containerRef} style={{ width: "100%", height: "600px", border: "1px solid #ccc" }}>
        {!graphData && <p>Loading data…</p>}
        {graphData && (
          <ForceGraph2D
            ref={fgRef as React.MutableRefObject<ForceGraphMethods<FgNode, FgLink>>}
            graphData={graphData}
            width={dims?.width}
            height={dims?.height}
            nodeLabel="name"
          />
        )}
      </div>
    </ClientOnly>
  );
};

export default MentorMenteeGraph;
