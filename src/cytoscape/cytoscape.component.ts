import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
// import { SidebarModule } from 'primeng/sidebar';
import { Colors } from 'src/app/core/common/colors';

import cytoscape from 'cytoscape';
import fcose from 'cytoscape-fcose';
import cxtmenu from 'cytoscape-cxtmenu';
import { of } from 'rxjs';

//-----------------------------------------------------------------------------
// Name:        cytoscapte.components.ts
// Purpose:     This module is used to generate a nodes-edges graph based on 
//              the input data of SIEM experiment. 
// Author:      Liu Yuancheng
// Created:     2021/07/25
// Copyright:    n.a    
// License:      n.a
//------------------------------------------------------------------------------

// use fcose layout.
cytoscape.use(fcose);

// Node data type
export interface NodeDataType {
  id?: String;
  value?: String;
  name?: String;
  geo?: String[];
  subgraphs?: String[];
}

//Edge data type 
export interface EdgeDataType {
  source?: String;
  target?: String;
  gini_t_port?: Number;
  signature?: String[];
  NumOfEvents?: Number;
  logtype?: String;
  unique_t_port_count?: Number;
  t_port_values?: String[];
  s_port_values?: String[];
  start_timestamp: String;
  gini_s_port?: Number;
  signature_id?: String[];
  //span?: Number;
  spanStr?: String; // use string(s, m, h, d) to replace sec data. 
  unique_s_port_count?: Number;
  dispersion?: Number;
  final_score?: Number;
  key?: Number;
}

//-----------------------------------------------------------------------------
@Component({
  selector: 'app-cytoscape',
  templateUrl: './cytoscape.component.html',
  styles: [`
  :host ::ng-deep button {
      margin-right: .35em;
  }
`]
})

//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
export class CytoscapeComponent implements OnInit, AfterViewInit {
  @ViewChild('cygraph') cyRef: ElementRef;
  @Output("parentFun") parentFun: EventEmitter<any> = new EventEmitter();

  static MY_COLOR: string = Colors.COLORS[0];
  static NODE_COLOR: string = Colors.COLORS[3];
  private nativeElement: HTMLElement;
  
  // define data storage parameters : 
  public nodes: cytoscape.NodeDefinition[] = []; // nodes data will shown in the graph. 
  public edges: cytoscape.EdgeDefinition[] = []; // edges data will shown in the graph. 
  public style: cytoscape.Stylesheet[];
  public subgraphNameArr: string[];
  // def cytoscapte used parameters
  public cy: any = null;
  private options: any;
  public customEdgeStyle: any = [];
  public selectNode: NodeDataType; 
  public selectEdge: EdgeDataType;
  private selectEdgeIdx: Number = -1;
  public nodePopperRef: any = null;
  protected layoutOptions: any = {
    name: 'fcose',
    nodeDimensionsIncludeLabels: true,
    nodeRepulsion: 9000,
    idealEdgeLength: 400,
    nodeSeparation: 150,
    nodeSep: 120,
    fit: true,
  }
  // def display flag
  public showNode: boolean = false
  public showContry: boolean = false
  public showEdge: boolean = false
  // def data show in the subgrap graph area
  public subGpar: string = '';
  public subGscore: number = 0;
  public subGcompNum: number = 0;
  public subGeventNum: number = 0;
  public subGmaxIn: String = '';
  public subGmaxOut: String = '';
  public subGcon: String[] = []; //consequence string array. 
  public edgelabelStr: string;  // displayed edges label.

//-----------------------------------------------------------------------------
  constructor(element: ElementRef, primengConfig: PrimeNGConfig) {
    // Init all parameters
    this.nativeElement = element.nativeElement;
    this.subgraphNameArr = [];
    this.edgelabelStr = "";
    this.options = {
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

    this.selectNode = {
      id: '',
      value: '',
      name: '',
      geo: [],
      subgraphs: []
    };

    this.selectEdge = {
      source: '',
      target: '',
      gini_t_port: 0,
      signature: [],
      NumOfEvents: 0,
      logtype:'',
      unique_t_port_count: 0,
      t_port_values: [],
      s_port_values: [],
      start_timestamp: '',
      gini_s_port: 0,
      signature_id: [],
      spanStr: '',
      unique_s_port_count: 0,
      dispersion: 0,
      final_score: 0,
      key: 0
    };

    this.nodePopperRef = null;
  }

  //-----------------------------------------------------------------------------
  ngOnInit(): void {
    //this.redraw(); // can not call redraw during init. 
  }

  //-----------------------------------------------------------------------------
  ngAfterViewInit(): void {
    //this.redraw() // need to call redraw after init as the parameter 
    //# <this.cyRef.nativeElement> will be init after Init.
  }

  // All detail function methods (name sorted by alphabet):
  //-----------------------------------------------------------------------------
  buildGraph() : void {
    // Create the cytoscape graph. 
    this.style = <cytoscape.Stylesheet[]>[
      {
        selector: 'nodes', // default node style
        style: {
          'label': 'data(id)',
          "width": "60px",
          "height": "60px",
          'background-width': '60px',
          'background-height': '60px',
          "text-wrap": "ellipsis",
          "text-max-width": "100px",
          "font-size": "10px",
          "text-valign": "bottom",
          "text-halign": "center",
          "background-color": CytoscapeComponent.NODE_COLOR,
          "background-opacity": 1,
          "color": "#fff",
          "background-image": 'assets/images/icons/ip.png',
        }
      },

      {
        selector: 'node:selected',
        style: {
          'label': 'data(id)',
          "background-color": "#e76f51",
          "border-width": "2px",
          "border-color": "yellow",
          "border-opacity": 0.7,
          "font-size": "10px",
          "text-outline-width": "2px",
          "text-outline-color": "#e76f51"
        }
      },

      {
        selector: 'node[type = "other"]',
        style: { 'background-image': 'assets/images/icons/ep.png',}
      },

      {
        selector: 'edges', // default edge style
        style: {
          'label': this.edgelabelStr,
          'width': 1,
          'curve-style': 'bezier',
          'target-arrow-shape': 'triangle',
          "font-size": "12px",
          "color": "#fff",
        }
      },
      ...this.customEdgeStyle, // edges style with different color
      {
        selector: 'edge:selected', // default edge style
        style: {
          'label': this.edgelabelStr,
          'width': 2,
          "font-size": "12px",
          "target-arrow-color": "blue",
          "line-color": "blue",
        }
      },
    ];
    
    this.cy = cytoscape({
      container: this.cyRef.nativeElement,
      boxSelectionEnabled: false,
      elements: {
        nodes: this.nodes,
        edges: this.edges
      },
      style: this.style,
      layout: this.options,
      autoungrabify: true,
      wheelSensitivity: 0.25,
      minZoom: 0.1,
      maxZoom: 5,
    });

    this.cy.on('mouseover', 'node', evt => {
      let node = evt.target;
      node.popperRef = node.popper({
        content: () => {
          let div = document.createElement('div');
          div.classList.add("popper");
          div.innerHTML = '<small>Node : ' + node.id() + '</small>';
          //+'<small>Parent subgraph : [' + node.data('subgraphs')+']</small>';
          document.body.appendChild(div);
          return div;
        },
        popper: {} // my popper options here
      });
      // below section is added for remove the popper remaining on the page bug.
      if (this.nodePopperRef) {
        this.nodePopperRef.destroy();
        this.nodePopperRef = null
      } else {
        this.nodePopperRef = node.popperRef;
      }
    });

    this.cy.on('mouseout', 'node', evt => {
      let node = evt.target;
      if (node.popperRef) {
        node.popperRef.destroy();
        node.popperRef = null;
        this.nodePopperRef = null;
      }
    });

    this.cy.on('cxttapstart', 'node', evt => {
      let node = evt.target;
      if (node.popperRef) {
        node.popperRef.destroy()
        node.popperRef = null;
        this.nodePopperRef = null;
      }
    })

    let defaults = {
      menuRadius: function(ele){ return 60; }, // the outer radius (node center to the end of the menu) in pixels. It is added to the rendered size of the node. Can either be a number or function as in the example.
      selector: 'node', // elements matching this Cytoscape.js selector will trigger cxtmenus
      commands: [ // an array of commands to list in the menu or a function that returns the array
        
        { 
          fillColor: 'rgba(200, 200, 200, 0.75)', // optional: custom background color for item
          content: 'View Node Detail', // html/text content to be displayed in the menu
          contentStyle: {}, // css key:value pairs to set the command's css in js if you want
          select: ele => { this.showNodeDetail(ele.id()); },
          enabled: true // whether the command is selectablele
        },

        {
          content: 'Zoom To',
          select: ele => {
            // console.log("Zoom", ele.id())
            let cy = ele.cy();
            cy.zoom({ level: 1 });
            cy.center(ele);
          },
          enabled: true // whether the command is selectable
        }

      ], // function( ele ){ return [ /*...*/ ] }, // a function that returns commands or a promise of commands
      fillColor: 'rgba(0, 0, 0, 0.75)', // the background colour of the menu
      activeFillColor: 'rgba(1, 105, 217, 0.75)', // the colour used to indicate the selected command
      activePadding: 10, // additional size in pixels for the active command
      indicatorSize: 24, // the size in pixels of the pointer to the active command, will default to the node size if the node size is smaller than the indicator size, 
      separatorWidth: 3, // the empty spacing in pixels between successive commands
      spotlightPadding: 4, // extra spacing in pixels between the element and the spotlight
      adaptativeNodeSpotlightRadius: false, // specify whether the spotlight radius should adapt to the node size
      minSpotlightRadius: 15, // the minimum radius in pixels of the spotlight (ignored for the node if adaptativeNodeSpotlightRadius is enabled but still used for the edge & background)
      maxSpotlightRadius: 20, // the maximum radius in pixels of the spotlight (ignored for the node if adaptativeNodeSpotlightRadius is enabled but still used for the edge & background)
      openMenuEvents: 'cxttapstart taphold', // space-separated cytoscape events that will open the menu; only `cxttapstart` and/or `taphold` work here
      itemColor: 'white', // the colour of text in the command's content
      itemTextShadowColor: 'transparent', // the text shadow colour of the command's content
      zIndex: 9999, // the z-index of the ui div
      atMouse: false, // draw menu at mouse position
      outsideMenuCancel: false // if set to a number, this will cancel the command if the pointer is released outside of the spotlight, padded by the number given
    };

    this.showNode = false; 
    this.showEdge = false;
    this.cy.cxtmenu( defaults );
  }

  //-----------------------------------------------------------------------------
  clearGraph() : void {
    // clear the current graph for redraw.
    if (this.cy != null) { this.cy.destroy(); }
    this.showNode = false; 
    this.showEdge = false;
  }

  //----------------------------------------------------------------------------- 
  evtListener() : void {
    if (this.cy == null) return;
    // Handle the node and edge click event. 
    this.cy.on('tap', (event) => {
      var evtTarget = event.target;
      if (evtTarget == null) { return; }
      if ( typeof evtTarget.isNode === "function" && evtTarget.isNode()) {
        this.setElementInfo('node', evtTarget);
      }
      else if (typeof evtTarget.isEdge === "function" && evtTarget.isEdge()) {
        this.setElementInfo('edge', evtTarget);
      }
      else {
        console.log('evtListener:','Clicked the background');
      }
    });
  }

  //-----------------------------------------------------------------------------
  redraw(): void {
    // Redraw the graph.
    this.buildGraph();
    this.resetLayout();
  }
  
  //----------------------------------------------------------------------------- 
  resetLayout(): void {
    this.cy.zoom({ level: 2 });
    this.cy.pan({ x: 200, y: 200 });
    this.cy.fit()
    let layout = this.cy.elements().layout(this.layoutOptions);
    layout.run();
  }

  //----------------------------------------------------------------------------- 
  setCrtSelectEdge(eleIdx: Number): void {
    // set the current selected element. input: edges Index.
    this.selectEdgeIdx = eleIdx;
    console.log("selected edge:", this.selectEdgeIdx)
    let edges = this.cy.$('edges');
    let check = true;
    for (let edge of edges) {
      if (edge.selected()) edge.unselect();
      if (edge.data('idx') == this.selectEdgeIdx && check) {
        edge.select();
        this.setElementInfo('edge', edge);
        check = false;
      }
    }
  }

  //-----------------------------------------------------------------------------
  setCrtSelectNode(nodeId: String): void {
    // set the current selected element. input: Node's ID/IP.
    let nodes = this.cy.$('nodes');
    for (let node of nodes) {
      if (node.selected()) node.unselect();
      if (node.data('id') == nodeId) {
        node.select();
        this.setElementInfo('node', node);
      }
    }
  }

  //----------------------------------------------------------------------------- 
  setCrtSubGraph(subgraphNames: string[], nodesDis: any[], edgesDis: any[]): void {
    // update the current displayed subgraph
    if (nodesDis.length == 0) {
      this.subgraphNameArr = [];
      this.clearGraph();
      return
    }
    this.subgraphNameArr = subgraphNames;
    this.nodes = nodesDis;
    this.edges = edgesDis;
    this.redraw();
  }


  //-----------------------------------------------------------------------------
  setEdgeColor(tag: string): void {
    if (tag == 'color') {
      this.customEdgeStyle = [
        {
          selector: 'edge[logtype="windows"]', // marked edge style
          style: {
            "target-arrow-color": "#f4f1de",
            "line-color": "#f4f1de",
          }
        },

        {
          selector: 'edge[logtype="snort"]', // marked edge style
          style: {
            "target-arrow-color": "#2a9d8f",
            "line-color": "#2a9d8f",
          }
        },

        {
          selector: 'edge[logtype="fortinet"]', // marked edge style
          style: {
            "target-arrow-color": "#e9c46a",
            "line-color": "#e9c46a",
          }
        },
      ];
    }
    else {
      this.customEdgeStyle = [];
    }
    this.redraw();
  }

  //-----------------------------------------------------------------------------
  setEdgeLabelStr(tag: string):void {
    switch (tag) {
      case 'logtype': {
        this.edgelabelStr = 'data(logtype)';
        break;
      }
      case 'signature': {
        this.edgelabelStr = 'data(signature)';
        break;
      }
      case 'span': {
        this.edgelabelStr = 'data(spanStr)';
        break;
      }
      case 'port_values': {
        this.edgelabelStr = 'data(t_port_values)';
        break;
      }
      case 'start_timestamp': {
        this.edgelabelStr = 'data(start_timestamp)';
        break;
      }
      case 'eventNum': {
        this.edgelabelStr = 'data(NumOfEvents)';
        break;
      }

      default: {
        this.edgelabelStr = '';
      }
    }
    this.redraw();
  }

  //----------------------------------------------------------------------------- 
  setElementInfo(eleType:string, eleData:any): void{
    // set the element tag display information. 
    if (eleType == 'node') {
      this.selectNode = {
        id: eleData.data('id'),
        value: eleData.data('value'),
        name: eleData.data('name'),
        geo: eleData.data('geo'),
        subgraphs: eleData.data('subgraphs')
      };
      this.showNode = true;
      if (this.selectNode['subgraphs'].includes('unknown')) this.showContry = false;
      this.showEdge = false;
    }
    else if (eleType == 'edge') {
      this.selectEdge = {
        source: eleData.data('source'),
        target: eleData.data('target'),
        signature_id: eleData.data('signature_id'),
        signature: eleData.data('signature'),
        NumOfEvents:eleData.data('NumOfEvents'),
        logtype:eleData.data('logtype'),
        dispersion: eleData.data('dispersion'),
        spanStr: eleData.data('spanStr'),
        unique_s_port_count: eleData.data('unique_s_port_count'),
        t_port_values:eleData.data('t_port_values'),
        s_port_values:eleData.data('s_port_values'),
        start_timestamp:eleData.data('start_timestamp'),
        gini_s_port: eleData.data('gini_s_port'),
        unique_t_port_count: eleData.data('unique_t_port_count'),
        gini_t_port: eleData.data('gini_t_port'),
        final_score: eleData.data('final_score'),
        key: eleData.data('key')
      };
      this.showNode = false;
      this.showEdge = true;
    }
    else {
      console.log("Un-supported element type:", eleType)
    }
  }

  //-----------------------------------------------------------------------------  
  showNodeDetail(nodeID:String) : void {
    // Call the parent function
    //console.log('call parent function', nodeID);
    this.parentFun.emit(nodeID);
  }

  //----------------------------------------------------------------------------- 
  setSubgraphInfo_old(subPar: string, subId: string, subScore: number, subCon: string[]): void {
    // Set the subgraph info on the left side. 
    this.subGpar = subPar + ' [ ' + subId + ' ] ';
    this.subGscore = subScore;
    this.subGcon = subCon;
  } 

  setSubgraphInfo(subPar: string, graphInfo?:any): void {
    // Set the subgraph info on the left side. 
    if(graphInfo==null){
      this.subGpar = subPar;
      this.subGscore = 0;
      this.subGcompNum = 0;
      this.subGmaxIn = '';
      this.subGmaxOut = '';
      this.subGcon = [];
      this.subGeventNum = 0;
    }
    else {
      if (graphInfo.hasOwnProperty('id')) this.subGpar = subPar + ' [ ' + graphInfo['id'] + ' ] ';
      if (graphInfo.hasOwnProperty('score')) this.subGscore = graphInfo['score'].toFixed(2);
      if (graphInfo.hasOwnProperty('consequences')) {
        this.subGcon = graphInfo['consequences']; 
        this.subGcon = this.subGcon.filter(obj => obj !== 'Other'); // remove the 'other' when show in the demo.
        this.subGcon = this.subGcon.filter((item, index) => this.subGcon.indexOf(item) === index); // remove the duplicate item.
      }
      if (graphInfo.hasOwnProperty('num_components')) this.subGcompNum = graphInfo['num_components'];
      if (graphInfo.hasOwnProperty('max_in_degree')) 
      {
        try{
          graphInfo['max_in_degree'][1] = Number(graphInfo['max_in_degree'][1]).toFixed(2); // change to 2 digits
        }
        catch{
          console.log("only one element in the data.", String(graphInfo['max_in_degree']));
        }
        this.subGmaxIn = '[' + String(graphInfo['max_in_degree']) + ']';
      }
      if (graphInfo.hasOwnProperty('max_out_degree')) 
      {
        try{
          graphInfo['max_out_degree'][1] = Number(graphInfo['max_out_degree'][1]).toFixed(2); // change to 2 digits
        } 
        catch{
          console.log("only one element in the data.", String(graphInfo['max_out_degree']));
        }
        this.subGmaxOut = '[' + String(graphInfo['max_out_degree']) + ']';
      }
      if (graphInfo.hasOwnProperty('num_components')) this.subGcompNum = graphInfo['num_components'];
      if (graphInfo.hasOwnProperty('num_events')) this.subGeventNum = graphInfo['num_events'];
    }
    // clear the display 
    this.showNode = false;
    this.showEdge = false;
  }
  
}
