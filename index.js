const DATASETS = {
    videogames: {
        TITLE: 'Video Game Sales',
        DESCRIPTION: 'Top 100 Most Sold Video Games Grouped by Platform',
        FILE_PATH:
            'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json'
    },
    movies: {
        TITLE: 'Movie Sales',
        DESCRIPTION: 'Top 100 Highest Grossing Movies Grouped By Genre',
        FILE_PATH:
            'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json'
    },
    kickstarter: {
        TITLE: 'Kickstarter Pledges',
        DESCRIPTION:
            'Top 100 Most Pledged Kickstarter Campaigns Grouped By Category',
        FILE_PATH:
            'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json'
    }
};

var urlParams = new URLSearchParams(window.location.search);
const DEFAULT_DATASET = 'videogames';
const DATASET = DATASETS[urlParams.get('data') || DEFAULT_DATASET];
// const dataSelector = document.getElementById("data-selector");

// dataSelector.innerHTML = '<a>' + DATASETS[0].TITLE + '</a>' + '/' + '<a>' + DATASETS[1].TITLE + '</a>' + '/' + '<a>' + DATASETS[2].TITLE + '</a>';

document.getElementById('title').innerHTML = DATASET.TITLE;
document.getElementById('description').innerHTML = DATASET.DESCRIPTION;

var body = d3.select('body');
var tooltip = body
    .append('div')
    .attr('class', 'tooltip')
    .attr('id', 'tooltip')
    .style('opacity', 0);


let URL = DATASET.FILE_PATH
console.log(URL);
let Aldata

let canvas = d3.select('#canvas')

let drawTreeMap = () => {
    let hierarchy = d3.hierarchy(Aldata, (node) => {
        return node['children']
    }).sum((node) => {
        return node['value']
    }).sort((node1, node2) => {
        return node2['value'] - node1['value']
    })

    let createTreeMap = d3.treemap().size([1000, 600])

    createTreeMap(hierarchy)
    // console.log(hierarchy.leaves());

    let Tiles = hierarchy.leaves()
    // console.log(Tiles);

    let block = canvas.selectAll('g')
        .data(Tiles)
        .enter()
        .append('g')
        .attr('transform', (item) => {
            return 'translate(' + item['x0'] + ', ' + item['y0'] + ')'
        })

    block.append('rect')
        .attr('class', 'tile')
        .attr('fill', (item) => {
            let category = item['data']['category']
            // console.log(category);
            if (category === 'Action' | category === 'Wii' | category === 'Product Design') {
                return 'orange'
            } else if (category === 'Adventure' | category === 'DS' | category === 'Tabletop Games') {
                return 'coral'
            } else if (category === 'Comedy' | category === 'X360' | category === 'Video Games') {
                return 'khaki'
            } else if (category === 'Drama' | category === 'GB' | category === 'Technology') {
                return 'green'
            } else if (category === 'Family' | category === 'PS3' | category === 'Hardware') {
                return 'lightblue'
            } else if (category === 'Animation' | category === 'NES' | category === 'Sound') {
                return 'pink'
            } else if (category === 'Biography' | category === 'PS2' | category === 'Gaming Hardware') {
                return 'tan'
            } else if (category === '3DS' | category === 'Narrative Film') {
                return '#ffd'
            } else if (category === 'PS4' | category === '3D Printing') {
                return '#ccd'
            } else if (category === 'SNES' | category === 'Television') {
                return '#1c3'
            } else if (category === 'PS' | category === 'Web') {
                return '#c33'
            } else if (category === 'N64' | category === 'Wearables') {
                return '#1a3'
            } else if (category === 'GBA' | category === 'Food') {
                return '#22f'
            } else if (category === 'XB' | category === 'Games') {
                return '#ee6'
            } else if (category === 'PC' | category === 'Sculpture') {
                return '#fc0'
            } else if (category === '2600' | category === 'Apparel') {
                return '#0cd'
            } else if (category === 'PSP' | category === 'Art') {
                return '#dae'
            } else if (category === 'XOne' | category === 'Drinks') {
                return '#5d7'
            } else if (category === 'Drinks' | category === 'Gadgets') {
                return '#e1d'
            }
        })
        .attr('data-name', (item) => {
            return item['data']['name']
        })
        .attr('data-category', (item) => {
            return item['data']['category']
        })
        .attr('data-value', (item) => {
            return item['data']['value']
        })
        .attr('width', (item) => {
            return item['x1'] - item['x0'] -1
        })
        .attr('height', (item) => {
            return item['y1'] - item['y0'] -1
        })
        .on('mousemove', function (event, d) {
            tooltip.style('opacity', 0.9);
            tooltip
                .html(
                    'Name: ' +
                    d.data.name +
                    '<br>Category: ' +
                    d.data.category +
                    '<br>Value: ' +
                    d.data.value
                )
                .attr('data-value', d.data.value)
                .style('left', event.pageX + 10 + 'px')
                .style('top', event.pageY - 28 + 'px');
        })
        .on('mouseout', function () {
            tooltip.style('opacity', 0);
        });

    block.append('text')
        .text((item) => {
            return item['data']['name']
        })
        .attr("x", 5)
        .attr("y", 20)
        .style('text-align','center')
}


d3.json(URL)
    .then((data, error) => {
        if (error) {
            console.log(error);
        } else {
            Aldata = data
            // console.log(movieData);
            drawTreeMap()
        }
    })