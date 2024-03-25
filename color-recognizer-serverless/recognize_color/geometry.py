class Line:
  def __init__(self, p1, p2):
    self.p1 = p1
    self.p2 = p2


class Point:
  def __init__(self, x, y):
    self.x = x
    self.y = y


def on_line(l1, p):
  return (p.x <= max(l1.p1.x, l1.p2.x) and p.x <= min(l1.p1.x, l1.p2.x) and
          p.y <= max(l1.p1.y, l1.p2.y) and p.y <= min(l1.p1.y, l1.p2.y))


def direction(a, b, c):
  val = (b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y)
  if val == 0:
    return 0  # Collinear
  elif val < 0:
    return 2  # Anti-clockwise direction
  else:
    return 1  # Clockwise direction


def is_intersect(l1, l2):
  dir1 = direction(l1.p1, l1.p2, l2.p1)
  dir2 = direction(l1.p1, l1.p2, l2.p2)
  dir3 = direction(l2.p1, l2.p2, l1.p1)
  dir4 = direction(l2.p1, l2.p2, l1.p2)

  if dir1 != dir2 and dir3 != dir4:
    return True  # When intersecting

  if dir1 == 0 and on_line(l1, l2.p1):
    return True  # When p2 of line2 are on the line1

  if dir2 == 0 and on_line(l1, l2.p2):
    return True  # When p1 of line2 are on the line1

  if dir3 == 0 and on_line(l2, l1.p1):
    return True  # When p2 of line1 are on the line2

  return dir4 == 0 and on_line(l2, l1.p2)  # When p1 of line1 are on the line2


def check_inside(poly, p):
  n = len(poly)
  if n < 3:
    return False  # When polygon has less than 3 edges, it is not a polygon

  pt = Point(9999, p.y)  # Create a point at infinity, y is same as point p
  exline = Line(p, pt)
  count = 0
  i = 0
  while True:
    # Forming a line from two consecutive points of poly
    side = Line(Point(poly[i]['x'], poly[i]['y']), Point(
      poly[(i + 1) % n]['x'], poly[(i + 1) % n]['y']))

    if is_intersect(side, exline):  # If side intersects exline
      if direction(side.p1, p, side.p2) == 0:
        return on_line(side, p)
      count += 1
    i = (i + 1) % n
    if i == 0:
      break

  return count % 2 == 1  # When count is odd

# Example usage:
# poly = [Point(0, 0), Point(0, 10), Point(10, 10), Point(10, 0)]
# p = Point(5, 5)
# print(check_inside(poly, p))
