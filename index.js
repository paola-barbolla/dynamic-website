const express = require ("express")
const app = new express()

const renderMenu = (currentPage) => {
    const selectedStyle = "color: green;"
    const defaultStyle = "color: red;"
    return `
    <ul>
        <li><a href = "/home" style = "${currentPage === "home" ? selectedStyle : defaultStyle}">Home</a></li>
        <li><a href = "/series" style = "${currentPage === "series" ? selectedStyle : defaultStyle}">Serie tv</a></li>
        <li><a href = "/info" style = "${currentPage === "info" ? selectedStyle : defaultStyle}">Maggiori informazioni</a></li>
    </ul>
    `
}

const renderHtml = (currentPage, body) => {
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <title>My first dynamic website</title>
        </head>
        <body>
            ${renderMenu(currentPage)}
            ${body}
        </body>
    </html>
    `
}

app.get("/home", (req, res) => {
    res.send(renderHtml("home", "<h1>Benvenuto/a nella home</h1>"))
})

const series = [
    {
        nome: "Breaking bad",
        genere: "drammatico",
        anno: "2008",
    },

    {
        nome: "Game of thrones",
        genere: "fantastico",
        anno:"2011"
    },

    {
        nome: "The big bang theory",
        genere: "sitcom",
        anno: "2007"
    },

    {
        nome: "Stranger things",
        genere: "fantascienza",
        anno: "2016"
    },

    {
        nome: "Black mirror",
        genere: "fantascienza",
        anno: "2011"
    }
]

app.get("/series", (req, res) => {
    res.send(renderHtml("series", `
    <h1>Ecco le 5 serie tv più viste</h1>
    <ul>
        ${series.map((e => {
            return `
            <li>
                <div>
                    <h3>${e.nome}</h3>
                    <p>${e.genere}</p>
                    <p>${e.anno}</p>
                </div>
            </li>
            `
        })).join(" ")}
    </ul>
    `))
})

const infos = ['<a href = "https://it.wikipedia.org/wiki/Breaking_Bad" target = "blank">Breaking bad</a>', 
    '<a href = "https://it.wikipedia.org/wiki/Il_Trono_di_Spade_(serie_televisiva)" target = "blank">Game of thrones</a>',
    '<a href = "https://it.wikipedia.org/wiki/The_Big_Bang_Theory" target = "blank">The big bang theory</a>',
    '<a href = "https://it.wikipedia.org/wiki/Stranger_Things" target = "blank">Stranger things</a>',
    '<a href = "https://it.wikipedia.org/wiki/Black_Mirror_(serie_televisiva)" target = "blank">Black mirror</a>'
]

app.get("/info", (req, res) => {
    res.send(renderHtml("info",`
    <h1>Alcuni link per conoscere di più le serie</h1>
    ${infos.map((e => {
        return `
            <p>${e}</p>
        `
    })).join(" ")}
    `))
})

app.listen(3000, () => console.log("server listening on port 3000"))
