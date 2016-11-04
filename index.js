var yo = require('yo-yo')
var csjs = require('csjs-inject')
var minixhr = require('minixhr')
/*-----------------------------------------------------------------------------
  THEME
-----------------------------------------------------------------------------*/
var FONT        = 'Ubuntu, sans-serif'
var BLACK       = 'hsla(0,0%,0%,1)'
var WHITE       = 'hsla(0,0%,100%,1)'
var BLUE        = 'hsla(208,53%,32%,1)'
var PINK        = 'hsla(346,84%,61%,1)'
var YELLOW      = 'hsla(42,100%,70%,1)'
var GREEN       = 'hsla(164,95%,43%,1)'
var GREY        = 'hsla(30,100%,99%,1)'
var LIGHTGREY   = 'hsla(30,100%,99%,.4)'
var COLORS      = [GREEN, PINK, YELLOW, BLUE]
/*-----------------------------------------------------------------------------
  LOADING FONT
-----------------------------------------------------------------------------*/
var links = [
  'https://fonts.googleapis.com/css?family=Ubuntu',
  'https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css'
            ]
var font = yo`<link href=${links[0]} rel='stylesheet' type='text/css'>`
var fontAwesome = yo`<link href=${links[1]} rel='stylesheet' type='text/css'>`
document.head.appendChild(font)
document.head.appendChild(fontAwesome)
/*--------------------------------------------------------------------------------
  LOADING DATA
--------------------------------------------------------------------------------*/

minixhr('https://api.github.com/users/goran2009', startPage)
function startPage (data) {
  var data = JSON.parse(data)
  document.body.appendChild(template(data))
  activateScrollEffect(COLORS)
}

/*-----------------------------------------------------------------------------
  WEB PAGE
-----------------------------------------------------------------------------*/

var css = csjs`
 body{
   text-align: center;
   background-color: YELLOW;
 }
h1 {
  text-align: centare;
  font-family: cursive;
  color: RED;
  margin-left:  210px;
}
h3 {
  font-family: cursive;
  color: blue;
}

  img {
    margin-left: 200px;
    margin-top: 3em;
    border: 5px solid grey;
    border-radius: 50%;
    width: 15em;
    background-size: cover;
    animation:
        pulse 3s ease infinite alternate,
        nudge 5s linear infinite alternate;
    border-radius: 100%;
  }
  @keyframes pulse {
  0%, 100% {
    background-color: red;
  }
  50% {
    background-color: orange;
  }
}

@keyframes nudge {
  0%, 100% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(150px, 0);
  }

  80% {
    transform: translate(-150px, 0);
  }
}
 @-webkit-keyframes bounce {
      0% {
        bottom: 50px;
      }
      70% {
        bottom: 100px;
        color: ${LIGHTGREY};
      }
      100% {
        bottom: 50px;
      }
    }
   .arrow {
      position: relative;
      font-size: 2em;
      color: ${BLACK};
      animation: bounce 2s infinite
   }



`
//document.head.appendChild(css)
function template(data) {
 return yo`
 <div>
   <centare><h1>${data.name}</h1></centare>
   <img src="${data.avatar_url}" />
     <div>
        <i class="${css.arrow} fa fa-chevron-down" aria-hidden="true"></i>
     </div>
     ${portfolioComponent()}
     ${textboxComponent()}
     ${footerComponent()}
   </div>
   `
}

/* PORTFOLIO DOCUMENT */
function portfolioComponent () {
	var css = csjs`
  	.portfolio {
      margin: 2em 0 2em 0;
      width: 100%;
    }
    .portfolioItem {
      width: 100%;
      padding-bottom: 200px;
    	background-color: ${BLUE};
      color: ${GREY};
      display:flex;
      flex-direction: column;
      align-items: flex-start;
      transition: 2s;
    }
    .portfolioTitle {
      margin: 2em;
      padding: 0.5em;
      font-size: 3em;
      color: ${PINK};
      background-color: ${YELLOW};
      border-radius: 4px;
      border: 4px solid ${YELLOW};
      transition: 2s;
    }
    .portfolioBody {
      margin: 0 40% 0 0em;
      text-align: left;
      font-size: 1.2em;
      color: ${BLUE};
      transition: 2s;
    }
   .portfolioItem_isHover {
      width                : 100%;
      padding-bottom       : 200px;
    	background-color     : ${GREEN};
      color                : ${GREY};
      display              : flex;
      flex-direction       : column;
      align-items          : flex-start;
      cursor               : pointer;
      transition           : 2s;
    }
   .portfolioTitle_isHover {
      margin                : 2em 2em 2em 1.5em;
      padding               : 0.5em;
      font-size             : 3em;
      color                 : ${PINK};
      background-color      : ${GREEN};
      border-radius         : 4px;
      border                : 4px solid ${GREY};
      transition            : 2s;
    }
   .portfolioBody_isHover {
      margin               : 0 35% 0 4em;
      text-align           : left;
      font-size            : 1.2em;
      color                : ${WHITE};
      transition           : 2s;
    }


  `
  function template () {
    return yo`
    <div onmouseover=${hoverPortfolio}>
      <div class="${css.portfolio}">
        <div class="${css.portfolioItem}">
          <div class="${css.portfolioTitle}">
            Portfolio: My quiz app
          </div>
          <div class="${css.portfolioBody}">
            My quiz is a quiz app where users can answer
            Likert scale questions and compare their answers
            with others. It stores all the data in the database
            and enables an admin view of all the answers.
           </div>
        </div>
      </div>
    </div>

    `
  }

  var element = template()
  return element
function hoverPortfolio () {
     var element = this
     var newElement = yo`
      <div onmouseout=${unhoverPortfolio} onclick=${openNewTab}>
        <div class="${css.portfolio}">
          <div class="${css.portfolioItem_isHover}">
            <div class="${css.portfolioTitle_isHover}">
              Portfolio: My quiz app
            </div>
            <div class="${css.portfolioBody_isHover}">
              My quiz is a quiz app where users can  answer
              Likert scale questions and compare their answers
              with others. It stores all the data in the database
              and enables an admin view of  all the answers.
             </div>
          </div>
        </div>
      </div>
    `
    // 'this' is a reference to the dom node,
    // that hoverPortfolio was attached to as an eventListener
yo.update(element, newElement)

   }
  function unhoverPortfolio() {
    var element = this
    var newElement = template ()
    yo.update(element, template())
  }
   function openNewTab() {
    var url = "https://goran2009.github.io/kviz/"
    var tab = window.open(url, '_blank')
    tab.focus()
  }
}
/*--------------------------------------------------------------------------------
  TEXTBOX COMPONENT
--------------------------------------------------------------------------------*/

function textboxComponent () {
  var css = csjs`
  .textbox {
    margin: 5em 25% 3em 25%;
    color: ${BLUE};
    font-size: 2em;
    line-height: 1.5em;
    text-align: justify;
  }
  `

  function template () {
    return yo`
      <div>
        <div class="${css.textbox}">
          Check out stuff I do and get in touch.  We can meet for coffee
          and talk about amazing products you want to build. I can
          help you make it work :)
        </div>
      </div>
    `
  }

  var element = template()
	return element
}
 /*--------------------------------------------------------------------------------
  FOOTER COMPONENT
--------------------------------------------------------------------------------*/
function footerComponent () {
	var css = csjs`
  	.container {
      display: flex;
      justify-content: center;
    }
    .icon {
      padding: 1em;
      font-size: 35px;
      color: ${GREY};
    }
    .icon:hover {
      opacity: 0.4;
    }
    `

  function template () {
    return yo`
    <div class="${css.container}">
      <a href="https://github.com/goran2009">
        <i  class="${css.icon} fa fa-github" aria-hidden="true"></i>
      </a>
      <a href="mailto:goranstadic@gmail.com ">
        <i class="${css.icon} fa fa-envelope-o" aria-hidden="true"></i>
      </a>
      <a href="https://www.facebook.com/">
       <i class="${css.icon} fa fa-facebook" aria-hidden="true"></i>
      </a>
    </div>

       `
  }

  var element = template()
  return element
}
 /*-----------------------------------------------------------------------------
  HELPERS
-----------------------------------------------------------------------------*/
function activateScrollEffect (COLORS) {
  var docHeight = document.body.offsetHeight
  var colorAreaHeight = docHeight/COLORS.length
  window.addEventListener("scroll", function(event) {
    var position = document.body.scrollTop
    var i = Math.floor(position/colorAreaHeight)
    var color    = COLORS[i]
    document.body.style.backgroundColor = color
    document.body.style.transition = "background-color 3s"
  })
}
