import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import cytoscape from 'cytoscape';
import fcose from 'cytoscape-fcose';

//-----------------------------------------------------------------------------
// Name:        nodedetail.components.ts
// Purpose:     This module is used to generate a graph to show the nodes and edges
//              connected to the selected node. 
// Author:      Liu Yuancheng
// Created:     2021/07/28
// Copyright:    n.a    
// License:      n.a
//------------------------------------------------------------------------------

// use fcose layout.
cytoscape.use(fcose);

@Component({
  selector: 'app-nodedetail',
  templateUrl: './nodedetail.component.html'
  //styleUrls: ['./nodedetail.component.scss']
})

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export class NodedetailComponent implements OnInit, AfterViewInit {
  @ViewChild('cygraph') cyRef: ElementRef;
  private nativeElement: HTMLElement;
  // define data storage parameters : 
  public nodes: cytoscape.NodeDefinition[] = [];
  public edges: cytoscape.EdgeDefinition[] = [];
  public style: cytoscape.Stylesheet[];
  // def cytoscapte used parameters
  public cy: any = null;
  private defaultoptions: any; // default layout option.
  public edgelabelStr: string; // displayed edge label tamplet in the graph
  public nodeName: String;     // Selected node's name. 
  protected layoutOptions: any = {
    name: 'fcose',
    nodeDimensionsIncludeLabels: true,
    nodeRepulsion: 9000,
    idealEdgeLength: 200,
    nodeSeparation: 50,
    nodeSep: 20,
    fit: true,
  }

  //------------------------------------------------------------------------------
  constructor(element: ElementRef) {
    // Init all parameters
    this.nativeElement = element.nativeElement;
    this.nodeName = "";
    this.edgelabelStr = "";
    this.defaultoptions = {
      name: 'fcose',
      positions: undefined, // map of (node id) => (position obj); or function(node){ return somPos; }
      zoom: 1, // the zoom level to set (prob want fit = false if set)
      pan: undefined, // the pan level to set (prob want fit = false if set)
      fit: true, // whether to fit to viewport
      padding: 50, // padding on fit
      animate: false, // whether to transition the node positions
      animationDuration: 500, // duration of animation in ms if enabled
      animationEasing: undefined, // easing of animation if enabled
      animateFilter: function (node, i) { return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
      ready: undefined, // callback on layoutready
      stop: undefined, // callback on layoutstop
      transform: function (node, position) { return position; } // transform a given node position. Useful for changing flow direction in discrete layouts 
    };
  }

  //------------------------------------------------------------------------------
  ngOnInit(): void {
    //this.redraw();
  }

  //------------------------------------------------------------------------------
  ngAfterViewInit(): void {
    //this.redraw();
  }

  // All detail function methods (name sorted by alphabet):
  //------------------------------------------------------------------------------
  buildGraph(): void {
    // Re-init the style build the graph. 
    this.style = <cytoscape.Stylesheet[]>[
      {
        selector: 'nodes',
        style: {

          'label': 'data(id)',
          "width": "60px",
          "height": "60px",
          'background-width': '60px',
          'background-height': '60px',
          "text-wrap": "ellipsis",
          "text-max-width": "100px",
          "font-size": "8px",
          "text-valign": "bottom",
          "text-halign": "center",
          "background-color": "#e9c46a",
          "background-opacity": 1,
          // "text-outline-color": "#555",
          // "text-outline-width": "2px",
          "color": "#fff",
          // "overlay-padding": "6px",
          // "padding": "0",
          "background-image": 'assets/images/icons/ip.png',
        }
      },
      {
        selector: 'node[id *= "' + this.nodeName + '"]',
        style: {
          "label": 'data(id)',
          "width": "60px",
          "height": "60px",
          "background-color": "#e76f51",
          "border-width": "2px",
          "border-color": "yellow",
          "border-opacity": 0.7,
          "font-size": "10px",
          "text-outline-color": "#e76f51"
        }
      },
      {
        selector: 'node[type = "other"]',
        style: {
          'background-image': 'assets/images/icons/ep.png',
        }
      },
      {
        selector: 'edges', // default edge style
        style: {
          'label': this.edgelabelStr,
          'curve-style': 'bezier',
          'target-arrow-shape': 'triangle',
          "font-size": "8px",
          "color": "#FFFFFF",
        }
      },
      {
        selector: 'edge:selected', // default edge style
        style: {
          'label': this.edgelabelStr,
          'curve-style': 'bezier',
          'target-arrow-shape': 'triangle',
          "font-size": "8px",
          "color": "#FFFFFF",
          "line-color": "#e76f51",
        }
      },
    ];

    this.cy = cytoscape({
      container: this.cyRef.nativeElement,
      boxSelectionEnabled: false,
      elements: {
        nodes: this.nodes,
        edges: this.edges,
      },
      style: this.style,
      layout: this.defaultoptions,
      autoungrabify: true,
      wheelSensitivity: 0.25,
      minZoom: 0.1,
      maxZoom: 5,
    });
    // pop up detail information when mouse over. 
    this.cy.on('mouseover', 'node', evt => {
      let node = evt.target;
      node.popperRef = node.popper({
        content: () => {
          let div = document.createElement('div');
          div.classList.add("popper");
          //div.innerHTML = 'Node : ' + node.id()+'<br> subgraph : [' + node.data('subgraphs')+']';
          div.innerHTML = '<p style="font-size:14px;">Node ID: ' + node.id() + '</p>'; //+
            //'<p style="font-size:10px;">Node Name: ' + node.name() + '</p>' +
            //'<p style="font-size:10px;">Node Geo: ' + node.data('geo') + '</p>' +
            //'<p style="font-size:10px;">Parent subgraph : [' + node.data('subgraphs') + ']</p>';
          document.body.appendChild(div);
          return div;
        },
        popper: {} // my popper options here
      })
    });

    this.cy.on('mouseout', 'node', evt => {
      let node = evt.target;
      if (node.popperRef) {
        node.popperRef.destroy()
        node.popperRef = null;
      }
    });

    this.cy.on('cxttapstart', 'node', evt => {
      let node = evt.target;
      if (node.popperRef) {
        node.popperRef.destroy()
        node.popperRef = null;
      }
    })

    this.cy.zoom({ level: 1 });
  }
  clearGraph() : void {
    // clear the current graph for redraw.
    if (this.cy != null) { this.cy.destroy(); }
  }

  //------------------------------------------------------------------------------
  evtListener(): void {
    if(this.cy == null) return;
    this.cy.on('tap', (event) => {
      var evtTarget = event.target;
      if (evtTarget == null) return;
      if (typeof evtTarget.isNode === "function" && evtTarget.isNode()) {
        //this.menuState = 'out';
      }
      else if (typeof evtTarget.isEdge === "function" && evtTarget.isEdge()) {
        //this.menuState = 'out';
      }
      else {
        console.log('evtListener:','Clicked the background');
        //this.menuState = 'in';
      }
    });
  }

  //------------------------------------------------------------------------------
  redraw(): void {
    // redraw the graph
    this.buildGraph();
    this.cy.zoom({ level: 1 });
    this.cy.pan({ x: 200, y: 200 });
    this.cy.fit()
    let layout = this.cy.elements().layout(this.layoutOptions);
    layout.run();
  }

  //------------------------------------------------------------------------------
  setCrtSubGraph(subgraphNames: String, nodesDis: any[], edgesDis: any[]): void {
    // Create the subgraph current shown in the display area.
    if (nodesDis.length == 0 || edgesDis.length == 0) {
      this.nodeName = null;
      //this.clearGraph();
      return
    }
    this.nodeName = subgraphNames;
    this.nodes = nodesDis;
    this.edges = edgesDis;
    this.redraw();
  }
  
  //------------------------------------------------------------------------------
  filterDisNodes(graphName:string): void{
    // remove the node not belongs to the graph name.
    // filter the displayed node by subgraph name
    this.redraw();
    //console.log('filterDisNodes', graphName)
    this.cy.nodes().filter(ele => !ele.data()['subgraphs'].includes(graphName)).remove();
  }

  //------------------------------------------------------------------------------
  setEdgeLabelStr(tag: string): void {
    switch (tag) {
      case 'score': {
        this.edgelabelStr = 'data(final_score)';
        break;
      }
      case 'sig': {
        this.edgelabelStr = 'data(signature)';
        break;
      }
      default:
        this.edgelabelStr = '';
    }
    this.redraw();
  }
}
