export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class Line {
  //Point p1, p2;
  p1: Point;
  p2: Point;

  constructor(p1: Point, p2: Point) {
    this.p1 = p1;
    this.p2 = p2;
  }
}

function onLine(l: Line, p: Point) {
  // Check whether p is on the line or not
  if (
    p.x <= Math.max(l.p1.x, l.p2.x) &&
    p.x <= Math.min(l.p1.x, l.p2.x) &&
    p.y <= Math.max(l.p1.y, l.p2.y) &&
    p.y <= Math.min(l.p1.y, l.p2.y)
  )
    return true;

  return false;
}

function direction(a: Point, b: Point, c: Point) {
  const val = (b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y);

  if (val == 0)
    // Collinear
    return 0;
  else if (val < 0)
    // Anti-clockwise direction
    return 2;

  // Clockwise direction
  return 1;
}

function isIntersect(l1: Line, l2: Line) {
  // Four direction for two lines and points of other line
  const dir1 = direction(l1.p1, l1.p2, l2.p1);
  const dir2 = direction(l1.p1, l1.p2, l2.p2);
  const dir3 = direction(l2.p1, l2.p2, l1.p1);
  const dir4 = direction(l2.p1, l2.p2, l1.p2);

  // When intersecting
  if (dir1 != dir2 && dir3 != dir4) return true;

  // When p2 of line2 are on the line1
  if (dir1 == 0 && onLine(l1, l2.p1)) return true;

  // When p1 of line2 are on the line1
  if (dir2 == 0 && onLine(l1, l2.p2)) return true;

  // When p2 of line1 are on the line2
  if (dir3 == 0 && onLine(l2, l1.p1)) return true;

  // When p1 of line1 are on the line2
  if (dir4 == 0 && onLine(l2, l1.p2)) return true;

  return false;
}

export function checkInside(poly: Point[], p: Point) {
  // When polygon has less than 3 edge, it is not polygon
  const n = poly.length;
  if (n < 3) return false;

  // Create a point at infinity, y is same as point p
  const tmp = new Point(9999, p.y);
  const exline = new Line(p, tmp);
  let count = 0;
  let i = 0;
  do {
    // Forming a line from two consecutive points of
    // poly
    const side = new Line(poly[i], poly[(i + 1) % n]);
    if (isIntersect(side, exline)) {
      // If side is intersects exline
      if (direction(side.p1, p, side.p2) == 0) return onLine(side, p);
      count++;
    }
    i = (i + 1) % n;
  } while (i != 0);

  // When count is odd
  return count & 1;
}

// function to find if given point
// lies inside a given rectangle or not.
export function checkInsideRectangle(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x: number,
  y: number
) {
  if (x > x1 && x < x2 && y > y1 && y < y2) return true;

  return false;
}

// Driver code
// const polygon = [
//   new Point(0, 0),
//   new Point(10, 0),
//   new Point(10, 10),
//   new Point(0, 10),
// ];
// const p = new Point(5, 3);
// const n = 4;

// // Function call
// if (checkInside(polygon, n, p)) console.log("Point is inside.");
// else console.log("Point is outside.");

// This code is contributed by poojaagarwal2.
