#### **Overall intention and working of the model for Graph Based SIEM Analysis**

The model as of now takes as input SIEM alerts for 3 log sources – Snort, Fortinet and Windows. It ingests the alerts for a configurable period of time (set at 1 month for now), and generates graphs based on them. These graphs represents collections of similar activities seen across the log types. We consider activities to be similar, if the are similar in terms of the signature which led to generation of alerts, as well as similarity in terms of the intensity of the events, duration of the events as well as whether the events target specific ports or were generated from similar ports or not. 

The intention of generating these graphs is to identify patterns of similar activity from very voluminous SIEM alerts. This can be helpful, as SIEM alerts can be very voluminous with thousands of alerts generated on a daily basis. In the data we have, we see Snort logs have 4000 to 16000 alerts generated on a daily basis. Due to these large volumes, it is difficult for analysts to identify patterns through manual analysis at the alerts level. By consolidating collections of similar activities within and across log types, we provide an easier tool for inference to the analysts. Further, the graphs are also sorted by a Severity Score calculated by the model. This Severity score gives the analyst an indication of the maliciousness of the events seen in each graph. 



#### SIEM Event Prioritization Use Case

Use case 1: Network devices and end point hosts generate large quantities of alerts independently. 

Use case 2: A system which takes as input alerts from multiple devices and generates as output a graph highlighting  “collection of events” within and across log types and assigns severity score to each graph, can help in event prioritization to analysts.

Motivating Example: For a start, we can consider network logs and host logs as the data sources. The information available in each of the logs consists of :

**Network logs** : Timestamp when alert was generated, device name, source and destination IP and ports, 
signature used for alert generation. Signature used for alert generation consists of multiple information such as type of malicious activity (eg. Trojan activity), malware family information (if available), MITRE ATT&CK mapping (if available), short explanation on possible type of malicious activity (for eg. ‘SLR Alert – Possible RuRat checking XML elements). 

**Host logs**: ComputerName (identified for the host), user id, group id, ip, port, type of event (eg. An account failed to log on)  -user name is correct but the password is wrong), object type (for ex. Logon type 3 – Network) etc. 
