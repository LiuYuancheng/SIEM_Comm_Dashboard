# put this file parallel with the 'sonic_data' foler
import os 
import glob
import json
result = {
    "SonicData": {}
}

caseFileList = [os.path.basename(x) for x in glob.glob("sonic_data/*.json")]
for filename in caseFileList:
    print(filename)
    #filename = filePath.split('\\')[-1]
    key = filename.split('.json')[0]
    result["SonicData"][key] = "./assets/data/siem-graph/sonic_data/" + filename

with open('fileList.json', 'w') as outfile:
    json.dump(result, outfile)
    
