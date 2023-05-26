package com.longcode.colorRecogniser.utils;

import com.longcode.colorRecogniser.models.shallowModels.Line;
import com.longcode.colorRecogniser.models.shallowModels.Point;

import java.util.List;

public class GeometryUtils {
    static boolean onLine(Line l1, Point p) {
        // Check whether p is on the line or not
        return p.getX() <= Math.max(l1.getP1().getX(), l1.getP2().getX())
                && p.getX() <= Math.min(l1.getP1().getX(), l1.getP2().getX())
                && (p.getY() <= Math.max(l1.getP1().getY(), l1.getP2().getY())
                && p.getY() <= Math.min(l1.getP1().getY(), l1.getP2().getY()));
    }

    private static int direction(Point a, Point b, Point c) {
        double val = (b.getY() - a.getY()) * (c.getX() - b.getX())
                - (b.getX() - a.getX()) * (c.getY() - b.getY());

        if (val == 0)
            // Collinear
            return 0;

        else if (val < 0)
            // Anti-clockwise direction
            return 2;

        // Clockwise direction
        return 1;
    }

    private static boolean isIntersect(Line l1, Line l2) {
        // Four direction for two lines and points of other
        // line
        int dir1 = direction(l1.getP1(), l1.getP2(), l2.getP1());
        int dir2 = direction(l1.getP1(), l1.getP2(), l2.getP2());
        int dir3 = direction(l2.getP1(), l2.getP2(), l1.getP1());
        int dir4 = direction(l2.getP1(), l2.getP2(), l1.getP2());

        // When intersecting
        if (dir1 != dir2 && dir3 != dir4)
            return true;

        // When p2 of line2 are on the line1
        if (dir1 == 0 && onLine(l1, l2.getP1()))
            return true;

        // When p1 of line2 are on the line1
        if (dir2 == 0 && onLine(l1, l2.getP2()))
            return true;

        // When p2 of line1 are on the line2
        if (dir3 == 0 && onLine(l2, l1.getP1()))
            return true;

        // When p1 of line1 are on the line2
        return dir4 == 0 && onLine(l2, l1.getP2());
    }

    public static boolean checkInside(List<Point> poly, Point p) {

        // When polygon has less than 3 edge, it is not
        // polygon

        int n = poly.size();
        if (n < 3)
            return false;

        // Create a point at infinity, y is same as point p
        Point pt = new Point(9999, p.getY());
        Line exline = new Line(p, pt);
        int count = 0;
        int i = 0;
        do {

            // Forming a line from two consecutive points of
            // poly
            Line side
                    = new Line(poly.get(i), poly.get((i + 1) % n));
            if (isIntersect(side, exline)) {

                // If side is intersects exline
                if (direction(side.getP1(), p, side.getP2()) == 0)
                    return onLine(side, p);

                count++;
            }
            i = (i + 1) % n;
        } while (i != 0);

        // When count is odd
        return count % 2 == 1;
    }
}
