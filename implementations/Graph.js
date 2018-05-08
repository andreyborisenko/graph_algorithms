const buildMatrix = Symbol('buildMatrix'),
			buildObjRef = Symbol('buildObjRef')

class Graph {
	constructor(title, lines, points) {
		this.title = title
		this.lines = lines
		this.points = points
		this.vertices = {}

		points.forEach(p => {
			this.vertices[p.id] = false
		})

		this.matrix = null
		this.obj = null
	}

	get asMatrix() {
		if (this.matrix == null) {
			this[buildMatrix]()
		}
		return this.matrix
	}

	[buildMatrix]() {
		this.matrix = [...Array(this.points.length + 1)].map(v => [...Array(this.points.length + 1).fill(-1)])

		for (let l of this.lines) {
			this.matrix[l.from][l.to] = l.weight
			this.matrix[l.to][l.from] = l.weight
		}

		this.matrix = this.matrix.map(row => row.slice(1)).slice(1)
	}

	get asObject() {
		if (this.obj == null) {
			this[buildObjRef]()
		}
		return this.obj
	}

	[buildObjRef]() {
		this.obj = {}

		for (let p of this.points) {
			this.obj[p.id] = {}
		}

		for (let l of this.lines) {
			this.obj[l.from][l.to] = parseInt(l.weight)
			this.obj[l.to][l.from] = parseInt(l.weight)
		}
	}


}

module.exports = Graph