const fs = require('fs')
const path = require('path')
const xml2js = require('xml2js')

const parser = xml2js.Parser()

let graphData = null

fs.readFile(path.join('.', 'graph_xmls', 'test.xml'), (err, data) => {
	if (err) {
		console.error(err)
		return err
	}
	parser.parseString(data, (err, res) => {
		if (err) {
			console.error(err)
			process.emit('graphReceived', err)
			return err
		}
		process.emit('graphReceived', null, res.graph_data);
	})
})

const graphParser = require('./implementations').parser,
			dijkstra = require('./implementations').dijkstra

process.on('graphReceived', (err, data) => {
	if (err) {
		console.log('Error while reading graph data')
		console.error(err)
		return err
	}

	graphData = graphParser(data)

	console.log(dijkstra(graphData[2], '8', '4'))

})


