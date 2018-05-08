module.exports = (graph, start, end) => {
	let res = Array(graph.points.length).fill(-1),
			g = Object.assign({}, graph.asObject),
			visited = new Set(),
			cur = +start

	res[+start - 1] = 0

	while (visited.size != graph.points.length) {

		for (let v in g[cur]) {
			if (visited.has(+v)) continue
			if (res[+v - 1] == -1) {
				res[+v - 1] = res[cur - 1] + g[cur][v]
			} else if (res[cur - 1] + g[cur][v] < res[+v - 1]) {
				res[+v - 1] = g[cur][v] + res[cur - 1]
			}
		}

		visited.add(cur)
		cur = res.indexOf(Math.min(...res.filter((x, i) => x != -1  && !visited.has(i + 1)))) + 1
	}

	let pathWeight = res[+end - 1], path = []
	cur = +end
	while (pathWeight) {
		path.unshift([cur, pathWeight])
		for (let v in g[cur]) {
			if (pathWeight - g[cur][v] == res[+v - 1]) {
				pathWeight -= g[cur][v]
				cur = +v
				break
			}
		}
	}
	path.unshift([cur, pathWeight])

	console.log(path.map(x => `${x[0]} (${x[1]})`).join(' -> '))

	return res[+end - 1]
}