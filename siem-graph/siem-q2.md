#### **Q2. How to view a particular graph in the dataset?**

Once the user selects a log source and time period from the dropdown as shown in Q1, the list of subgraphs are shown below. For example, if the user selects Snort Subgraphs : sep_2019, the list of graphs generated for Snort alerts for September 2019 would be shown as below: 

![](./assets/data/siem-graph/siem-q2_1.png)

The list provides a graph ID (eg. G5), Severity score of the graph (eg. 7.42) and list of possible consequences identified based on the types of signatures seen in the graph (eg. Execute Unauthorized commands, Read Data etc). 

The left panel of the UI shows the graph and related information:

![](./assets/data/siem-graph/siem-q2_2.png)

The top left portion of the left panel gives high level information for each graph:

- **Title** : dataset name [subgraph ID]

- **Severity score :** Severity score of the graph calculated by the model. 
- **Num of events** : Total number of SIEM alerts consolidated by the model to build the graph. For example, in the screen shot above, graph G5 consolidates information seen in 336 individual alerts in the SIEM data. If the analyst did not have access to graph G5, they would have to infer this information by analyzing 336 alerts themselves. 
- **Num of components :** Each graph represents a certain type of activity seen across a log type for 1 month. For example, in G5 the graph consolidates suspicious DNS queries seen across Snort logs. Such activities can be seen across 1 collection of IP addresses or multiple collections. The Num of Components tells the analyst the spread of such activity about how many collections of IP addresses are experiencing this activity.
- **Max in degree centrality** : Which node (IP address / Computer Name) has the maximum number of incoming edges? If the value is high ( near 1 or higher than 1), that implies most of the edges are targeted to a specific node. If the value is less, it implies the targets are a range of IP values. 
- **Max out degree centrality** : Similar to Max in degree centrality, tells if the source for most edges is 1 or 2 IP values, or its spread across various values. 
- **Consequences** : Possible types of consequences which may result based on the signature and other activity patterns seen in the graph. 

