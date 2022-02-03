#### **Q3 How to view graph details?**

Details on the graph edges can be viewed in the right side panel under Graph Edges:

![](./assets/data/siem-graph/siem-q3_1.png)

Selecting a particular edge from the Graph Edges section highlights the edge in the graph visualization as well. Each edge has the following information: 

![](./assets/data/siem-graph/siem-q3_2.png)

- **Signature** : Which signatures have been seen in the alerts consolidated in the edge. 
- **NumOfEvents** : How many alerts from the SIEM logs have been consolidated to form the edge. 
- **Start_timestamp** : Earliest timestamp at which the alerts were seen. 
- **Dispersion** : Intensity of alerts – were the alerts generated in a burst of activity, or were periodic in nature. Value closer to 1 indicates high intensity. 
- **Span** : Duration for which alerts were seen through the month (for ex. 2.49d - ~2.5 days). 
- **S_port_values** and T_port_values : Source and Target ports seen in the alerts. 
- **Gini_s_port** and **Gini_t_port** : Wherever large number of ports are seen, were the ports randomly chosen, or concentrated in a few port values. Value closer to 0 indicates the ports were randomly chosen. 

