function buildCharts(id) {
    //Read samples.json
    d3.json("samples.json").then(sampledata => {
        console.log(sampledata)

        var sampleValues = sampledata.samples[0].sample_values.slice(0, 10).reverse()
        console.log(sampleValues)
        var labels = sampledata.samples[0].otu_labels.slice(0, 10)
        console.log(labels)
        // top 10 otu ids for the plot OTU and reversing it. 
        var OTU_top = (sampledata.samples[0].otu_ids.slice(0, 10)).reverse()
        // the otu id's 
        var OTU_id = OTU_top.map(d => "OTU " + d)
        console.log(`OTU IDS: ${OTU_id}`)

        var trace1 = {
            x: sampleValues,
            y: OTU_id,
            text: labels,
            marker: {
                color: 'blue'
            },
            type: "bar",
            orientation: "h",
        }

        var data1 = [trace1]


        var layout1 = {
            title: "Top 10 Bacteria in Subject ID 940",
            yaxis: {
                tickmode: "linear",
            }
        }
        // create the bar1 chart
        Plotly.newPlot("bar1", data1, layout1)


        // create the bar2 chart

        var sampleValues = sampledata.samples[0, 110].sample_values.slice(0, 10).reverse()
        console.log(sampleValues)
        var labels = sampledata.samples[0, 110].otu_labels.slice(0, 10)
        console.log(labels)

        var OTU_top = (sampledata.samples[0, 110].otu_ids.slice(0, 10)).reverse()

        var OTU_id = OTU_top.map(d => "OTU " + d)
        console.log(`OTU IDS: ${OTU_id}`)

        var trace2 = {
            x: sampleValues,
            y: OTU_id,
            text: labels,
            marker: {
                color: 'blue'
            },
            type: "bar",
            orientation: "h",
        }
        // create data variable
        var data2 = [trace2]


        var layout2 = {
            title: "Top 10 Bacteria - all Subjects",
            yaxis: {
                tickmode: "linear",
            }
        }
        // create the bar2 chart
        Plotly.newPlot("bar2", data2, layout2)



        // The bubble chart
        var trace3 = {
            x: sampledata.samples[0].sample_values,
            y: sampledata.samples[0].otu_labels,
            mode: "markers",
            marker: {
                size: sampledata.samples[0].sample_values,
                color: sampledata.samples[0].otu_labels,

            },
            text: sampledata.samples[0].otu_labels

        }

        // set the layout for the bubble plot
        var layout3 = {
            title: "Count of Bacteria by Family - Subject ID 940 ",
            height: 600,
            width: 1200,
        }
        // creating data variable 
        var data3 = [trace3]

        // create the bubble chart
        Plotly.newPlot("bubble", data3, layout3)

    })
}


// create the function to get the meta data
function buildMetaData(id) {
    // read the json file to get data
    d3.json("samples.json").then((data) => {
        // get the metadata info for the demographic panel
        var metadata = data.metadata

        console.log(metadata)

        // filter meta data info by id
        var result = metadata.filter(meta => meta.id.toString() === id)[0]
        // select demographic panel to put data
        var demographicInfo = d3.select("#sample-metadata")

        // clear the demographic info panel each time before getting new id info
        demographicInfo.html("")

        // grab the necessary demographic data data for the id and append the info to the panel
        Object.entries(result).forEach((key) => {
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n")
        })
    })
}

d3.selectAll("#selDataset").on("change", buildCharts)

 
// create the function for the initial data rendering
function init() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset")

    // read the data 
    d3.json("samples.json").then((data) => {
        console.log(data)

        // get the id data to the dropdwown menu
        data.names.forEach(function (name) {
            dropdown.append("option").text(name).property("value")
        })

        // call the functions to display the data and the chart
        buildCharts(data.names[0])
        buildMetaData(data.names[0])
    })
}

// create the function for the change event
function optionChanged(id) {
    buildCharts(id)
    buildMetaData(id)
}


// initialize the dashboard
init()