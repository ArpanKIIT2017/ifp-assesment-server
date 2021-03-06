import React from 'react';
import * as d3 from 'd3'

export default class D3Chart extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        //Read the data
        const data = this.props.data.map((dataPoint) => {
            return {
                load: dataPoint.load,
                time: Date.parse(dataPoint.time)
            }
        })
        console.log(data)

        this.drawMyChart(data)
    }

    drawMyChart (data) {
        let margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

        let svg = d3.select(this.refs.my_dataviz)
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        // Add X axis --> it is a date format
        let x = d3.scaleTime()
        .domain(d3.extent(data, function(d) { return d.time; }))
        .range([ 0, width ]);
            svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))     
        

        // Add Y axis
        let y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return +d.load; })])
        .range([ height, 0 ]);
            svg.append("g")
        .call(d3.axisLeft(y));

        // Add the line
        svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(function(d) { return x(d.time) })
            .y(function(d) { return y(d.load) })
            )

    }
    
    customTickFunc (t0, t1, step)
    {
        var startTime = new Date(t0),
            endTime= new Date(t1), times = [];
        endTime.setUTCDate(endTime.getUTCDate() + 1);
        while (startTime < endTime) {
            startTime.setUTCDate(startTime.getUTCDate() + 2);
            times.push(new Date(startTime));
        }
        return times;
    }

    render() {
        return(
            <div ref="my_dataviz">
                
            </div>
        )
    }
}