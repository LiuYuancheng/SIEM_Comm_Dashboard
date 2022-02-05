# SIEM_Comm_Dashboard

**Program Design Purpose**: We want to create a SIEM(system information and event management) dashboard to visualize the network nodes communication situation based on the firewall & host-computer logs. The use can use the cytoscapte type Node-Edge graph to analysis and find the threat events of the network. 

[TOC]

### Introduction

This project will create a web-based SIEM(system information and event management) platform dashboard to visualize the network nodes communication scenario as a cystoscape type nodes-edges graph with different function page and panels. The intention of generating these graphs is to identify patterns of similar activity from very voluminous SIEM alerts.

The backend takes three kinds of alerts log sources as input – **Snort**, **Fortinet** and **Windows**. This can be helpful, as SIEM alerts can be very voluminous with thousands of alerts generated on a daily basis. In the data we have, we see Snort logs have 4000 to 16000 alerts generated on a daily basis. Due to these large volumes, it is difficult for analysts to identify patterns through manual analysis at the alerts level. By consolidating collections of similar activities within and across log types, we provide an easier tool for inference to the analysts. Further, the graphs are also sorted by a `Severity Score` calculated by the model. This Severity score gives the analyst an indication of the maliciousness of the events seen in each graph. 

The platform ingests the alerts for a configurable period of time (set at 1 month for now), and generates graphs based on them. These graphs represents collections of similar activities seen across the log types. We consider activities to be similar if they are similar in terms of the signature. The alert  similarity level is also generated based on the intensity of the events, duration of the events as well as whether the events target specific ports or were generated from similar ports or not. 



#### Dashboard Main UI View

The dashboard is under `Fusion` => `GRAPH SIEM DISPLAY` page with three main notebook tab: 

1. SIEM-Graph (case-subgraph display page) to show the data set subgraph information.  
2. Node detail display page to show the user focused node's own information and graph relationship. 
3. User guide page to show the use how to use the platform.

![](doc/img/siem.gif)



#### SIEM Prioritization Use Case

The event shown in the system information and event management platform follows two kinds of prioritization user cases: 

**Use case 1**: Network devices and end point hosts generate large quantities of alerts independently. 

- **Network logs** : Timestamp when alert was generated, device name, source and destination IP and ports, 
  signature used for alert generation. Signature used for alert generation consists of multiple information such as type of malicious activity (eg. Trojan activity), malware family information (if available), MITRE ATT&CK mapping (if available), short explanation on possible type of malicious activity (for eg. ‘SLR Alert – Possible RuRat checking XML elements). 

**Use case 2:** A system which takes as input alerts from multiple devices and generates as output a graph highlighting  “collection of events” within and across log types and assigns severity score to each graph, can help in event prioritization to analysts.

- **Host logs**: ComputerName (identified for the host), user id, group id, ip, port, type of event (eg. An account failed to log on)  -user name is correct but the password is wrong), object type (for ex. Logon type 3 – Network) etc. 

Motivating Example: For a start, we can consider network logs and host logs as the data sources. The information available in each of the logs consists of :



------

### Program/System Design

#### SIEM-Graph Page UI Design

The SIEM graph page contents two areas: graph display area on the left and information view + control area on the right.

**Web Page View:** 

![](doc/img/main_1.png)

The top left portion of the left panel gives high level information for each graph:

- **Title** : dataset name [subgraph ID]

- **Severity score :** Severity score of the graph calculated by the model. 
- **Num of events** : Total number of SIEM alerts consolidated by the model to build the graph. For example, in the screen shot above, graph G5 consolidates information seen in 336 individual alerts in the SIEM data. If the analyst did not have access to graph G5, they would have to infer this information by analyzing 336 alerts themselves. 
- **Num of components :** Each graph represents a certain type of activity seen across a log type for 1 month. For example, in G5 the graph consolidates suspicious DNS queries seen across Snort logs. Such activities can be seen across 1 collection of IP addresses or multiple collections. The Num of Components tells the analyst the spread of such activity about how many collections of IP addresses are experiencing this activity.
- **Max in degree centrality** : Which node (IP address / Computer Name) has the maximum number of incoming edges? If the value is high ( near 1 or higher than 1), that implies most of the edges are targeted to a specific node. If the value is less, it implies the targets are a range of IP values. 
- **Max out degree centrality** : Similar to Max in degree centrality, tells if the source for most edges is 1 or 2 IP values, or its spread across various values. 
- **Consequences** : Possible types of consequences which may result based on the signature and other activity patterns seen in the graph. 

The Graph will shown in the mid of the page. 

- **Node/Edges detail**: When the use left click the node/Edge, the node/edge's detail info will show at the left bottom corner. 

The right side control area: 

- **Data set selection**: user can select the graph dataset from the drop down menu and click the graph in the table to show them on the graph display area. (A filter function was also provide)
- **'Graph Node' sub tab**: A table list all the nodes (detail information) in the current displayed dashboard. 
- **'Graph Edge' sub tab**: A table list all the edge (detail information) in the current displayed dashboard. 
- **'Graph Config' sub tab**: Config the graph display style and provide a node and edge filter function. 



#### Node Detail Display Page Design

When the user right click a node in  the SIEM-Graph Page, a round selection menu will show if the user select "Show detail", the page will auto switch to the node detail tab. The Node detail page is similar with the graph page, the selected node and its related "neighbors" will be organized in a new "graph" and show in the graph area. The neighbors' information, edges to the neighbors and the parent subgraph will show in different tables.

**Web Page View:**

![](doc/img/main_2.png)

Selecting a particular edge from the Graph Edges section highlights the edge in the graph visualization as well. Each edge has the following information: 

- **Signature** : Which signatures have been seen in the alerts consolidated in the edge. 
- **NumOfEvents** : How many alerts from the SIEM logs have been consolidated to form the edge. 
- **Start_timestamp** : Earliest timestamp at which the alerts were seen. 
- **Dispersion** : Intensity of alerts – were the alerts generated in a burst of activity, or were periodic in nature. Value closer to 1 indicates high intensity. 
- **Span** : Duration for which alerts were seen through the month (for ex. 2.49d - ~2.5 days). 
- **S_port_values** and T_port_values : Source and Target ports seen in the alerts. 
- **Gini_s_port** and **Gini_t_port** : Wherever large number of ports are seen, were the ports randomly chosen, or concentrated in a few port values. Value closer to 0 indicates the ports were randomly chosen. 



#### User Guide Page Design

This page will give a general introduction about the research and show the user how to use the dashboard with `F&Q` section:

 **Web Page View:**

![](doc/img/main_3.png)





------

### Program Setup

###### Development env: Angular 14.0 (Typescript)

###### Additional Lib need: 

```

  "dependencies": {
    "@angular/animations": "^12.0.5",
    "@angular/cdk": "^12.0.5",
    "@angular/cli": "^12.0.5",
    "@angular/common": "~12.0.5",
    "@angular/compiler": "~12.0.5",
    "@angular/core": "^12.0.5",
    "@angular/flex-layout": "^12.0.0-beta.34",
    "@angular/forms": "~12.0.5",
    "@angular/http": "^7.2.16",
    "@angular/material": "^12.0.5",
    "@angular/platform-browser": "~12.0.5",
    "@angular/platform-browser-dynamic": "~12.0.5",
    "@angular/router": "~12.0.5",
    "@apollo/client": "^3.3.20",
    "@asymmetrik/ngx-leaflet": "^8.1.0",
    "@asymmetrik/ngx-leaflet-markercluster": "^5.0.1",
    "@egjs/hammerjs": "^2.0.17",
    "@swimlane/ngx-charts": "^18.0.1",
    "@swimlane/ngx-graph": "^7.2.0",
    "@types/cytoscape": "^3.14.15",
    "@types/leaflet.markercluster": "^1.4.4",
    "@types/lodash": "^4.14.170",
    "angular-datatables": "^12.0.0",
    "angular-draggable-droppable": "^4.6.0",
    "apollo-angular": "^2.6.0",
    "arangojs": "^5.8.0",
    "crypto-js": "^4.0.0",
    "cytoscape": "^3.19.0",
    "cytoscape-cola": "^2.4.0",
    "cytoscape-cose-bilkent": "^4.1.0",
    "cytoscape-cxtmenu": "^3.4.0",
    "cytoscape-dagre": "^2.3.2",
    "cytoscape-elk": "^2.0.2",
    "cytoscape-elk-saul": "^1.1.12",
    "cytoscape-fcose": "^1.2.3",
    "cytoscape-klay": "^3.1.4",
    "cytoscape-node-html-label": "^1.2.2",
    "cytoscape-popper": "^2.0.0",
    "d3": "^6.7.0",
    "d3-force-limit": "^1.1.7",
    "d3-sankey": "^0.12.3",
    "datatables.net": "^1.10.25",
    "datatables.net-dt": "^1.10.25",
    "druid-query-toolkit": "^0.11.13",
    "faker": "^5.5.3",
    "get-all-files": "^4.1.0",
    "glob": "^7.2.0",
    "graphql": "^15.5.1",
    "highcharts": "^9.1.2",
    "highcharts-angular": "^2.10.0",
    "highcharts-more": "^0.1.7",
    "jquery": "^3.6.0",
    "jqwidgets-ng": "^10.1.6",
    "keycharm": "^0.4.0",
    "leaflet": "^1.7.1",
    "leaflet-ant-path": "^1.3.0",
    "leaflet-extra-markers": "^1.2.1",
    "leaflet.marker.highlight": "0.0.3",
    "leaflet.markercluster": "^1.5.0",
    "leaflet.markercluster.freezable": "^1.0.0",
    "leaflet.zoomhome": "^1.0.0",
    "lodash": "^4.17.21",
    "moment": "^2.29.1",
    "ngx-charts": "^3.0.2",
    "ngx-markdown": "^12.0.1",
    "ngx-rend-timeline": "^1.0.3",
    "ngx-tippy-wrapper": "^2.1.0",
    "node-sql-parser": "^3.6.9",
    "path": "^0.12.7",
    "pixi-viewport": "^4.31.0",
    "pixi.js": "^5.3.10",
    "primeflex": "^2.0.0",
    "primeicons": "^4.1.0",
    "primeng": "^12.0.0",
    "rxjs": "~6.5.4",
    "three": "^0.130.1",
    "tippy.js": "^6.3.1",
    "tslib": "^1.14.1",
    "vis-data": "^7.1.2",
    "vis-network": "^9.0.4",
    "vis-util": "^5.0.2",
    "zone.js": "~0.10.2"
  },
  "devDependencies": {
    "3d-force-graph": "^1.70.5",
    "@angular-devkit/build-angular": "^0.901.15",
    "@angular/compiler-cli": "~12.0.5",
    "@types/datatables.net": "^1.10.19",
    "@types/jasmine": "~3.5.0",
    "@types/jasminewd2": "^2.0.9",
    "@types/jquery": "^3.5.5",
    "@types/leaflet": "^1.7.3",
    "@types/node": "^12.20.15",
    "codelyzer": "^5.1.2",
    "jasmine-core": "~3.5.0",
    "jasmine-spec-reporter": "~4.2.1",
    "karma": "~5.0.0",
    "karma-chrome-launcher": "~3.1.0",
    "karma-coverage-istanbul-reporter": "~2.1.0",
    "karma-jasmine": "~3.0.1",
    "karma-jasmine-html-reporter": "^1.6.0",
    "protractor": "~5.4.3",
    "ts-node": "~8.3.0",
    "tslint": "~6.1.0",
    "typescript": "~4.2.4"
  },
}
```

###### Hardware need: N.A

###### Program Files List 

| Program file/folder   | Execution Env | Description                                   |
| --------------------- | ------------- | --------------------------------------------- |
| src/*                 | Typescript    | Main dashboard host program.                  |
| src/nodedetail/*      | Typescript    | Node detail page components.                  |
| src/data/*            | Typescript    | All the test-case data files.                 |
| src/cytoscape/*       | Typescript    | Customized cytoscape graph module components. |
| siem-graph/*          | json          | All the data files used for demo.             |
| images.zip            |               | All image/icon files used by the web.         |
| app-routing.module.ts |               | The routing module.                           |

`version: v_0.2`



------

### Program Usage/Execution

#### Copy file to the position 

- copy `src` folder to your `Project<fusion-cloudy>\src\app\pages` folder. 
- copy `siem-graph` folder to your `Project<fusion-cloudy>\src\assets\data` folder. 
- unzip `images.zip` and copy `images` folder to your `Project<fusion-cloudy>\src\assets` folder. 
- Import the `graph-siem-component` in your project 's routing module as shown in the `app-routing.module.ts`.

#### View the webpage 

###### Program execution cmd: 

```
npm run dev
```

###### View the webpage

After the compile process in the previous steps finished open the browser and type in the url: http://localhost:4200/



------

### Problem and Solution

###### Problem[1] **:** Can check the web page from localhost but can not view by use the IP address

**OS Platform** : Windows/Linux

**Error Message**: N.A 

On host machine the user can access with the url http://localhost:4200/ , when connect the host computer to network other computer can not access the url with the ulr http://ip:4200/

**Type**: Config issue.

**Solution**:

You can use the following command to access with your ip.

```js
ng serve --host 0.0.0.0 --disable-host-check
```

If you are using npm and want to avoid running the command every time, we can add the following line to the **package.json** file in the **scripts** section.

```js
"scripts": {
    ...
    "start": "ng serve --host 0.0.0.0 --disable-host-check"
    ...
}
```

Then you can run you app using the below command to be accessed from the other system in the same network.

```js
npm start
```



------

### Reference

1. Flex layout exmaple: https://livebook.manning.com/book/angular-development-with-typescript-second-edition/chapter-7/39

2. Html display if-else example: https://malcoded.com/posts/angular-ngif-else/

3. cytocapte.Js API: https://js.cytoscape.org/#ele.isEdge

4. Call parent function from child angular: https://stackblitz.com/edit/calling-parent-function-from-child-component?file=src%2Fapp%2Fparent-component%2Fparent-component.component.html

5. How to pass value in parent function: `<app-cytoscape #cygraph (parentFun)="parentFun($event)"></app-cytoscape>`

6. Config color set from online: https://coolors.co/palettes/trending

7. Node selector setup: https://dash.plotly.com/cytoscape/styling

8. Dev Tips: jxgrid need to be init after sidebar or dialog box to display the table instead of separate tab. https://www.primefaces.org/primeng/showcase/#/sidebar

9. Text icon generator: https://cooltext.com/Logo-Design-Simple

```
http header:
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZjMzOWRhZWUyZTBiMTU5MTMxYmRkMiIsImlhdCI6MTYzMzQwNTE1NCwiZXhwIjoxNjM1OTk3MTU0fQ.5orXZv_jKBavM3Nyf1zhehVMofu0IqMxFwmQu4qrXNc"
}
```



------

> Last edit by LiuYuancheng(liu_yuan_cheng@hotmail.com) at 31/01/2022

