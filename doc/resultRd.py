import pickle
import networkx as nx
import matplotlib.pyplot as plt
import json

def visualize(Graph,pathname,layout):
    if layout == 'random':
        pos = nx.random_layout(Graph,seed =45)
    elif layout == 'kamada':
        pos = nx.kamada_kawai_layout(Graph)
    plt.figure(figsize=(15,15))
    try:
        nx.draw_networkx_labels(Graph,pos)
    except:
        pass
    
    ax = plt.gca()
    for e in Graph.edges:
        ax.annotate('',
                    xy=pos[e[0]],
                    xytext=pos[e[1]],
                    arrowprops=dict(arrowstyle="->", color="0.5",
                                    shrinkA=5, shrinkB=5,
                                    patchA=None, patchB=None,
                                    connectionstyle="arc3,rad=rrr".replace('rrr',str(0.05*e[2])
                                    ),
                                    ),
                    )

    try:
        nx.draw(Graph, pos, node_color = 'r', node_size = 100, alpha = 1,with_labels=True)
    except:
        pass
    
    plt.show()
    if pathname != '':
        plt.savefig(pathname+'_'+layout+'.png')

with open('result_sep_2019_Hongwei.pickle', 'rb') as handle:
    subgraph_collection = pickle.load(handle)
snort_lst = subgraph_collection.get('snort')
windows_lst = subgraph_collection.get('windows')
fortinet_lst = subgraph_collection.get('fortinet')

subgraph_df = nx.to_pandas_edgelist(snort_lst[2])

#print(subgraph_df)
#print(subgraph_df.keys())
#print(subgraph_df.get('source'))

# create a json file from a graph 

fcount = 0 
for item in fortinet_lst:
    subgraph_df = nx.to_pandas_edgelist(item)
    dictI = []
    firstFg = 1
    for item in subgraph_df:
        data = subgraph_df.get(str(item))
        print(str(item))
        count = 0
        for i in data:
            if firstFg:
                dictI.append({})
            dictI[count][str(item)] = i
            count += 1
        firstFg = 0 
            
    print(dictI)
    fcount+=1
    with open('data_%d.json' %fcount, 'w') as f:
        json.dump(dictI, f)


exit()

#visualize(windows_lst, '', 'random')

 
for item in fortinet_lst:
    subgraph_df = nx.to_pandas_edgelist(item)
    pos = nx.random_layout(subgraph_df)
    #nx.draw(subgraph_df)
   #for node in subgraph_df.source:
   #     print(node)
    print(subgraph_df)



    nx.draw_networkx_nodes(subgraph_df, pos, node_color = 'r', node_size = 50, alpha = 1)
    #nx.draw_networkx(subgraph_df, pos)
    try: 
        nx.draw_networkx_edges(subgraph_df, pos)
        nx.draw_networkx_labels(subgraph_df, pos)
    except:
        print("exception in the networkx draw_xx")
        continue
    #nx.draw_networkx_labels(subgraph_df, pos)
    #nx.draw_networkx_edge_labels(subgraph_df, pos)
    #nx.draw_networkx(snort_lst, pos=None, arrows=True, with_labels=True)

plt.axis('off')
plt.show()

