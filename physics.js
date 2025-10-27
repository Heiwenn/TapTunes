/**
 * physics.js
 * 
 * Functions and classes used to model phsyics.
 */

/**
 * A mechanism used to detect collisions.
 * 
 * Separating Axis Theorem code is based off
 * https://www.sevenson.com.au/programming/sat/
 */
class Collider {

    constructor(positionVector, radius, width = null, height = null, rotation = null) {
        this.width = width;
        this.height = height;
        this.rotation = rotation;
        this.position = positionVector;
        if (radius == null) {
            this.shape = "RECTANGLE";
            this.radius = Math.sqrt((this.width / 2) ** 2 + (this.height / 2) ** 2);
        } else {
            this.shape = "CIRCLE";
            this.radius = radius;
        }
    }

    // Using a bounding circle, check if a collision might be happening
    // Much cheaper to do this first
    possiblyColliding(otherCollider) {
        if (this.position.dist(otherCollider.position) <= this.radius + otherCollider.radius) {
            return true;
        } else {
            return false;
        }
    }

    // Check for 100% accuracty if the objects are colliding
    isColliding(otherCollider) {
        if (this.shape == otherCollider.shape) {
            if (this.shape == "CIRCLE") {
                return (this.possiblyColliding(otherCollider));
            } else {
                return (this.checkCollisionBetweenRectangles(otherCollider));
            }
        } else {
            if (this.shape == "CIRCLE") {
                return otherCollider.checkCollisionRectangleWithCircle(this);
            } else {
                return this.checkCollisionRectangleWithCircle(otherCollider);
            }
        }
    }

    /**
     * https://www.sevenson.com.au/programming/sat/
     * Check if two possibly rotated rectangles are colliding
     */
    checkCollisionBetweenRectangles(otherCollider) {
        let myPoints = this.getPoints();
        let otherPoints = otherCollider.getPoints();

        let axes = this.getNormals(myPoints);
        axes.push(...this.getNormals(otherPoints));

        for (let axis of axes) {
            let { min: min1, max: max1 } = this.projectOnAxis(myPoints, axis);
            let { min: min2, max: max2 } = this.projectOnAxis(otherPoints, axis);
            if (this.checkGap(min1, max1, min2, max2)) {
                return false;
            }
        }
        return true;
    }

    // Is there a gap between the projection points
    checkGap(min1, max1, min2, max2) {
        if (min1 - max2 > 0 || min2 - max1 > 0) {
            return true;
        }
        return false;
    }

    // Get the normal vectors from a polygons points
    getNormals(points) {
        let axes = [];
        for (let i = 0; i < points.length; i++) {
            let j = (i + 1) % points.length;
            axes.push(this.getNormal(points[j], points[i]));
        }
        return axes;
    }

    // Get the normal vector of a set of points
    getNormal(a, b) {
        let edge = p5.Vector.sub(a, b);
        let normal = new p5.Vector(-edge.y, edge.x).normalize();
        return normal;
    }

    // Get the corner points from a rectangle given its rotation 
    // width, height, and position
    getPoints() {
        let hw = this.width / 2;
        let hh = this.height / 2;
        let corners = [
            new p5.Vector(-hw, -hh),
            new p5.Vector(hw, -hh),
            new p5.Vector(hw, hh),
            new p5.Vector(-hw, hh)
        ];

        return corners.map(pt => {
            return p5.Vector.add(this.position, pt.copy().rotate(this.rotation));
        });
    }

    // Project a set of points onto an axis and find the mins and maxes
    projectOnAxis(points, axis) {
        let min = axis.dot(points[0]);
        let max = min;
        for (let i = 1; i < points.length; i++) {
            let p = axis.dot(points[i]);
            if (p < min) min = p;
            if (p > max) max = p;
        }
        return { min, max };
    }

    // Find the closest point on a polygon to another point
    getClosestPointOnPolygon(points, circleCenter) {
        let closestPoint = null;
        let minDist = Infinity;

        for (let i = 0; i < points.length; i++) {
            let j = (i + 1) % points.length;
            let a = points[i];
            let b = points[j];

            // Vector projection of circleCenter onto edge ab
            let ab = p5.Vector.sub(b, a);
            let t = p5.Vector.sub(circleCenter, a).dot(ab) / ab.magSq();
            t = this.clamp(t, 0, 1); // clamp to edge
            let projection = p5.Vector.add(a, ab.mult(t));

            let d = projection.dist(circleCenter);
            if (d < minDist) {
                minDist = d;
                closestPoint = projection;
            }
        }

        return closestPoint;
    }

    // Clamps a value between two values
    clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    // Check if a rectangle is colliding with a circle
    checkCollisionRectangleWithCircle(otherCollider) {
        let myPoints = this.getPoints();
        let center = otherCollider.position;

        let axes = this.getNormals(myPoints);

        let closestPoint = this.getClosestPointOnPolygon(myPoints, center);
        if (closestPoint) {
            let axisToCircle = p5.Vector.sub(center, closestPoint).normalize();
            axes.push(axisToCircle);
        }

        for (let axis of axes) {
            let { min: min1, max: max1 } = this.projectOnAxis(myPoints, axis);
            let { min: min2, max: max2 } = this.projectCircleOnAxis(center, otherCollider.radius, axis);
            if (this.checkGap(min1, max1, min2, max2)) {
                return false;
            }
        }
        return true;
    }

    // Project a circle onto an axis and find the min a max
    projectCircleOnAxis(center, radius, axis) {
        let p = axis.dot(center);
        let min = p - radius;
        let max = p + radius;
        return { min, max };
    }

}

/**
 * An objects that an environments physics can act on.
 */
class PhysicsObject {
    constructor(positionVector) {
        this.position = positionVector;
        this.velocity = p5.Vector.mult(this.position, 0);
        this.acceleration = p5.Vector.mult(this.position, 0);
        this.dragCoefficient = 0;
        this.collidable = false;
        this.collider = null;
        this.objectType = "";
    }

    setVelocity(newVelocity) {
        this.velocity = newVelocity;
    }

    setAcceleration(newAcceleration) {
        this.acceleration = newAcceleration;
    }

    setDragCoefficient(newDragCoefficient) {
        this.dragCoefficient = newDragCoefficient;
    }

    setObjectType(newObjectType) {
        this.objectType = newObjectType;
    }

    onCollision(otherObject) {

    }
}

/**
 * QuadTree Implementation for faster collision detection
 * Can't decide if this will be worth implementing eventually.
 * Games seem to run fine rn but I am concerned as we add more and
 * more collidable objects to our games
 */
class QuadTree {

}

// Controls interaction between objects
class PhysicEngine {
    constructor() {
        this.objects = [];
    }

    // Add the object to the engine
    addObject(newObject) {
        this.objects.push(newObject);
    }

    /**
     * Check if any of the objects in the space are colliding
     */
    checkCollisions() {
        // Check collision on every object
        for (let i = 0; i < this.objects.length; i++) {
            for (let j = i + 1; j < this.objects.length; j++) {
                let a = this.objects[i];
                let b = this.objects[j];
                if (a.collidable && b.collidable &&
                    a.collider.possiblyColliding(b.collider) &&
                    a.collider.isColliding(b.collider)) {
                    //Inform objects of collision
                    a.onCollision(b);
                    b.onCollision(a);
                }
            }
        }
    }

    /**
     * Update every objects kinematic vectors
     */
    updateKinematics() {
        this.objects.forEach((object) => {
            object.velocity.add(object.acceleration);
            object.velocity.add(p5.Vector.mult(object.velocity, -object.dragCoefficient));
            object.position.add(object.velocity);
        });
    }


}

// Testing
// function main() {
//     let c1 = new Collider(new p5.Vector(422, 287), 70);
//     let c2 = new Collider(new p5.Vector(250, 250), null, 200, 150, 0.87);

//     console.log(c1.isColliding(c2));
//     console.log(c2.isColliding(c1));
// }

// main();