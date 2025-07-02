export function validateDAG(nodes, edges) {
  // Check 1: At least 2 nodes
  if (nodes.length < 2) {
    return { isValid: false, reason: 'At least 2 nodes required' };
  }

  // Check 2: All nodes connected
  const nodeIds = new Set(nodes.map((node) => node.id));
  const connectedNodes = new Set([
    ...edges.map((edge) => edge.source),
    ...edges.map((edge) => edge.target),
  ]);
  if (nodeIds.size !== connectedNodes.size) {
    return { isValid: false, reason: 'All nodes must be connected' };
  }

  // Check 3: No cycles using DFS
  const adjList = {};
  nodes.forEach((node) => {
    adjList[node.id] = [];
  });
  edges.forEach((edge) => {
    adjList[edge.source].push(edge.target);
  });

  const visited = new Set();
  const recStack = new Set();

  function dfs(node) {
    visited.add(node);
    recStack.add(node);
    for (const neighbor of adjList[node]) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor)) return true;
      } else if (recStack.has(neighbor)) {
        return true; // Cycle detected
      }
    }
    recStack.delete(node);
    return false;
  }

  for (const node of nodes) {
    if (!visited.has(node.id)) {
      if (dfs(node.id)) {
        return { isValid: false, reason: 'Cycle detected' };
      }
    }
  }

  return { isValid: true };
}