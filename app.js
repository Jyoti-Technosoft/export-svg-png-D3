
// set up SVG for D3
var width  = 1060,
    height = 500,
    colors = d3.scale.category10();
var selectedNodeId;

var svg = d3.select('body')
  .append("svg")
  .attr("xmlns", "//www.w3.org/2000/svg ")
  .attr('class', 'don')
  .attr('oncontextmenu', 'return false;')
  .attr('width', width)
  .attr('height', height);

const getBase64FromUrl = async(url) => {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      const base64data = reader.result;
      resolve(base64data);
      return base64data;
    };
  });
}

var defs = svg.append('svg:defs');

  // overhead
  var pattern1 = defs.append("svg:pattern")
    .attr("id", "overhead_image")
    .attr("width", 16)
    .attr("height", 16);
  var imgEle1 = pattern1.append("svg:image")
    .attr("xlink:href", () => {
      return getBase64FromUrl('/assets/overhead.png').then((value) => {
        imgEle1.attr("xlink:href", value)
      });
    })
    .attr("width", 60)
    .attr("height", 60)
    .attr("x", 8)
    .attr("y", 14);

  // tansformer
  var pattern2 = defs.append("svg:pattern")
    .attr("id", "transformer_image")
    .attr("width", 16)
    .attr("height", 16);
    var imgEle2 = pattern2.append("svg:image")
    .attr("xlink:href", () => {
      return getBase64FromUrl('/assets/transformer.png').then((value) => {
        // return value;
        imgEle2.attr("xlink:href", value)
      });
    })
    .attr("width", 60)
    .attr("height", 60)
    .attr("x", 8)
    .attr("y", 14);


// set up initial nodes and links
//  - nodes are known by 'id', not by index in array.
//  - reflexive edges are indicated on the node (as a bold black circle).
//  - links are always source < target; edge directions are set by 'left' and 'right'.

var nodes = [
    {id: 0, "name": "over", "image": "url(#overhead_image)", reflexive: false},
    {id: 1, "name": "trans", "image": "url(#transformer_image)","isVisible": false,reflexive: true },
    {id: 2, "name": "tran", "image": "url(#transformer_image)", "isVisible": false,reflexive: false}
  ];

  lastNodeId = 2,
  links = [
    {source: nodes[0], target: nodes[1], left: false, right: true },
    {source: nodes[1], target: nodes[2], left: false, right: true }
  ];

// init D3 force layout
var force = d3.layout.force()
    .nodes(nodes)
    .links(links)
    .size([width, height])
    .linkDistance(150)
    .charge(-500)
    .on('tick', tick)

defs2 = svg.append('svg:defs');

// define arrow markers for graph links
var endArrow = defs2.append('svg:marker')
    .attr('id', 'end-arrow')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 6)
    .attr('markerWidth', 3)
    .attr('markerHeight', 3)
    .attr('orient', 'auto')
  .append('svg:path')
    .attr('d', 'M0,-5L10,0L0,5')
    .attr('fill', '#000');

var startArrow = defs2.append('svg:marker')
    .attr('id', 'start-arrow')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 4)
    .attr('markerWidth', 3)
    .attr('markerHeight', 3)
    .attr('orient', 'auto')
  .append('svg:path')
    .attr('d', 'M10,-5L0,0L10,5')
    .attr('fill', '#000');

// line displayed when dragging new nodes
var drag_line = svg.append('svg:path')
  .attr('class', 'link dragline hidden')
  .attr('d', 'M0,0L0,0');

// handles to link and node element groups
var path = svg.append('svg:g').selectAll('.path'),
    circle = svg.append('svg:g').selectAll('g');

// mouse event vars
var selected_node = null,
    selected_link = null,
    mousedown_link = null,
    mousedown_node = null,
    mouseup_node = null;

function resetMouseVars() {
  mousedown_node = null;
  mouseup_node = null;
  mousedown_link = null;
}

// update force layout (called automatically each iteration)
function tick() {
  // draw directed edges with proper padding from node centers
  path.select('.link').attr('d', function(d) {
    var deltaX = d.target.x - d.source.x,
        deltaY = d.target.y - d.source.y,
        dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY),
        normX = deltaX / dist,
        normY = deltaY / dist,
        sourcePadding = d.left ? 17 : 12,
        targetPadding = d.right ? 17 : 12,
        sourceX = d.source.x + (sourcePadding * normX),
        sourceY = d.source.y + (sourcePadding * normY),
        targetX = d.target.x - (targetPadding * normX),
        targetY = d.target.y - (targetPadding * normY);
    return 'M' + sourceX + ',' + sourceY + 'L' + targetX + ',' + targetY;
  })
  .attr("stroke", "#000")
  .attr("fill", "none")
  .style("stroke-width", "4px")
  .style("cursor", "default")

    path.select('.id').attr("transform",function(d){
            return "translate("+
                (0.5*(d.source.x+d.target.x))+
            ","+
                (0.5*(d.source.y+d.target.y))+
            ")";
        });

  circle.attr('transform', function(d) {
    return 'translate(' + d.x + ',' + d.y + ')';
  });
}

// update graph (called when needed)
function restart() {
  // path (link) group
  path = path.data(links);

   //ajax post newPaths
var mousemove = function(e) {
tooltip
alert(e.value)
}

circle.on("click",function(d){
//.on("mousemove", mousemove)

$.ajax({
type : "POST",
url:'/hv/drawing/',
headers: {'X-CSRFToken': '{{ csrf_token }}'},
data:{

"dynamic":JSON.stringify(path)
},
"success":function(data){
alert('success'+ path)
var selectTablas = d3.selectAll (".path");
jQuery(".id").click(function(event) {
    event.preventDefault();
    var text = jQuery(this).text();
    // 'this' refers to the h3 element that you clicked.. not the div with the class .resultsalert(text.trim());
});
//sessionStorage.setItem('key', d.source.id);
//window.open('http://127.0.0.1:8000/hv/drawing/')
}

});
});
//path.on("click",function(d){ window.open('//127.0.0.1:8000/hv/drawing/');
//
//});

  // update existing links
  path.classed('selected', function(d) { return d === selected_link; })
    .style('marker-start', function(d) { return d.left ? 'url(#start-arrow)' : ''; })
    .style('marker-end', function(d) { return d.right ? 'url(#end-arrow)' : ''; });

    // add new links
  var newPaths = path.enter().append('svg:g').attr('class','path');
      newPaths.append('svg:path')
    .attr('class', 'link')
    .classed('selected', function(d) { return d === selected_link; })
    .style('marker-start', function(d) { return d.left ? 'url(#start-arrow)' : ''; })
    .style('marker-end', function(d) { return d.right ? 'url(#end-arrow)' : ''; })
    .on('mousedown', function(d) {
      if(d3.event.ctrlKey) return;

      // select link
      mousedown_link = d;
      if(mousedown_link === selected_link) selected_link = null;
      else selected_link = mousedown_link;
      selected_node = null;
      restart();

    });

     newPaths.append('svg:text').attr('x', 10).attr('y', 13)
    .attr('class', 'id')
    //.attr('y',function(d,i) { return i * 30 + 5;})
    //.attr('x',radius * 5)
    //.text(function(d) { return d.id; });
    //.text(function(d) { return d; });
    .text(function(d,i) { return 'C'+i * 1 ; });

var svg = document.getElementsByTagName('text')[0]
//alert($(svg).val());
path.on("click", function(d) {
  //alert(d);

});

  // remove old links
  path.exit().remove();

  // circle (node) group
  // NB: the function arg is crucial here! nodes are known by id, not by index!
  circle = circle.data(nodes, function(d) { return d.id; });

  // update existing nodes (reflexive & selected visual states)
  circle.selectAll('circle')
   // .style('fill', function(d) { return (d === selected_node) ? d3.rgb(colors(d.id)).brighter().toString() : colors(d.id); })
    .classed('reflexive', function(d) { return d.reflexive; });

  // add new nodes
  var g = circle.enter().append('svg:g');

  g.append('svg:circle')
    .attr('class', 'node')
    .attr('r', 42)
    .attr('id', function(d){return d.id})
    .style("fill", function(d) { return d.image ? d.image : "#fff";})
    .style('stroke', function(d) { return d3.rgb(colors(d.id)).darker().toString(); })
    .classed('reflexive', function(d) { return d.reflexive; })
    .on('mouseover', function(d) {
      if(!mousedown_node || d === mousedown_node) return;
      // enlarge target node
      d3.select(this).attr('transform', 'scale(1.1)');
    })
    .on('mouseout', function(d) {
      if(!mousedown_node || d === mousedown_node) return;
      // unenlarge target node
      d3.select(this).attr('transform', '');
    })
    .on('mousedown', function(d) {
      if(d3.event.ctrlKey) return;

      // select node
      mousedown_node = d;
      if(mousedown_node === selected_node) selected_node = null;
      else selected_node = mousedown_node;
      selected_link = null;

      // reposition drag line
      drag_line
        .style('marker-end', 'url(#end-arrow)')
        .classed('hidden', false)
        .attr('d', 'M' + mousedown_node.x + ',' + mousedown_node.y + 'L' + mousedown_node.x + ',' + mousedown_node.y);

      restart();
    })
    //Rahul
    .on('dblclick', function(d) {
      $("#compnode").html(d.id);
      $("#dialog").show();
      $('#dialog').dialog();
      $('#dialog').css({
        "background-color": "yellow",
        "font-weight": "bolder",
        "margin-left": "100px"
      });
      selectedNodeId = d.id;

      // function updateNodeList(id, image) {
      //   for (var i = 0; i < nodes.length; i++) {
      //     if (nodes[i].id === id) {
      //       nodes[i].image ="url(#transformer_image)";
      //       break;
      //     }
      //   }
      // }

      $("#compbtn").click(function() {
        var selVal = $("#myselect").val();
        if(selVal == "over") {
          updateNodeCircle(selectedNodeId, "url(#overhead_image)")
        }
        if(selVal == "trans") {
          updateNodeCircle(selectedNodeId, "url(#transformer_image)")
        }
        if(selVal == "tran") {
          updateNodeCircle(selectedNodeId, "url(#transformer1_image)")
        }
      })

      function updateNodeCircle(id, image) {
        cs = document.querySelectorAll('.node');
        cs.forEach(circle => {
          if(circle.id == id) {
            circle.style.setProperty('fill', image);
          }
        });
      }

    })
    .on('mouseup', function(d) {
      if(!mousedown_node) return;

      // needed by FF
      drag_line
        .classed('hidden', true)
        .style('marker-end', '');

      // check for drag-to-self
      mouseup_node = d;
      if(mouseup_node === mousedown_node) { resetMouseVars(); return; }

      // unenlarge target node
      d3.select(this).attr('transform', '');

      // add link to graph (update if exists)
      // NB: links are strictly source < target; arrows separately specified by booleans
      var source, target, direction;
      if(mousedown_node.id < mouseup_node.id) {
        source = mousedown_node;
        target = mouseup_node;
        direction = 'right';
      } else {
        source = mouseup_node;
        target = mousedown_node;
        direction = 'left';
      }

      var link;
      link = links.filter(function(l) {
        return (l.source === source && l.target === target);
      })[0];

      if(link) {
        link[direction] = true;
      } else {
        link = {source: source, target: target, left: false, right: false};
        link[direction] = true;
        links.push(link);
      }

      // select new link
      selected_link = link;
      selected_node = null;
      restart();
    });

  // show node IDs
  g.append('svg:text')
      .attr('x', 0)
      .attr('y', 4)
      .attr('class', 'id')
      .text(function(d) { return d.id; });

  // remove old nodes
  circle.exit().remove();

  // set the graph in motion
  force.start();
}

function mousedown() {
  // prevent I-bar on drag
  //d3.event.preventDefault();

  // because :active only works in WebKit?
  svg.classed('active', true);

  if(d3.event.ctrlKey || mousedown_node || mousedown_link) return;

  // insert new node at point
  var point = d3.mouse(this),
      node = {id: ++lastNodeId, reflexive: false};
  node.x = point[0];
  node.y = point[1];
  nodes.push(node);
  restart();
}

function mousedownNode(d, i) {
  nodes.splice(i, 1);
  links = links.filter(function(l) {
    return l.source !== d && l.target !== d;
  });
  restart();
}

function mousemove() {
  if(!mousedown_node) return;

  // update drag line
  drag_line.attr('d', 'M' + mousedown_node.x + ',' + mousedown_node.y + 'L' + d3.mouse(this)[0] + ',' + d3.mouse(this)[1]);

  restart();
}

function mouseup() {
  if(mousedown_node) {
    // hide drag line
    drag_line
      .classed('hidden', true)
      .style('marker-end', '');
  }

  // because :active only works in WebKit?
  svg.classed('active', false);

  // clear mouse event vars
  resetMouseVars();
}

function spliceLinksForNode(node) {
  var toSplice = links.filter(function(l) {
    return (l.source === node || l.target === node);
  });
  toSplice.map(function(l) {
    links.splice(links.indexOf(l), 1);
  });
}

// only respond once per keydown
var lastKeyDown = -1;

function keydown() {
  d3.event.preventDefault();

  if(lastKeyDown !== -1) return;
  lastKeyDown = d3.event.keyCode;

  // ctrl
  if(d3.event.keyCode === 17) {
    circle.call(force.drag);
    svg.classed('ctrl', true);
  }

  if(!selected_node && !selected_link) return;
  switch(d3.event.keyCode) {
    case 8: // backspace
    case 46: // delete
      if(selected_node) {
        nodes.splice(nodes.indexOf(selected_node), 1);
        spliceLinksForNode(selected_node);
      } else if(selected_link) {
        links.splice(links.indexOf(selected_link), 1);
      }
      selected_link = null;
      selected_node = null;
      restart();
      break;
    case 66: // B
      if(selected_link) {
        // set link direction to both left and right
        selected_link.left = true;
        selected_link.right = true;
      }
      restart();
      break;
    case 76: // L
      if(selected_link) {
        // set link direction to left only
        selected_link.left = true;
        selected_link.right = false;
      }
      restart();
      break;
    case 82: // R
      if(selected_node) {
        // toggle node reflexivity
        selected_node.reflexive = !selected_node.reflexive;
      } else if(selected_link) {
        // set link direction to right only
        selected_link.left = false;
        selected_link.right = true;
      }
      restart();
      break;
  }
}

function keyup() {
  lastKeyDown = -1;

  // ctrl
  if(d3.event.keyCode === 17) {
    circle
      .on('mousedown.drag', null)
      .on('touchstart.drag', null);
    svg.classed('ctrl', false);
  }
}

function draw() {
        svg
            .data([graphModel])
            .call(diagram);
        updateSvgDownloadLink();
    }
    function updateSvgDownloadLink() {
      var rawSvg = new XMLSerializer().serializeToString(d3.select("#canvas svg" ).node());
     var imgsrc=d3.select("#downloadSvgButton").attr('href', "data:image/svg+xml;base64," + btoa(rawSvg ));
    // var imgsrc = 'data:image/svg+xml;base64,'+ btoa( unescape( encodeURIComponent( svgString ) )
    }

        function saveSvgLink() {
      var rawsvg = new XMLSerializer().serializeToString(d3.select("#canvas svg" ).node());
      $.ajax({
    "type": "POST",
    "url": "/hv/savequotedrawing/",
    "data": {
      csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
      'rawsvg': JSON.stringify(rawsvg),
      'quotename':$("#saveSvgButton").attr("quotename"),
      'connection':"false"
          },

    "success": function(result) {

       alert(result);

    }
  });
}

var allGs = document.getElementsByTagName('g');
var firstG = allGs[0];
var firstChild = firstG.childNodes[0];

  //export markup
  d3.select( "#exportMarkupButton" ).on( "click", exportMarkup );

  function draw() {
    svg
    .data([graphModel])
    .call(diagram);
    updateSvgDownloadLink();
  }

  var exportMarkup = function () {
    appendModalBackdrop();
    d3.select( ".modal.export-markup" ).classed( "hide", false );
    $(".export-markup").show();
    var markup = formatMarkup();
    d3.select( "textarea.code" )
        .attr( "rows", markup.split( "\n" ).length * 2 )
        .node().value = markup;
  };

  kokos = JSON.stringify(nodes);

  // d3.select("#save").on("click", function(){
  // var allGs = document.getElementsByTagName('g');
  // var firstG = allGs[0];
  // var firstChild = firstG.childNodes[0];
  // d3.select(this)
  //   .attr("href", 'data:application/octet-stream;base64,' + btoa(d3.select(".don").html()))
  //   .attr("download", "viz.svg")
  // })

  function getSVGString( svgNode ) {
    svgNode.setAttribute('xlink', 'http://www.w3.org/1999/xlink');
    var cssStyleText = getCSSStyles( svgNode );
    appendCSS( cssStyleText, svgNode );
    var serializer = new XMLSerializer();
    var svgString = serializer.serializeToString(svgNode);
    svgString = svgString.replace(/(\w+)?:?xlink=/g, 'xmlns:xlink='); // Fix root xlink without namespace
    svgString = svgString.replace(/NS\d+:href/g, 'xlink:href'); // Safari NS namespace fix
    return svgString;
    function getCSSStyles( parentElement ) {
       var selectorTextArr = [];
       // Add Parent element Id and Classes to the list
       selectorTextArr.push( '#'+parentElement.id );
       for (var c = 0; c < parentElement.classList.length; c++)
             if ( !contains('.'+parentElement.classList[c], selectorTextArr) )
                selectorTextArr.push( '.'+parentElement.classList[c] );
       // Add Children element Ids and Classes to the list
       var nodes = parentElement.getElementsByTagName("*");
       for (var i = 0; i < nodes.length; i++) {
          var id = nodes[i].id;
          if ( !contains('#'+id, selectorTextArr) )
             selectorTextArr.push( '#'+id );
          var classes = nodes[i].classList;
          for (var c = 0; c < classes.length; c++)
             if ( !contains('.'+classes[c], selectorTextArr) )
                selectorTextArr.push( '.'+classes[c] );
       }
       // Extract CSS Rules
       var extractedCSSText = "";
       for (var i = 0; i < document.styleSheets.length; i++) {
          var s = document.styleSheets[i];
          try {
              if(!s.cssRules) continue;
          } catch( e ) {
                 if(e.name !== 'SecurityError') throw e; // for Firefox
                 continue;
              }
          var cssRules = s.cssRules;
          for (var r = 0; r < cssRules.length; r++) {
             if ( contains( cssRules[r].selectorText, selectorTextArr ) )
                extractedCSSText += cssRules[r].cssText;
          }
       }
       return extractedCSSText;
       function contains(str,arr) {
          return arr.indexOf( str ) === -1 ? false : true;
       }
    }
    function appendCSS( cssText, element ) {
       var styleElement = document.createElement("style");
       styleElement.setAttribute("type","text/css");
       styleElement.innerHTML = cssText;
       var refNode = element.hasChildNodes() ? element.children[0] : null;
       element.insertBefore( styleElement, refNode );
    }
 }
 function svgString2Image( svgString, width, height, format, callback ) {
    var format = format ? format : 'png';
    var imgsrc = 'data:image/svg+xml;base64,'+ btoa( unescape( encodeURIComponent( svgString ) ) ); // Convert SVG string to data URL
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    var image = new Image();
    image.onload = function() {
       context.clearRect ( 0, 0, width, height );
       context.drawImage(image, 0, 0, width, height);
       canvas.toBlob( function(blob) {
          var filesize = Math.round( blob.length/1024 ) + ' KB';
          if ( callback ) callback( blob, filesize );
       });
    };
    image.src = imgsrc;
 }

  d3.select("#save").on("click", exportImage);

  function exportImage() {
    // var canvas = d3.select(".don");
    // var img = new Image(),
    //   serializer = new XMLSerializer(),
    //   svgStr = serializer.serializeToString(canvas.node());
    // d3.select(this)
    // .attr("href", 'data:application/octet-stream;base64,' + btoa(unescape(encodeURIComponent(svgStr))))
    // .attr("download", "viz.svg");

    var svgString = getSVGString(d3.select('.don').node());
    svgString2Image( svgString, width, height, 'png', save ); // passes Blob and filesize String to the callback
    function save( dataBlob, filesize ){
       saveAs( dataBlob, 'viz.png' ); // FileSaver.js function
    }

  }

  // function updateNodeList(id, image) {
  //   for (var i = 0; i < nodes.length; i++) {
  //     if (nodes[i].id === id) {
  //       nodes[i].image ="url(#transformer_image)";
  //       break;
  //     }
  //   }
  // }

  // app starts here
  svg.on('mousedown', mousedown)
    .on('mousemove', mousemove)
    .on('mouseup', mouseup);
  d3.select(window)
    .on('keydown', keydown)
    .on('keyup', keyup);
  restart();

  d3.select("g, .path").on('click', function(e) {

    $('.path').click(function() {
      alert($(this).text());
      if($(this).text()!=""){
        window.location.href='/hv/drawing/';
        localStorage.setItem("Node", $(this).text());
      }
    })
  })
