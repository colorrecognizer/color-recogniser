import json
import numpy as np
from sklearn.cluster import KMeans

# import requests


def lambda_handler(event, context):
    # Parse the JSON body from the event
    try:
        body = json.loads(event.get('body', ''))
        if not body or not isinstance(body, list):
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'Invalid input format. Expected an array of objects.'})
            }

        # Parse query string parameters for 'num-colors'
        n_clusters = int(event['queryStringParameters'].get("num-colors", 2))

        # Process the input data
        sample = np.array(
            [[color["red"], color["green"], color["blue"]] for color in body])
        kmeans = KMeans(n_clusters=n_clusters, random_state=0).fit(sample)
        centroid = kmeans.cluster_centers_
        labels = list(kmeans.labels_)
        percent = []
        for i in range(len(centroid)):
            j = labels.count(i)
            j /= len(labels)
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
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': json.dumps(result)
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
