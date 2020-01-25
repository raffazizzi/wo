import React, {useRef, useEffect} from 'react'
import * as A from 'airtable'
import * as d3 from 'd3'

function WoData(props) {
  
  const svgEl = useRef(null)

  useEffect(() => {

    const base = new A({apiKey: 'keyABekhLaYIHre0d'}).base('appQx1tmm4vNz1Zvh');
    let allRecords = []
    let allExercisesData = {}

    const stat = props.show

    base('Log').select({
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {    
      allRecords = allRecords.concat(records)
      fetchNextPage()

    }, function done(err) {      
      if (err) { console.error(err); return; }

      base('Exercises').select({
        view: "All",
        fields: ['Name', stat]
      }).eachPage(function page(records, fetchNextPage) {    
        // allRecords = allRecords.concat(records)
        for (const r of records) {
          allExercisesData[r.id] = {
            name: r.get("Name"),
            stat: r.get(stat)
          }
        }
        fetchNextPage()

      }, function done(err) {
        if (err) { console.error(err); return; }

        // Average allRecords

        const byDate = allRecords.reduce((acc, r) => {
          const d = r.get('Date')
          if (acc.has(d)) {
            acc.get(d).push(r)
          } else {
            acc.set(d, [r])
          }
          return acc
        }, new Map())

        byDate.forEach((r, d) => {
          byDate.set(d, r.reduce((acc, r) => {
            const ex = allExercisesData[r.get('Exercise')].name
            if (acc.has(ex)) {
              const wData = acc.get(ex)
              wData.stats.push(r.get(stat))
              wData.averageStat = wData.stats.reduce((a, b) => a + b, 0) / wData.stats.length
            } else {
              // Calculate averages
              acc.set(ex, {
                date: d,
                exercise: r.get('Exercise'),
                stats: [r.get(stat)],
                averageStat: r.get(stat)
              })
            }
            return acc
          }, new Map()))
        })

        let flatData = []
        for (const d of byDate.values()) {
          flatData = flatData.concat(Array.from(d))
        }

        const exPerDate = flatData.reduce((acc, r, i) => {
          if (Object.keys(acc).indexOf(r[1].date) === -1) {
            acc[r[1].date] = [i]
          } else {
            acc[r[1].date].push(i)
          }
          return acc
        }, {})

        const svg = d3.select(svgEl.current)
        const margin = 80;
        const width = 1500 - 2 * margin;
        const height = 600 - 2 * margin;

        const legend = svg.append("g")
        legend.append("circle")
          .attr('class', 'goal')
          .attr("cx", 60)
          .attr("cy", 50)
          .attr("r", 5)

        legend
          .append('text')
          .attr('class', 'label')
          .attr('x', 110)
          .attr('y', 55)
          .attr('text-anchor', 'middle')
          .text("Goal met!")

        legend.append("circle")
          .attr('class', 'goal nah')
          .attr("cx", 175)
          .attr("cy", 50)
          .attr("r", 5)

        legend
          .append('text')
          .attr('class', 'label')
          .attr('x', 240)
          .attr('y', 55)
          .attr('text-anchor', 'middle')
          .text("Goal not met :(")

        legend.append("circle")
          .attr('class', 'goal woah')
          .attr("cx", 325)
          .attr("cy", 50)
          .attr("r", 5)

        legend
          .append('text')
          .attr('class', 'label')
          .attr('x', 395)
          .attr('y', 55)
          .attr('text-anchor', 'middle')
          .text("Goal exceeded!")

        const chart = svg.append('g')
          .attr('transform', `translate(${margin}, ${margin})`);
          
        const xScale = d3.scaleBand()
          .range([0, width])
          .domain(Array.from(byDate.keys()))
          .padding(0.45)
        
        const yScale = d3.scaleLinear()
          .range([height, 0])
          .domain([0, props.scale]);

        const makeYLines = () => d3.axisLeft()
          .scale(yScale)

        chart.append('g')
          .attr('transform', `translate(0, ${height})`)
          .call(d3.axisBottom(xScale));

        chart.append('g')
          .call(d3.axisLeft(yScale));

        chart.append('g')
          .attr('class', 'grid')
          .call(makeYLines()
            .tickSize(-width, 0, 0)
            .tickFormat('')
          )

        const barGroups = chart.selectAll()
          .data(flatData)
          .enter()
          .append('g')

        barGroups
          .append('rect')
          .attr('style', 'fill:#141926; filter:drop-shadow(0px 1px 1px rgba(0, 0, 0, 1))')
          .attr('class', (g) => {
            return g[0].replace(/ /g, '_')
          })
          .attr('x', (g, i) => {
            const date = g[1].date
            const loc = exPerDate[date].indexOf(i)
            let d = 0
            if (loc !== -1) {
              d = loc
            }
            return xScale(date) + (d * 12)
          })
          .attr('y', (g) => yScale(g[1].averageStat))
          .attr('height', (g) => height - yScale(g[1].averageStat))
          .attr('width', 10)

        barGroups
          .append('circle')
          .attr('class', (g) => {
            const w = allExercisesData[g[1].exercise].stat
            const aw = g[1].averageStat
            if (aw > w) {
              return 'goal woah'
            } else if (aw < w) {
              return 'goal nah'
            }
            return 'goal'

          })
          .attr("cx", (g, i) => {
            const date = g[1].date
            const loc = exPerDate[date].indexOf(i)
            let d = 0
            if (loc !== -1) {
              d = loc
            }
            return xScale(date) + (d * 12)
          })
          .attr("cy", (g) => yScale(allExercisesData[g[1].exercise].stat))
          .attr("r", 5)
        
          svg
            .append('text')
            .attr('class', 'label')
            .attr('x', -(height / 2) - margin)
            .attr('y', margin / 2.4)
            .attr('transform', 'rotate(-90)')
            .attr('text-anchor', 'middle')
            .text(stat)

          svg.append('text')
            .attr('class', 'label')
            .attr('x', width / 2 + margin)
            .attr('y', height + margin * 1.7)
            .attr('text-anchor', 'middle')
            .text('Training days')

      })
    })

  })

  return (
    <div style={{width: '1000px', height: '600px', margin: 'auto', backgroundColor: '#01A9DB'}}>
      <svg style={{width: '100%', height: '100%'}} ref={svgEl} />
    </div>
  )
}

export default WoData
