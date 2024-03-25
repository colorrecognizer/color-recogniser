import base64
import json
import numpy as np
from sklearn.cluster import KMeans
from colors import colors
from PIL import Image
from geometry import check_inside, Point
import io


def lambda_handler(event, context):
  payload = json.loads(event['body'])

  # Parse the JSON body from the event
  try:

    recogniser_request = payload['recogniserRequest']
    #   return {
    #       'statusCode': 400,
    #       'body': json.dumps({'error': 'Invalid input format. Expected an object.'})
    #   }

    image = payload['image'].split(",")[1]
    #   return {
    #       'statusCode': 400,
    #       'body': json.dumps({'error': 'Invalid input format. Expected an object.'})
    #   }

    image_bytes = base64.b64decode(image)

    image = Image.open(io.BytesIO(image_bytes))

    STEPS = 30
    minX = recogniser_request['minX']
    maxX = recogniser_request['maxX']
    minY = recogniser_request['minY']
    maxY = recogniser_request['maxY']
    selection_type = recogniser_request['selectionType']
    points = recogniser_request["points"]

    clrs = []

    for px in np.linspace(minX, maxX, STEPS):
      for py in np.linspace(minY, maxY, STEPS):
        is_inside = False

        if selection_type == 'RECTANGLE':
          is_inside = True
        elif selection_type == 'ELLIPSE':
          centerX, centerY = (minX + maxX) / 2, (minY + maxY) / 2
          mX, mY = (maxX - minX) / 2, (maxY - minY) / 2
          is_inside = ((px - centerX) ** 2) / (mX ** 2) + \
              ((py - centerY) ** 2) / (mY ** 2) <= 1
        elif selection_type == 'FREE':
          is_inside = check_inside(points, Point(px, py))

        if is_inside:
          try:
            clr = image.getpixel((px, py))
            red = clr[0]
            green = clr[1]
            blue = clr[2]
            isTransparent = clr[3] == 0

            if not isTransparent:
              clrs.append([red, green, blue])
          except:
            pass

    if len(clrs) == 0:
      return {
        'statusCode': 400,
        'body': json.dumps({'message': 'No color found in the selected area.'})
      }

    # Parse query string parameters for 'num-colors'
    n_clusters = recogniser_request['numColors']

    # Process the input data
    sample = np.array(clrs)
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
    response = {
      'colorCoverages': []
    }

    for coverage in result:
      color = {
        'red': coverage[0],
        'green': coverage[1],
        'blue': coverage[2],
        'hexValue': '#%02x%02x%02x' % (int(coverage[0]), int(coverage[1]), int(coverage[2]))
      }

      colorCoverage = {
        'color': color,
        'coveragePercentage': coverage[3]
      }

      matchedColor = min(colors, key=lambda x: np.linalg.norm(
          [x['red'] - color['red'], x['green'] - color['green'], x['blue'] - color['blue']]))

      color['name'] = matchedColor['name']
      response['colorCoverages'].append(colorCoverage)

    # Return the processed data as the response
    return {
      'statusCode': 200,
      "headers": {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET"
      },
      'body': json.dumps(response)
    }
  except Exception as e:
    return {
      'statusCode': 500,
      "headers": {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET"
      },
      'body': json.dumps({'error': str(e)})
    }
