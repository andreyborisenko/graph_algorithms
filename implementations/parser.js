const Graph = require('./Graph')

module.exports = (graphData) => {
	let graphsMap = {}

	graphData.graph.forEach(g => {
		graphsMap[parseInt(g.$.id)] = new Graph(
			g.title[0] || 'Graph',
			g.lines[0].line.map(l => {
				return {
					id: l.$.id,
					from: l.$.from,
					to: l.$.to,
					weight: l.$.weight
				}
			}),
			g.points[0].point.map(p => {
				return {
					id: p.$.id,
					visited: false
				}
			})
		)
	})

	return graphsMap
}