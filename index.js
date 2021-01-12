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
        <li><a href = "/merchandise" style = "${currentPage === "merchandise" ? selectedStyle : defaultStyle}">Merchandising</a></li>
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
    anno: "2008"
  },

  {
    nome: "Game of thrones",
    genere: "fantastico",
    anno: "2011"
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
            <div>
                <h3>${e.nome}</h3>
                <p>${e.genere}</p>
                <p>${e.anno}</p>
            </div>
            `
  })).join(" ")}
    </ul>
    `))
})

const infos = ["<a href = \"https://it.wikipedia.org/wiki/Breaking_Bad\" target = \"blank\">Breaking bad</a>",
  "<a href = \"https://it.wikipedia.org/wiki/Il_Trono_di_Spade_(serie_televisiva)\" target = \"blank\">Game of thrones</a>",
  "<a href = \"https://it.wikipedia.org/wiki/The_Big_Bang_Theory\" target = \"blank\">The big bang theory</a>",
  "<a href = \"https://it.wikipedia.org/wiki/Stranger_Things\" target = \"blank\">Stranger things</a>",
  "<a href = \"https://it.wikipedia.org/wiki/Black_Mirror_(serie_televisiva)\" target = \"blank\">Black mirror</a>"
]

app.get("/info", (req, res) => {
  res.send(renderHtml("info", `
    <h1>Conoscere di più le serie</h1>
    ${infos.map((e => {
    return `
            <p>${e}</p>
        `
  })).join(" ")}
    `))
})

app.get("/merchandise", (req, res) => {
  res.send(renderHtml("merchandise", `
    <h1>Acquistare prodotti in tema</h1>
      <style>
        table, th, td {
          border: 1px solid black;
          border-collapse: collapse;
        }
        th, td {
          padding: 5px;
        }
        th {
          text-align: left;
        }
    </style>

    <table style="width:80%">
      <tr>
        <th>Serie tv</th>
        <th>Logo</th> 
        <th>Siti merce</th>
      </tr>
      <tr>
        <td>Breaking bad</td>
        <td><img src = "https://banner2.cleanpng.com/20180816/kzi/kisspng-logo-walter-white-vector-graphics-television-show-breaking-bad-png-18-5b754e1068c945.0272561515344143524292.jpg" alt="logo" width="150" height="100"></td>
        <td><a href = "https://www.breakingbadstore.com/" target = "blank">store</a></td>
      </tr>
      <tr>
        <td>Game of thrones</td>
        <td><img src = "https://www.pinclipart.com/picdir/middle/446-4468069_free-game-of-thrones-logo-png-transparent-images.png" alt="logo" width="150" height="100"></td>
        <td><a href = "https://www.gameofthronesitaly.it/indice-merchandising-game-thrones-trono-spade/" target = "blank">store</a></td>
      </tr>
      <tr>
        <td>The big bang theory</td>
        <td><img src = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/TBBT_logo.svg/828px-TBBT_logo.svg.png" alt="logo" width="150" height="100"></td>
        <td><a href = "https://www.merchandisingplaza.com/Merchandising-Big-Bang-Theory/2914" target = "blank">store</a></td>
      </tr>
      <tr>
        <td>Stranger things</td>
        <td><img src = "https://i.dlpng.com/static/png/5782551-stranger-things-icon-festa-st-in-2019-stranger-things-logo-stranger-things-logo-transparent-1600_1600_preview.png" alt="logo" width="150" height="100"></td>
        <td><a href = "https://www.emp-online.it/fan-merch/stranger-things/" target = "blank">store</a></td>
      </tr>
      <tr>
        <td>Black mirror</td>
        <td><img src = "https://serialmindsecn.nohup.it/wp-content/uploads/2019/06/Black-Mirror-5-1_edited.jpg" alt="logo" width="150" height="100"></td>
        <td><a href = "https://www.teepublic.com/black-mirror-merchandise" target = "blank">store</a></td>
      </tr>
    </table>
  `))
})

// eslint-disable-next-line no-console
app.listen(3000, () => console.log("server listening on port 3000"))
