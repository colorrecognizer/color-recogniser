import json
from diff_match_patch import diff_match_patch


def lambda_handler(event, context):
  try:
    files = json.loads(event['body'])
    if files is None or len(files) != 2:
      return {
        'statusCode': 400,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET"
        },
        'body': json.dumps({'error': 'Invalid input format. Expected an array of two strings.'})
      }

    dmp = diff_match_patch()
    result = dmp.diff_main(files[0], files[1])
    dmp.diff_cleanupSemantic(result)

    return {
      'statusCode': 200,
      "headers": {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET"
      },
      'body': json.dumps(result)
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
