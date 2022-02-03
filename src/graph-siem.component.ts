import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
// import function components
import { CytoscapeComponent } from './cytoscape/cytoscape.component';
import { NodedetailComponent } from './nodedetail/nodedetail.component';
import { getAllFiles, getAllFilesSync } from 'get-all-files';
import { SonicData } from '../../../assets/data/siem-graph/fileList.json'

// import data.
// import { elements as elementsW } from './data/windows.json';
// import { elements as elementsS } from './data/snort.json';
// import { elements as elementsF } from './data/fortinet.json';
// import { elements as elementsL } from './data/linked.json';
// import { elements as elementsLWSSep2019 } from './data/linked_subgraphs_win_snort_sep_2019.json';
// import { elements as elementsLASep2019 } from './data/linked_subgraphs_all_logs_sep_2019.json';
// import { elements as elementsLSFJun2020 } from './data/linked_subgraphs_snort_forti_june_2020.json';
// import { elements as elementsLSFSep2019 } from './data/linked_subgraphs_snort_forti_sep_2019.json';
// import { elements as elementsLWFJun2020 } from './data/linked_subgraphs_win_forti_june_2020.json';
// import { elements as elementsFJun2020 } from './data/subgraphs_fortinet_june_2020.json';
// import { elements as elementsSJun2020 } from './data/subgraphs_snort_june_2020.json';
// import { elements as elementsSSep2019 } from './data/subgraphs_snort_sep_2019.json';
// import { elements as elementsWJun2020 } from './data/subgraphs_windows_june_2020.json';
// import { elements as elementsFSep2019 } from './data/subgraphs_fortinet_sep_2019.json';
// import { elements as elementsWSep2019 } from './data/subgraphs_windows_sep_2019.json';


//-----------------------------------------------------------------------------
// Name:        cytoscapte.components.ts
// Purpose:     Create main SIEM graph web dashboard page host program.
// Author:      Liu Yuancheng
// Created:     2021/07/29
// Copyright:    n.a    
// License:      n.a
//------------------------------------------------------------------------------

const QNA_PATH = './assets/data/siem-graph/';

const DEMO_DATA = {
  'subgraphs_snort_sep_2019': QNA_PATH+'demo_data/subgraphs_snort_sep_2019.json',
  'subgraphs_snort_june_2020': QNA_PATH+'demo_data/subgraphs_snort_june_2020.json',
  'subgraphs_windows_sep_2019': QNA_PATH+'demo_data/subgraphs_windows_sep_2019.json',
  'subgraphs_windows_june_2020': QNA_PATH+'demo_data/subgraphs_windows_june_2020.json',
  'subgraphs_fortinet_sep_2019': QNA_PATH+'demo_data/subgraphs_fortinet_sep_2019.json',
  'subgraphs_fortinet_june_2020': QNA_PATH+'demo_data/subgraphs_fortinet_june_2020.json',
  'linked_subgraphs_all_logs_sep_2019': QNA_PATH+'demo_data/linked_subgraphs_all_logs_sep_2019.json',
  'linked_subgraphs_win_snort_sep_2019': QNA_PATH+'demo_data/linked_subgraphs_win_snort_sep_2019.json', 
  'linked_subgraphs_snort_forti_june_2020': QNA_PATH+'demo_data/linked_subgraphs_snort_forti_june_2020.json',
  'linked_subgraphs_snort_forti_sep_2019': QNA_PATH+'demo_data/linked_subgraphs_snort_forti_sep_2019.json',
  'linked_subgraphs_win_forti_june_2020':QNA_PATH+'demo_data/linked_subgraphs_win_forti_june_2020.json',
};

const SONIC_DATA = {
  'case_1':QNA_PATH+'sonic_data/case_1.json',
  'case_2':QNA_PATH+'sonic_data/case_2.json',
  'case_4':QNA_PATH+'sonic_data/case_4.json',
  'case_5_1':QNA_PATH+'sonic_data/case_5_1.json',
  'case_5_2':QNA_PATH+'sonic_data/case_5_2.json',
  'case_5_4':QNA_PATH+'sonic_data/case_5_4.json',
  'case_6a_6b':QNA_PATH+'sonic_data/case_6a_6b.json',
  'case_6c_1':QNA_PATH+'sonic_data/case_6c_1.json',
  'case_6c_2':QNA_PATH+'sonic_data/case_6c_2.json',
  'case_6c_3':QNA_PATH+'sonic_data/case_6c_3.json',
  'case_6c_4':QNA_PATH+'sonic_data/case_6c_4.json',
  'case_7':QNA_PATH+'sonic_data/case_7.json',
  'case_8':QNA_PATH+'sonic_data/case_8.json',
  'case_9_1':QNA_PATH+'sonic_data/case_9_1.json',
  'case_9_2':QNA_PATH+'sonic_data/case_9_2.json',
  'case_9_3':QNA_PATH+'sonic_data/case_9_3.json',
  'case_10_snort_logs':QNA_PATH+'sonic_data/case_10_snort_logs.json',
  'case_10_windows_logs':QNA_PATH+'sonic_data/case_10_windows_logs.json',
  'case_11':QNA_PATH+'sonic_data/case_11.json',
  'case_12':QNA_PATH+'sonic_data/case_12.json',
  'linked_graphs_sep_2019_all_logs':QNA_PATH+'sonic_data/linked_graphs_sep_2019_all_logs.json',
  'subgraphs_sep_2019_fortinet':QNA_PATH+'sonic_data/subgraphs_sep_2019_fortinet.json',
  'subgraphs_sep_2019_snort':QNA_PATH+'sonic_data/subgraphs_sep_2019_snort.json',
  'subgraphs_sep_2019_windows':QNA_PATH+'sonic_data/subgraphs_sep_2019_windows.json',
}

// Define the data type used in jqxGrid table: 
type subgraphType = Array<{
  name: string,
  score: number,
  consequences: string[]
}>;

type nodeType = Array<{
  id: string,
  subgraphs: string[],
  type: string,
  geo: string[]
}>;

type nodeRelType = Array<{
  name: string,
  score: number,
  subgraphs: string[]
}>; // node relationship datatyple (under editing)

type edgesType = Array<{
  source: String,
  target: String,
  gini_t_port: Number,
  signature: String[],
  unique_t_port_count: Number,
  gini_s_port: Number,
  signature_id: String[],
  span: Number,
  unique_s_port_count: Number,
  dispersion: Number,
  final_score: Number,
  key: Number,
  idx: Number,
}>;

//------------------------------------------------------------------------------
@Component({
  selector: 'app-graph-siem',
  templateUrl: './graph-siem.component.html',
  styleUrls: ['./graph-siem.component.scss']
})

//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
export class GraphSiemComponent implements AfterViewInit, OnInit {
  @ViewChild('graphGrid') graphGridList: jqxGridComponent; // landing page subgraph table
  @ViewChild('edgeGrid') edgeGridList: jqxGridComponent; // landing page edges table
  @ViewChild('nodedGrid') nodeGridList: jqxGridComponent; // landing page nodes table
  @ViewChild('cygraph') cygraph: CytoscapeComponent;  // landing page subgraoh cytoscapte graph
  @ViewChild('subGrid') subGridList: jqxGridComponent;  // node detail page subgrapsh table 
  @ViewChild('nodegraph') nodegraph: NodedetailComponent; // node detail page cytoscapte graph 
  @ViewChild('filterValue', { read: ElementRef }) filterValue: ElementRef<HTMLElement>;
  // def tag/page switch parameters
  public landPageSelected = false;
  public selectedTag = new FormControl(0);
  //public graphDict = DEMO_DATA; 
  //public graphDict = SONIC_DATA
  public graphDict = SonicData

  // def data source for the tables
  public subgrapsSelected: subgraphType = []; // landing page subgraph table data src
  public subgrapSrc: any;
  public nodesW: nodeType = []; // landing page node table data src
  public nodesSrc: any;
  public edgesW: edgesType = []; // landing page edge table data src
  public edgesSrc: any;
  public nodePrtList: subgraphType = []; // node detail page subgraph table data src
  public nodePrtSrc: any;
  public nodeRelList: nodeRelType = []; // node detail page nodes table data src 
  public nodeRelSrc: any;
  public edgeRelList: edgesType = [];  // node detail page edges data src 
  public edgeRelSrc: any;

  // def column tag for the tables: 
  public subgraphColumns = [
    { text: 'ID', datafield: 'name', width: '50px' },
    { text: 'Score', datafield: 'score', width: '60px' },
    { text: 'Consequences', datafield: 'consequences' },
  ]; // landing page subgraph table

  public nodesLColums = [
    { text: 'ID', datafield: 'id', width: '100px' },
    { text: 'Type', datafield: 'type' },
    { text: 'Subgraph', datafield: 'subgraphs' },
    { text: 'Country', datafield: 'geo' },
  ]; // landing page node table

  public nodesWColumns = [
    { text: 'NodeID', datafield: 'name', width: '80px' },
    { text: 'Risk score', datafield: 'score', width: '80px' },
    { text: 'Subgraph', datafield: 'subgraphs' }
  ]; // node detail page nodes table

  public edgesWColumns = [
    { text: 'Source', datafield: 'source', width: '100px' },
    { text: 'Target', datafield: 'target', width: '100px' },
    { text: 'Signature', datafield: 'signature', width: '240px' },
    { text: 'Gini_t_port', datafield: 'gini_t_port' },
    { text: 'Logtype', datafield: 'logtype', width: '80px' },
    { text: 'Start_timestamp', datafield: 'start_timestamp' },
    { text: 'Span', datafield: 'spanStr', width: '80px' },
    { text: 'NumOfEvents', datafield: 'NumOfEvents' },
    { text: 'Unique_t_port_count', datafield: 'unique_t_port_count', width: '120px' },
    { text: 'T_port_values', datafield: 't_port_values' },
    { text: 'Gini_s_port', datafield: 'gini_s_port' },
    { text: 'Signature_id', datafield: 'signature_id' },
    { text: 'Unique_s_port_count', datafield: 'unique_s_port_count', width: '120px' },
    { text: 'S_port_values', datafield: 's_port_values' },
    { text: 'Dispersion', datafield: 'dispersion' },
    { text: 'Final_score', datafield: 'final_score' },
    { text: 'Key', datafield: 'key', width: '40px' },
    { text: 'Idx', datafield: 'idx' }
  ];

  // def data set parameters
  public selectedDataSet: string; // selected data set name
  public nodes: any;  // store all the nodes data in the selected data set. 
  public edges: any;  // store all the edges data in the selected data set.

  // def displayed graph paramters
  public subgraphName: string = '';
  public nodesDis = []; // nodes show in the landing page graph.
  public edgesDis = []; // edges show in the landing page graph.

  // def data set filter tab parameter
  public subgraphTitle: String = ''; // filter subgraph title show in the config page.
  public graphFilterKey: String = '';
  public filterStrExpl: String = ' ';
  public edgesColor: string = '';

  // def Node detail page parameters
  public selectednodeID: String = '';

  // def subgraph fileter parameter:
  public selectedfilter: String = '';
  public selectedCat: String = '';

  // def subgraph table drop down detail template: show consequence 
  public sugbraphdetailstemplate: any =
    {
      rowdetails: "<div class=\"vertical-menu\" style='width:90%; height: 250px;'> Consquences:  </div>",
      rowdetailsheight: 150
    };

  initconqdetails = (index: any, parentElement: any, gridElement: any, datarecord: any): void => {
    if (parentElement == null) return;
    let rowdetails = parentElement.children[0];
    //console.log("rowdetails", index)
    let conString = String(this.graphGridList.getcelltext(index, 'consequences')).split(',');
    const createNameValue = (name) => {
      let tr = document.createElement("a");
      tr.appendChild(document.createTextNode(' - ' + name));
      return tr;
    }
    let container = document.createElement('a');
    for (let conStr of conString) {
      container.appendChild(createNameValue(conStr));
    }
    rowdetails.appendChild(container);
  };

  // def edges table drop down detail template: show all the information except src and tgt.
  public edgedetailstemplate: any =
    {
      rowdetails: "<div style='margin: 10px; height: 310px;  overflow-x: scroll;'></div>",
      rowdetailsheight: 330
    };
  initedgedetails = (index: any, parentElement: any, gridElement: any, datarecord: any): void => {
    if (parentElement == null) return;
    let rowdetails = parentElement.children[0];
    // console.log("rowdetails", rowdetails)
    const createNameValue = (name, value) => {
      let tr = document.createElement("tr");
      let th = document.createElement("th")
      th.setAttribute("style", "text-align: right;")
      th.appendChild(document.createTextNode(name))
      tr.appendChild(th)
      let td = document.createElement("td")
      td.setAttribute("style", "padding-left: 5px;")
      td.appendChild(document.createTextNode(value))
      tr.appendChild(td)
      return tr;
    }

    let container = document.createElement('table');
    container.appendChild(createNameValue('Signature :', String(this.edgeGridList.getcelltext(index, 'signature'))));
    container.appendChild(createNameValue('NumOfEvents:', String(this.edgeGridList.getcelltext(index, 'NumOfEvents'))));
    container.appendChild(createNameValue('Logtype:', String(this.edgeGridList.getcelltext(index, 'logtype'))));
    container.appendChild(createNameValue('Gini_t_port :', String(this.edgeGridList.getcelltext(index, 'gini_t_port'))));
    container.appendChild(createNameValue('Span :', String(this.edgeGridList.getcelltext(index, 'spanStr'))));
    container.appendChild(createNameValue('Unique_t_port_count :', String(this.edgeGridList.getcelltext(index, 'unique_t_port_count'))));
    container.appendChild(createNameValue('T_port_values :', String(this.edgeGridList.getcelltext(index, 't_port_values'))));
    container.appendChild(createNameValue('S_port_values :', String(this.edgeGridList.getcelltext(index, 's_port_values'))));
    container.appendChild(createNameValue('Start_timestamp :', String(this.edgeGridList.getcelltext(index, 'start_timestamp'))));
    container.appendChild(createNameValue('Gini_s_port :', String(this.edgeGridList.getcelltext(index, 'gini_s_port'))));
    container.appendChild(createNameValue('Signature_id :', String(this.edgeGridList.getcelltext(index, 'signature_id'))));
    container.appendChild(createNameValue('Unique_s_port_count :', String(this.edgeGridList.getcelltext(index, 'unique_s_port_count'))));
    container.appendChild(createNameValue('Dispersion :', String(this.edgeGridList.getcelltext(index, 'dispersion'))));
    container.appendChild(createNameValue('Final_score :', String(this.edgeGridList.getcelltext(index, 'final_score'))));
    container.appendChild(createNameValue('Key :', String(this.edgeGridList.getcelltext(index, 'key'))));
    rowdetails.appendChild(container);
  };

  // list of the markdown file to show on the help and 
  public userManual = {
    Introduction: QNA_PATH + 'intorduction.md',
    questions: [
      {
        title: 'Q1. How to view list of graphs generated for a particular time period and log source?',
        path: QNA_PATH + 'siem-q1.md',
      },

      {
        title: 'Q2. How to view a particular graph?',
        path: QNA_PATH + 'siem-q2.md',
      },

      {
        title: 'Q3. How to view graph details?',
        path: QNA_PATH + 'siem-q3.md',
      },
      {
        title: 'Q4. How to configure graph visualization?',
        path: QNA_PATH + 'siem-q4.md',
      },
      {
        title: 'Q5. How to view all graphs associated with a node (IP address / ComputerName)?',
        path: QNA_PATH + 'siem-q5.md',
      },
    ]
  }

  //-----------------------------------------------------------------------------
  constructor(private httpClient: HttpClient) {
    this.selectedDataSet = 'case_1';
    this.nodes = [] // elementsW['nodes'];
    this.edges = []// elementsW['edges'];
    this.graphFilterKey = 'none';
    this.edgesColor = 'gray';
    this.selectedCat = 'null';

    // build the subgraphs table in node detail page
    this.nodePrtSrc = new jqx.dataAdapter({ localData: this.nodePrtList, });
    //  build the related nodes table in node detail page
    this.nodeRelSrc = new jqx.dataAdapter({ localData: this.nodeRelList, });
    // build the related edges table in the node detail page
    this.edgeRelSrc = new jqx.dataAdapter({ localData: this.edgeRelSrc, });
  }

  //-----------------------------------------------------------------------------
  ngOnInit(): void {
    this.loadGraphsData();
  }

  //-----------------------------------------------------------------------------
  ngAfterViewInit() {
    this.subGridList.refreshdata()
  }

  // All detail function methods (name sorted by alphabet):
  //-----------------------------------------------------------------------------
  buildEdgesTable(subgName: string) {
    // update the edges table based on the input subgraph name/ID
    let nodeIDlist = [];
    this.edgesDis = [];
    this.edgesW = [];
    // clear the table if the input data is empty.
    if (subgName == ' ' || subgName == '') {
      this.edgesSrc = new jqx.dataAdapter({ localData: this.edgesW });
      return;
    }
    // find all nodes's id belongs to the sub graph list: 
    for (let obj of this.nodes) {
      if (obj['data'].hasOwnProperty('subgraphs') && obj['data']['subgraphs'].includes(subgName)) nodeIDlist.push(obj['data']['id']);
    }
    // find all edges src+tgt nodes are all in the subgraph list.
    for (let obj of this.edges) {
      if (nodeIDlist.includes(obj['data']['source']) && nodeIDlist.includes(obj['data']['target'])) {
        // convert the span value to string with unit.
        if (obj['data']['span'] < 1) {
          obj['data']['spanStr'] = "" + Number(obj['data']['span']).toFixed(1) + "s";
        }
        else if (obj['data']['span'] < 3600) {
          obj['data']['spanStr'] = "" + Number(obj['data']['span'] / 60).toFixed(1) + "m";
        }
        else if (obj['data']['span'] < 3600 * 24) {
          obj['data']['spanStr'] = "" + Number(obj['data']['span'] / 3600).toFixed(2) + "h";
        }
        else {
          obj['data']['spanStr'] = "" + Number(obj['data']['span'] / (3600 * 24)).toFixed(3) + "d";
        }
        this.edgesDis.push(obj); // update the graph edges
        this.edgesW.push(obj['data']);
      }
    }
    // build the Edges table
    this.edgesSrc = new jqx.dataAdapter({ localData: this.edgesW });
  }

  //-----------------------------------------------------------------------------
  buildNodesTable(subgName: string) {
    // update the nodes table based on the input subgraph name/ID
    console.log('buildNodesTable', subgName)
    this.nodesDis = [];
    this.nodesW = [];
    if (subgName == ' ' || subgName == '') {
      this.nodesSrc = new jqx.dataAdapter({ localData: this.nodesW });
      return;
    }
    for (let obj of this.nodes) {
      if (obj['data'].hasOwnProperty('subgraphs') && obj['data']['subgraphs'].includes(subgName)) {
        this.nodesDis.push(obj); // update the graph data.
        // Add the nodes.(only node have teh geo tag)
        if (obj['data'].hasOwnProperty("geo")) {
          this.nodesW.push({
            "id": obj['data']["id"],
            "subgraphs": obj['data']['subgraphs'],
            "type": obj['data']['type'],
            "geo": obj['data']['geo'][0] // only add the country code.
          });
        }
      }
    }
    // udpate the table data source.
    this.nodesSrc = new jqx.dataAdapter({ localData: this.nodesW });
  }

  //-----------------------------------------------------------------------------
  filterSelHandler(event: any) {
    // handle the subgraph filter catergory selection.
    this.selectedfilter = event.target.value;
    if (this.selectedfilter == 'null') this.rebuildSubgraph(); // clear the rebuild if user select <blanl>
  }

  //-----------------------------------------------------------------------------
  loadGraphsData(): void {
    console.log("graph select:", this.graphDict[this.selectedDataSet]);
    if(this.graphGridList) this.graphGridList.selectionmode('none');
    if(!this.graphDict.hasOwnProperty(this.selectedDataSet)) return;
    this.httpClient.get(this.graphDict[this.selectedDataSet]).subscribe(data =>{
      //console.log(data);
      let products = data['elements'];
      this.nodes = products['nodes'];
      this.edges = products['edges'];
      // the below code must be put in the subscribe section.
      this.subgrapsSelected = [];
      for (let obj of this.nodes) {
        if (!obj['data'].hasOwnProperty('subgraphs')) {
          this.subgrapsSelected.push({
            "name": obj['data']["id"],
            "score": Number(obj['data']["score"].toFixed(2)),
            "consequences": obj['data']["consequences"]
          });
        }
      }
  
      this.subgrapSrc = new jqx.dataAdapter({
        localData: this.subgrapsSelected,
        sortcolumn: 'score',
        sortdirection: 'dsc',
      });
      if(this.graphGridList) this.graphGridList.selectionmode('singlerow');
    })

    return;

    // load subgraphs data based on user's selection:  
    // switch (this.selectedDataSet) {
    //   case 'windows': {
    //     this.nodes = elementsW['nodes'];
    //     this.edges = elementsW['edges'];
    //     break;
    //   }
    //   case 'snort': {
    //     this.nodes = elementsS['nodes'];
    //     this.edges = elementsS['edges'];
    //     break;
    //   }
    //   case 'fortinet': {
    //     this.nodes = elementsF['nodes'];
    //     this.edges = elementsF['edges'];
    //     break;
    //   }
    //   case 'linked_subgraphs_win_snort_sep_2019': {
    //     this.nodes = elementsLWSSep2019['nodes'];
    //     this.edges = elementsLWSSep2019['edges'];
    //     break;
    //   }
    //   case 'linked_subgraphs_all_logs_sep_2019': {
    //     this.nodes = elementsLASep2019['nodes'];
    //     this.edges = elementsLASep2019['edges'];
    //     break;
    //   }
    //   case 'linked_subgraphs_snort_forti_june_2020': {
    //     this.nodes = elementsLSFJun2020['nodes'];
    //     this.edges = elementsLSFJun2020['edges'];
    //     break;
    //   }
    //   case 'linked_subgraphs_snort_forti_sep_2019': {
    //     this.nodes = elementsLSFSep2019['nodes'];
    //     this.edges = elementsLSFSep2019['edges'];
    //     break;
    //   }
    //   case 'linked_subgraphs_win_forti_june_2020': {
    //     this.nodes = elementsLWFJun2020['nodes'];
    //     this.edges = elementsLWFJun2020['edges'];
    //     break;
    //   }
    //   case 'subgraphs_fortinet_june_2020': {
    //     this.nodes = elementsFJun2020['nodes'];
    //     this.edges = elementsFJun2020['edges'];
    //     break;
    //   }
    //   case 'subgraphs_snort_june_2020': {
    //     this.nodes = elementsSJun2020['nodes'];
    //     this.edges = elementsSJun2020['edges'];
    //     break;
    //   }
    //   case 'subgraphs_snort_sep_2019': {
    //     this.nodes = elementsSSep2019['nodes'];
    //     this.edges = elementsSSep2019['edges'];
    //     break;
    //   }
    //   case 'subgraphs_windows_june_2020': {
    //     this.nodes = elementsWJun2020['nodes'];
    //     this.edges = elementsWJun2020['edges'];
    //     break;
    //   }
    //   case 'subgraphs_fortinet_sep_2019': {
    //     this.nodes = elementsFSep2019['nodes'];
    //     this.edges = elementsFSep2019['edges'];
    //     break;
    //   }
    //   case 'subgraphs_windows_sep_2019': {
    //     this.nodes = elementsWSep2019['nodes'];
    //     this.edges = elementsWSep2019['edges'];
    //     break;
    //   }
    //   default: {
    //     this.nodes = elementsLASep2019['nodes'];
    //     this.edges = elementsLASep2019['edges'];
    //   }
    // }
    // // build the subgraphs table in landing page: 
    // this.subgrapsSelected = [];
    // for (let obj of this.nodes) {
    //   if (!obj['data'].hasOwnProperty('subgraphs')) {
    //     this.subgrapsSelected.push({
    //       "name": obj['data']["id"],
    //       "score": Number(obj['data']["score"].toFixed(2)),
    //       "consequences": obj['data']["consequences"]
    //     });
    //   }
    // }

    // this.subgrapSrc = new jqx.dataAdapter({
    //   localData: this.subgrapsSelected,
    //   sortcolumn: 'score',
    //   sortdirection: 'dsc',
    // });
  }

  //-----------------------------------------------------------------------------
  onRebuild(value: string): void {
    // filter all the subgraphs and rebuild the tables and graph ( current this function is 
    // not used), this function was replaced by onSubGraphFilter(value: string).
    var subgraphNames = ['filtered'];
    if (this.selectedfilter == 'nodes') {
      this.edgesDis = [];
      this.nodesDis = [];
      let NodeArr = [];
      if (this.selectedCat == 'type') {
        // filter the edge list and build the node name list
        for (let obj of this.nodes) {
          if (obj['data'].hasOwnProperty('type')) {
            if (obj['data']['type'].toString() == value) {
              this.nodesDis.push(obj);
              NodeArr.push(obj['data']['id'].toString());
            }
          }
        }
        //console.log("node ID:", NodeArr);
        for (let obj of this.edges) {
          if (NodeArr.includes((obj['data']['source'])) && NodeArr.includes((obj['data']['target']))) this.edgesDis.push(obj);
        }
      } else if (this.selectedCat == 'country') {
        // filter the edge list and build the node name list
        for (let obj of this.nodes) {
          if (obj['data'].hasOwnProperty('geo')) {
            if (obj['data']['geo'][0].toString() == value) {
              this.nodesDis.push(obj);
              NodeArr.push(obj['data']['id'].toString());
            }
          }
        }
        //console.log("node ID:", NodeArr);
        for (let obj of this.edges) {
          if (NodeArr.includes((obj['data']['source'])) && NodeArr.includes((obj['data']['target']))) this.edgesDis.push(obj);
        }
      }
    } else if (this.selectedfilter == 'edges') {
      this.edgesDis = [];
      this.nodesDis = [];
      let NodeArr = [value];
      if (this.selectedCat == 'source') {
        // filter the edge list and build the node name list
        for (let obj of this.edges) {
          if (obj['data']['source'].toString() == value) {
            this.edgesDis.push(obj);
            NodeArr.push(obj['data']['target'].toString())
          }
        }
        for (let obj of this.nodes) {
          if (NodeArr.includes(obj['data']['id'])) this.nodesDis.push(obj);
        }
      } else if (this.selectedCat == 'target') {
        for (let obj of this.edges) {
          if (obj['data']['target'].toString() == value) {
            this.edgesDis.push(obj);
            NodeArr.push(obj['data']['source'].toString())
          }
        }
        for (let obj of this.nodes) {
          if (NodeArr.includes(obj['data']['id'])) this.nodesDis.push(obj);
        }
      }
    }
    // rebuild the graph 
    this.cygraph.setCrtSubGraph(subgraphNames, this.nodesDis, this.edgesDis);
  }

  onReload():void{
    //glob.Glob( QNA_PATH+'sonic_data/*.json', function(file, error){ console.log(">>>>>> ", file.toString);} );
    //var files = fs.readFileSync(QNA_PATH+'sonic_data/')
    //console.log(getAllFilesSync(`./assets/data/siem-graph/sonic_data/`).toArray())
    //console.log(">>>>>> ", files.toString);
    //for (const filename of getAllFilesSync(`./assets/data/siem-graph/sonic_data`)) {
      // Could break early on some condition and get-all-files
      // won't have unnecessarily accumulated the filenames in an array
      //console.log(filename)
    //}

    var str = require('fs').readFileSync('./assets/data/siem-graph/sonic_data', 'utf8');

    console.log(">>>>>> ", str);

  }

  //-----------------------------------------------------------------------------
  onSubGraphFilter(value: string): void {
    // filter the subgraphs based on the input value.
    this.filterStrExpl = value;
    if (value.includes(':')) this.filterStrExpl = value.split(':')[1];
    let SubgraphList = [];
    switch (this.graphFilterKey) {
      // filter By Node ID (subgraph who contents the node)
      case "nodeIP": {
        let nameList = [];
        for (let obj of this.nodes) {
          if (obj['data']['id'] == this.filterStrExpl) nameList = obj['data']['subgraphs'];
        }
        for (let obj of this.subgrapsSelected) {
          if (nameList.includes(obj['name'])) SubgraphList.push(obj);
        }
        console.log("SubgraphList", SubgraphList.toString);
        break;
      }
      // filter by subgraph score. 
      case 'score': {
        let foundNum = this.filterStrExpl.match(/[+-]?\d+(\.\d+)?/g); // get the float number from the string.
        if (foundNum == null || foundNum.length == 0) break;
        let filterScore = parseFloat('' + foundNum[0]);
        console.log("Score fileter: ", filterScore);
        // compare the score
        if (this.filterStrExpl.includes('<=')) {
          for (let obj of this.subgrapsSelected) {
            if (Number(obj['score']) <= filterScore) SubgraphList.push(obj);
          }
        } else if (this.filterStrExpl.includes('<')) {
          for (let obj of this.subgrapsSelected) {
            if (Number(obj['score']) < filterScore) SubgraphList.push(obj);
          }
        } else if (this.filterStrExpl.includes('==')) {
          for (let obj of this.subgrapsSelected) {
            if (Number(obj['score']) == filterScore) SubgraphList.push(obj);
          }
        } else if (this.filterStrExpl.includes('>=')) {
          for (let obj of this.subgrapsSelected) {
            if (Number(obj['score']) >= filterScore) SubgraphList.push(obj);
          }
        }
        else {
          for (let obj of this.subgrapsSelected) {
            if (Number(obj['score']) > filterScore) SubgraphList.push(obj);
          }
        }
      }
      // contents the input consquence string.
      case 'consequences': {
        for (let obj of this.subgrapsSelected) {
          console.log('consequences loop:', obj["consequences"]);
          if (obj["consequences"].includes('' + this.filterStrExpl)) SubgraphList.push(obj);
        }
      }
      default: {
        console.log('onSubGraphFilter', 'unsupported graph filter type.')
      }
    }
    // set up the node list which sort by score
    this.subgrapSrc = new jqx.dataAdapter({
      localData: SubgraphList,
      sortcolumn: 'score',
      sortdirection: 'dsc',
    });
  }

  //-----------------------------------------------------------------------------
  parentFun(nodeID: String): void {
    // When user right click the cxt menu and select  the "node detail", Swith the 
    // focus tab to the node detail page and create the graph and tables.
    this.selectedTag.setValue(1);
    this.selectednodeID = nodeID;
    let nodesToNP = []; // nodes shown in the node detail graph. 
    let edgesToNP = []; // edges shown in the node detail graph.
    let nodesNames = [nodeID,];
    this.nodeRelList = [];
    this.edgeRelList = [];
    // find all the related edges and nodes
    for (let obj of this.edges) {
      if (obj['data']['source'] == nodeID) {
        edgesToNP.push(obj);
        nodesNames.push(obj['data']['target']);
        this.edgeRelList.push(obj['data']);
      }
      if (obj['data']['target'] == nodeID) {
        edgesToNP.push(obj);
        nodesNames.push(obj['data']['source']);
        this.edgeRelList.push(obj['data']);
      }
    }
    // Add all the related node in to the related node list.
    for (let obj of this.nodes) {
      if (nodesNames.includes(obj['data']['id'])) {
        nodesToNP.push(obj);
        this.nodeRelList = this.nodeRelList.concat({ "name": obj['data']['id'], "score": 0, "subgraphs": obj['data']['subgraphs'] });
      }
    }
    // setup the node's subgrap table 
    let parentNames = [];
    this.nodePrtList = [];
    for (let obj of this.nodes) {
      if (obj['data']['id'] == nodeID) parentNames = parentNames.concat(obj['data']['subgraphs']);
    }
    //console.log("parents:", parentNames);
    for (let obj of this.nodes) {
      if (parentNames.includes(obj['data']['id'])) {
        this.nodePrtList.push({ "name": obj['data']['id'], "score": obj['data']['score'], "consequences": obj['data']['consequences'] });
      }
    }
    console.log("Data to node page", this.nodePrtList);
    //create  the node page sub graph
    this.nodegraph.setCrtSubGraph(nodeID, nodesToNP, edgesToNP);

    // update all the tables in the node detail page: 
    this.nodePrtSrc = new jqx.dataAdapter({ localData: this.nodePrtList, });
    this.nodeRelSrc = new jqx.dataAdapter({ localData: this.nodeRelList, });
    this.edgeRelSrc = new jqx.dataAdapter({ localData: this.edgeRelList, });
  }

  //-----------------------------------------------------------------------------
  rebuildFiltergraph(value: string): void {
    // Rebuld the current displayed graph based on the input filter sting.
    var subgraphNames = ['filtered'];
    let edgesFilDis = [];
    let edegsFilW = [];
    let nodesFilDis = [];
    let nodesFilW = [];
    let NodeArr = [];
    // Add the related edges and build the node name list.
    if (this.selectedfilter == 'nodes') { // filter by Node ID
      NodeArr.push(value);
      for (let obj of this.edgesDis) {
        if (obj['data']['source'] == value || obj['data']['target'] == value) {
          edgesFilDis.push(obj);
          edegsFilW.push(obj['data']);
          if (!NodeArr.includes(obj['data']['source'])) NodeArr.push(obj['data']['source']);
          if (!NodeArr.includes(obj['data']['target'])) NodeArr.push(obj['data']['target']);
        }
      }
    } else if (this.selectedfilter == 'edges') { // filter by edges signature.
      for (let obj of this.edgesDis) {
        for (let sigStr of obj['data']['signature']) {
          if (sigStr.includes(value)) {
            edgesFilDis.push(obj);
            edegsFilW.push(obj['data']);
            if (!NodeArr.includes(obj['data']['source'])) NodeArr.push(obj['data']['source']);
            if (!NodeArr.includes(obj['data']['target'])) NodeArr.push(obj['data']['target']);
          }
        }
      }
    }
    // Add the related nodes.
    for (let obj of this.nodesDis) {
      if (NodeArr.includes(obj['data']['id'])) {
        nodesFilDis.push(obj);
        nodesFilW.push({
          "id": obj['data']["id"],
          "subgraphs": obj['data']['subgraphs'],
          "type": obj['data']['type'],
          "geo": obj['data']['geo'][0]
        });
      }
    }
    // update nodes and edges tables
    this.nodesSrc = new jqx.dataAdapter({ localData: nodesFilW });
    this.edgesSrc = new jqx.dataAdapter({ localData: edegsFilW });
    // update the graph
    this.cygraph.setCrtSubGraph(subgraphNames, nodesFilDis, edgesFilDis);
    this.cygraph.redraw();
  }

  //-----------------------------------------------------------------------------
  rebuildSubgraph(): void {
    // rebuild the current displayed subgraph, node edges table in the landing page.
    this.buildNodesTable(this.subgraphName);
    this.buildEdgesTable(this.subgraphName);
    //this.cygraph.setSubgraphInfo(this.selectedDataSet, this.subgraphName, 0, [])
    this.cygraph.setSubgraphInfo(this.selectedDataSet)
    this.subgraphTitle = this.selectedDataSet + '[' + this.subgraphName + ']';
    this.cygraph.setCrtSubGraph([this.subgraphName], this.nodesDis, this.edgesDis);
    this.cygraph.redraw();
  }

  reLayoutgraph(event: any): void { this.cygraph.resetLayout(); }
  reLayoutNodegraph(event: any): void { this.nodegraph.redraw(); }
  
  //-----------------------------------------------------------------------------
  selectDataSetHandler(event: any): void {
    // Handle the event when user select new data set.
    this.selectedDataSet = event.target.value;
    this.loadGraphsData();
    // clear the previous graph and its info tag. 
    this.cygraph.clearGraph();
    //this.cygraph.setSubgraphInfo(this.selectedDataSet, '', 0, [])
    this.cygraph.setSubgraphInfo(this.selectedDataSet,)
    this.buildNodesTable('');
    this.buildEdgesTable('');
  }

  //-----------------------------------------------------------------------------
  selectEdgeLabel(event: any) {
    // change the node detail page graph edges' label.
    let selectedLb = event.target.value;
    this.nodegraph.setEdgeLabelStr(selectedLb);
  }

  //-----------------------------------------------------------------------------
  selectFilterHandler(event: any): void {
    // fill the filter text field with filter example str or reset the filtered graph
    // table.
    this.graphFilterKey = event.target.value;
    switch (this.graphFilterKey) {
      case 'nodeIP': {
        this.filterStrExpl = 'Example:127.0.0.1';
        break;
      }
      case 'score': {
        this.filterStrExpl = 'Example:<=6.0';
        break;
      }
      case 'consequences': {
        this.filterStrExpl = 'Example:Read Data';
        break;
      }
      default: {
        // reset the filter
        this.filterStrExpl = '';
        this.subgrapSrc = new jqx.dataAdapter({
          localData: this.subgrapsSelected,
          sortcolumn: 'score',
          sortdirection: 'dsc',
        });
      }
    }
  }

  //-----------------------------------------------------------------------------
  selectGraphRow(event: any): void {
    // update the graph, node edges table when user select different row in the 
    // graph table.
    let args = event.args;
    console.log("selectGraphRow , rowIdx:", args.rowindex)
    this.subgraphName = this.graphGridList.getcelltext(args.rowindex, 'name')
    var subgraphNames = [this.subgraphName]; // leave this as array incase we need support multi graph display
    //var subgrapshScore = Number(this.graphGridList.getcelltext(args.rowindex, 'score'))
    //var subgrapshCons = String(this.graphGridList.getcelltext(args.rowindex, 'consequences')).split(',')
    // update tables
    this.buildNodesTable(this.subgraphName);
    this.buildEdgesTable(this.subgraphName);
    // udapte graph and displayed information
    for (let obj of this.nodes) {
      if (obj['data'].hasOwnProperty('consequences') && obj['data']['id'].includes(this.subgraphName)) {
        this.cygraph.setSubgraphInfo(this.selectedDataSet, obj['data']);
        break;
      }
    }

    this.subgraphTitle = this.selectedDataSet + '[' + this.subgraphName + ']';
    //this.cygraph.setSubgraphInfo(this.selectedDataSet, this.subgraphName, subgrapshScore, subgrapshCons)
    this.cygraph.setCrtSubGraph(subgraphNames, this.nodesDis, this.edgesDis);
    this.cygraph.redraw();
  }

  //-----------------------------------------------------------------------------
  selectEdgeRow(event: any): void {
    // focus the related node when the use click the row of landing page nodes table.
    let args = event.args;
    console.log("Edge row selected", args.rowindex)
    var selectEdgeIdx = this.edgeGridList.getcelltext(args.rowindex, 'idx')
    this.cygraph.setCrtSelectEdge(Number(selectEdgeIdx));
  }

  //-----------------------------------------------------------------------------
  selectNodeRow(event: any): void {
    // focus the related edge when the use click the row of landing page edges table.
    let args = event.args;
    console.log("Node row selected", args.rowindex)
    var selectNodeIdx = this.nodeGridList.getcelltext(args.rowindex, 'id')
    this.cygraph.setCrtSelectNode(selectNodeIdx);
  }

  //-----------------------------------------------------------------------------
  selectNodeSubGRow(event: any): void {
    // When the user click the row in the node detail page subgraph, get the subgraph
    // name and filtered the node not belongs to the selected graph. 
    let args = event.args;
    let subgraphNamethis = this.subGridList.getcelltext(args.rowindex, 'name');
    //console.log('selectNodeSubGRow', subgraphNamethis);
    this.nodegraph.filterDisNodes(subgraphNamethis);
  }

  //-----------------------------------------------------------------------------
  setGraphEdgeColor(event: any): void {
    // change the landing page graph edges' color.
    this.edgesColor = event.target.value;
    this.cygraph.setEdgeColor(this.edgesColor);
  }

  //-----------------------------------------------------------------------------
  setGraphEdgeLable(event: any): void {
    // change the landing page graph edges' label.
    let selectedLb = event.target.value;
    this.cygraph.setEdgeLabelStr(selectedLb);
  }
  //-----------------------------------------------------------------------------
}
