import json
import random


def lambda_handler(event, context):
  try:
    started_with_zero = event['queryStringParameters']['startedWithZero']
    selected_digits = json.loads(event['body'])

    if len(selected_digits) == 2:
      length = random.randint(8, 9)
    elif selected_digits[0] == "8":
      length = 8
    else:
      length = 9

    tfn = ""
    while not validate_tfn(tfn):
      tfn = randomize_base_tfn(length, started_with_zero)

    return {
      'statusCode': 200,
      "headers": {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET"
      },
      'body': json.dumps([tfn])
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


def validate_tfn(tfn):
  if not tfn:
    return False

  if len(tfn) not in [8, 9]:
    return False

  checksum = 0
  if len(tfn) == 9:
    factors = [10, 7, 8, 4, 6, 3, 5, 2, 1]
  else:
    factors = [10, 7, 8, 4, 6, 3, 5, 1]

  for i in range(len(tfn)):
    checksum += int(tfn[i]) * factors[i]

  return checksum % 11 == 0


def randomize_base_tfn(length, started_with_zero):
  numeric_string = "0123456789"
  tfn = []

  for i in range(length):
    if i == 0:
      if started_with_zero:
        index = 0
      else:
        index = random.randint(1, len(numeric_string) - 1)
    else:
      index = random.randint(0, len(numeric_string) - 1)

    tfn.append(numeric_string[index])

  return ''.join(tfn)
