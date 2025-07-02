# Pipeline Editor (DAG Builder)

A React-based Pipeline Editor for creating and managing Directed Acyclic Graphs (DAGs) using `reactflow` and `dagre`.

## Setup Instructions
1. Clone the repository: `git clone <repo-url>`
2. Install dependencies: `npm install`
3. Run the app: `npm run dev`
4. Open `http://localhost:5173` in your browser.

## Libraries Used
- `reactflow`: For interactive graph visualization.
- `dagre`: For auto-layout of nodes.
- `react`: Core framework.

## Key Features
- Add nodes with custom labels via prompt.
- Draw directional edges with source/target handles.
- Delete nodes/edges using the Delete key.
- Real-time DAG validation (min 2 nodes, no cycles, all connected).
- Auto-layout button for clean node arrangement.

## Demo
[Live Demo](<your-deployed-url>)
[Screencast](<link-to-recording>)

## Challenges & Solutions
- **Cycle Detection**: Implemented DFS with a recursion stack to detect cycles efficiently.
- **Edge Deletion**: Ensured edges connected to deleted nodes are removed by filtering based on source/target IDs.
- **Auto-Layout**: Used `dagre` to compute positions and `fitView` to center the graph.

## Screenshots
![Editor](screenshots/editor.png)