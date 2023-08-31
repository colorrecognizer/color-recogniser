from sklearn.cluster import KMeans
import numpy as np
from . import colorRecognizer_bp
from flask import jsonify, request

#this is your array with the values
# X = np.array([[1, 2, 1], [1, 4, 4], [1, 0, 5],
#                [4, 2, 1], [4, 4, 2], [4, 0, 1]])


# #This function creates the classifier
# #n_clusters is the number of clusters you want to use to classify your data
# kmeans = KMeans(n_clusters=2, random_state=0).fit(X)

# #you can see the labels with:
# print(kmeans.labels_)

@colorRecognizer_bp.route('/recognize', methods=['POST'])
def recognize():
    data = request.get_json()  # Get the JSON data from the request

    if not data or not isinstance(data, list):
        return jsonify({'error': 'Invalid input format. Expected an array of objects.'}), 400

    n_clusters = int(request.args.get("num-colors"))

    # Process the input data (optional)
    sample = np.array([[color["red"], color["green"], color["blue"]] for color in data])
    kmeans = KMeans(n_clusters=n_clusters, random_state=0).fit(sample)
    centroid=kmeans.cluster_centers_
    labels=list(kmeans.labels_)
    percent=[]
    for i in range(len(centroid)):
        j=labels.count(i)
        j=j/(len(labels))
        c = [round(num, 0) for num in list(centroid[i])]
        c.append(j)
        percent.append(c)
    
    merged_data = {}

    for item in percent:
        key = tuple(item[:3])
        value = item[-1]
        if key in merged_data:
            merged_data[key] += value
        else:
            merged_data[key] = value

    result = [[*key, value] for key, value in merged_data.items()]

    # Return the processed data as the response
    return jsonify(result), 200