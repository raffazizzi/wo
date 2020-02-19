import React, {useRef, useEffect, useState} from 'react'
import * as A from 'airtable'
import * as d3 from 'd3'
import Container from '@material-ui/core/Container';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

function WoData(props) {
  
  const svgEl = useRef(null);
  const d3isDone = useRef(false)
  const [date, setDate] = useState('');

  useEffect(() => {
    // Ensures that d3 DOM operations are only done once.
    if (d3isDone.current) {
      return
    }

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
        fields: ['Name', 'Weight', 'Reps', 'Sets']
      }).eachPage(function page(records, fetchNextPage) {    
        // allRecords = allRecords.concat(records)
        for (const r of records) {
          allExercisesData[r.id] = {
            name: r.get('Name'),
            weight: r.get('Weight'),
            reps: r.get('Reps'),
            sets: r.get('Sets'),
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
            const ex = allExercisesData[r.get('Exercise')]
            if (acc.has(ex.name)) {
              const wData = acc.get(ex.name)
              wData.weights.push(r.get('Weight'))
              wData.averageWeight = wData.weights.reduce((a, b) => a + b, 0) / wData.weights.length
              wData.reps.push(r.get('Reps'))
              wData.averageReps = wData.reps.reduce((a, b) => a + b, 0) / wData.reps.length
              wData.sets.push(r.get('Sets'))
              wData.averageSets = wData.sets.reduce((s, acc) => acc + s, 0)
            } else {
              // Calculate averages
              acc.set(ex.name, {
                date: d,
                exercise: r.get('Exercise'),
                weights: [r.get('Weight')],
                averageWeight: r.get('Weight'),
                goalWeight: ex.weight,
                reps: [r.get('Reps')],
                averageReps: r.get('Reps'),
                goalReps: ex.reps,
                sets: [r.get('Sets')],
                averageSets: r.get('Sets'),
                goalSets: ex.sets,
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
        const width = (Array.from(byDate.keys()).length * 180) - 2 * margin;
        const height = 600 - 2 * margin;
        svgEl.current.style.width = `${width}px`

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

        const deselectOthers = (exclude) => {
          svg.selectAll(`:not(${exclude})`)
            .classed('selected', false)
        }

        const barGroups = chart.selectAll()
          .data(flatData)
          .enter()
          .append('g')

        barGroups
          .append('rect')
          .attr('style', 'fill:#141926; filter:drop-shadow(0px 1px 1px rgba(0, 0, 0, 1))')
          .attr('class', (g) => {
            return `${g[0].replace(/ /g, '_')} d${g[1].date}`            
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
          .attr('y', (g) => yScale(g[1][`average${stat}`]))
          .attr('height', (g) => height - yScale(g[1][`average${stat}`]))
          .attr('width', 10)
          .on("click", (g) => {
            svg.selectAll(`.d${g[1].date}`)
            .classed('selected', function (d, i) {
              return d3.select(this).classed('selected', true)
            })
            deselectOthers(`.d${g[1].date}`)
            setDate({value: [g[1].date, byDate.get(g[1].date)]})
          })

        barGroups
          .append('circle')
          .attr('class', (g) => {
            const w = g[1][`goal${stat}`]
            const aw = g[1][`average${stat}`]
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
            return xScale(date) + (d * 12) + 5
          })
          .attr("cy", (g) => yScale(allExercisesData[g[1].exercise][stat.toLowerCase()]))
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

        // Select latest date
        svg.selectAll(`.d${byDate.keys().next().value}`)
          .classed('selected', true)

        setDate(byDate.entries().next())

        d3isDone.current = true

      })
    })

  })

  const isLgScreen = useMediaQuery('(min-width:1200px)');
  const isMdScreen = useMediaQuery('(min-width:600px)');

  const containerWidth = isLgScreen ? 1000 : isMdScreen ? 600 : 300
  
  let sets = 0
  const dateData = !date ? '' : 
    (
      <Paper elevation={1} style={{padding: '1em' }}>
        <Typography variant="h3">Workout of {date.value[0]}</Typography>
        <Typography variant="h6">Aggregate success report</Typography>
        {[...date.value[1]].map((e, ei) => {
          sets = 0
          const skippedSets = new Array(Math.max(e[1].goalSets - e[1].averageSets, 0)).fill()
          return ([
            <Typography key={`ex${ei}`} variant="h4" style={{marginTop: '20px'}}>{e[0]}</Typography>,
            <div key={`cex${ei}`}>
              <List style={{display: 'flex', flexDirection: 'row', padding: 0,}}>
                {e[1].sets.map((us, ui) => {
                  return Array(us).fill().map((s, i) => {
                    sets++
                    const weightDiff = e[1].goalWeight - e[1].weights[ui]
                    const weightSuccess = weightDiff < 0 
                      ? 'Green' : weightDiff > 0 ? 'Red' : 'Black'
                    const repsDiff = e[1].goalReps - e[1].reps[ui]
                    const repsSuccess = repsDiff < 0 
                      ? 'Green' : repsDiff > 0 ? 'Red' : 'Black'
                    let text = (<span><span style={{color: weightSuccess}}>{e[1].weights[ui]}/{e[1].goalWeight}lbs</span><br/>
                      <span style={{color: repsSuccess}}>{e[1].reps[ui]}/{e[1].goalReps} times</span></span>)
                    const isExtraSet = sets > e[1].goalSets ? 'Green' : '#a0a0a0'
                    return (<ListItem key={`l${ui}_${i}`}>
                      <ListItemAvatar>
                        <Avatar style={{backgroundColor: isExtraSet, textAlign: 'center', fontSize: '15px'}}>{`Set ${sets}`}</Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={text} />
                    </ListItem>)
                  })
                })}
                {skippedSets.map((s, i) => {
                  sets++
                  return (<ListItem key={`s${i}`}>
                    <ListItemAvatar>
                        <Avatar style={{backgroundColor: 'Red', textAlign: 'center', fontSize: '15px'}}>{`Set ${sets}`}</Avatar>
                      </ListItemAvatar>
                    <ListItemText primary={(<span style={{color: 'red'}}>Skipped!</span>)} />
                  </ListItem>)
                })}
              </List>
            </div>
          ])
        })}
      </Paper>
    )

  return ([
    <div key="graph" style={{width: `${containerWidth}px`, height: '600px', margin: 'auto',
                 backgroundColor: '#01A9DB', overflowX: 'scroll', overflowY: 'hidden'}}>
      <svg  style={{height: '100%'}}  ref={svgEl} />
    </div>,
    <Container fixed key="stats" style={{width: `${containerWidth}px`, margin: 'auto', marginTop: '1em'}}>
      {dateData}
    </Container>
  ])
}

export default WoData
