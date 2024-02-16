export class CollisionBody {
  constructor(...bodies) {
    this.bodies = bodies;
    /*
    body example:
      {
        type: 0, -- rectangular body
        x1: 10, y1: 10, -- first point coordinates
        x2: 20, y2: 20, -- second (diagonal) point coordinates
      }
      {
        type: 1, -- circular body
        x: 10, y:10, -- circle center
        r: 5, -- circle radius
      }
    */
  }

  checkCollision(body) {
    console.log("body: ", body);
    //body object must have the same structure as this.bodies
    for (let i = 0; i < body.length; i++) {
      for (let j = 0; j < this.bodies.length; j++) {
        if (body[i].type === 0 && this.bodies[j].type === 0) {
          console.log("Rects");
          //debugger;
          if (
            body[i].x1 <= this.bodies[j].x2 &&
            body[i].x2 >= this.bodies[j].x1 &&
            body[i].y1 <= this.bodies[j].y2 &&
            body[i].y2 >= this.bodies[j].y1
          ) {
            //debugger;
            return true;
          } else continue; //bodies are rect type but no collision
        }

        if (body[i].type === 1 && this.bodies[j].type === 1) {
          //debugger;
          if (
            Math.sqrt(
              (body[i].x - this.bodies[j].x) * (body[i].x - this.bodies[j].x) +
                (body[i].y - this.bodies[j].y) * (body[i].y - this.bodies[j].y)
            ) <=
            body[i].r + this.bodies[j].r
          ) {
            //debugger;
            return true;
          } else continue; //bodies are circle type but no collision
        }

        if (body[i].type === 0 && this.bodies[j].type === 1) {
          //debugger;
          if (
            Math.sqrt(
              (body[i].x1 - this.bodies[j].x) *
                (body[i].x1 - this.bodies[j].x) +
                (body[i].y1 - this.bodies[j].y) *
                  (body[i].y1 - this.bodies[j].y)
            ) <= this.bodies[j].r || //checking if distance from all rectangle points to center of circle is smaller than radius
            Math.sqrt(
              (body[i].x1 - this.bodies[j].x) *
                (body[i].x1 - this.bodies[j].x) +
                (body[i].y2 - this.bodies[j].y) *
                  (body[i].y2 - this.bodies[j].y)
            ) <= this.bodies[j].r ||
            Math.sqrt(
              (body[i].x2 - this.bodies[j].x) *
                (body[i].x2 - this.bodies[j].x) +
                (body[i].y1 - this.bodies[j].y) *
                  (body[i].y1 - this.bodies[j].y)
            ) <= this.bodies[j].r ||
            Math.sqrt(
              (body[i].x2 - this.bodies[j].x) *
                (body[i].x2 - this.bodies[j].x) +
                (body[i].y2 - this.bodies[j].y) *
                  (body[i].y2 - this.bodies[j].y)
            ) <= this.bodies[j].r
          ) {
            //debugger;
            return true;
          } else continue; //colliding body is rect, this is circle no collision
        }

        if (body[i].type === 1 && this.bodies[j].type === 0) {
          //debugger;
          if (
            Math.sqrt(
              (this.bodies[j].x1 - body[i].x) *
                (this.bodies[j].x1 - body[i].x) +
                (this.bodies[j].y1 - body[i].y) *
                  (this.bodies[j].y1 - body[i].y)
            ) <= body[i].r || //checking if distance from all rectangle points to center of circle is smaller than radius
            Math.sqrt(
              (this.bodies[j].x1 - body[i].x) *
                (this.bodies[j].x1 - body[i].x) +
                (this.bodies[j].y2 - body[i].y) *
                  (this.bodies[j].y2 - body[i].y)
            ) <= body[i].r ||
            Math.sqrt(
              (this.bodies[j].x2 - body[i].x) *
                (this.bodies[j].x2 - body[i].x) +
                (this.bodies[j].y1 - body[i].y) *
                  (this.bodies[j].y1 - body[i].y)
            ) <= body[i].r ||
            Math.sqrt(
              (this.bodies[j].x2 - body[i].x) *
                (this.bodies[j].x2 - body[i].x) +
                (this.bodies[j].y2 - body[i].y) *
                  (this.bodies[j].y2 - body[i].y)
            ) <= body[i].r
          ) {
            //debugger;
            return true;
          } else continue; //colliding body is circle, this is rect no collision
        }
      }
    }
    return false;
  }

  extendedCollisionCheck(body) {
    console.log("body: ", body);
    //body object must have the same structure as this.bodies

    let collidingDirections = [0, 0, 0, 0];
    //[0]: 1 (left), 0 (none)
    //[1]: 1 (right), 0 (none)
    //[2]: 1 (up), 0 (none)
    //[3]: 1 (down), 0 (none)

    for (let i = 0; i < body.length; i++) {
      for (let j = 0; j < this.bodies.length; j++) {
        if (body[i].type === 0 && this.bodies[j].type === 0) {
          console.log("Rects");
          //debugger;
          if (
            this.bodies[j].x1 <= body[i].x2 &&
            this.bodies[j].x2 > body[i].x2 &&
            this.bodies[j].y2 > body[i].y1 &&
            this.bodies[j].y1 < body[i].y2
          ) {
            //debugger;
            collidingDirections[0] = 1; //left
          } else if (
            this.bodies[j].x2 >= body[i].x1 &&
            this.bodies[j].x1 < body[i].x1 &&
            this.bodies[j].y2 > body[i].y1 &&
            this.bodies[j].y1 < body[i].y2
          ) {
            //debugger;
            collidingDirections[1] = 1; //right
          } else if (
            this.bodies[j].y1 <= body[i].y2 &&
            this.bodies[j].y2 > body[i].y2 &&
            this.bodies[j].x2 > body[i].x1 &&
            this.bodies[j].x1 < body[i].x2
          ) {
            //debugger;
            collidingDirections[2] = 1; //up
          } else if (
            this.bodies[j].y2 >= body[i].y1 &&
            this.bodies[j].y1 < body[i].y1 &&
            this.bodies[j].x2 > body[i].x1 &&
            this.bodies[j].x1 < body[i].x2
          ) {
            //debugger;
            collidingDirections[3] = 1; //down
          } else continue; //bodies are rect type but no collision
        } else if (body[i].type === 1 && this.bodies[j].type === 1) {
          //debugger;
          if (
            Math.sqrt(
              (body[i].x - this.bodies[j].x) * (body[i].x - this.bodies[j].x) +
                (body[i].y - this.bodies[j].y) * (body[i].y - this.bodies[j].y)
            ) <=
            body[i].r + this.bodies[j].r
          ) {
            //debugger;
            if (this.bodies[j].y < body[i].y) collidingDirections[3] = 1; //down
            else if (this.bodies[j].y > body[i].y) collidingDirections[2] = 1; //up
            if (this.bodies[j].x < body[i].x)
              collidingDirections[1] = 1; //right
            else if (this.bodies[j].x < body[i].x) collidingDirections[0] = 1; //left
          } else continue; //bodies are circle type but no collision
        } else if (body[i].type === 0 && this.bodies[j].type === 1) {
          //debugger;
          if (
            Math.sqrt(
              (body[i].x1 - this.bodies[j].x) *
                (body[i].x1 - this.bodies[j].x) +
                (body[i].y1 - this.bodies[j].y) *
                  (body[i].y1 - this.bodies[j].y)
            ) <= this.bodies[j].r || //checking if distance from all rectangle points to center of circle is smaller than radius
            Math.sqrt(
              (body[i].x1 - this.bodies[j].x) *
                (body[i].x1 - this.bodies[j].x) +
                (body[i].y2 - this.bodies[j].y) *
                  (body[i].y2 - this.bodies[j].y)
            ) <= this.bodies[j].r ||
            Math.sqrt(
              (body[i].x2 - this.bodies[j].x) *
                (body[i].x2 - this.bodies[j].x) +
                (body[i].y1 - this.bodies[j].y) *
                  (body[i].y1 - this.bodies[j].y)
            ) <= this.bodies[j].r ||
            Math.sqrt(
              (body[i].x2 - this.bodies[j].x) *
                (body[i].x2 - this.bodies[j].x) +
                (body[i].y2 - this.bodies[j].y) *
                  (body[i].y2 - this.bodies[j].y)
            ) <= this.bodies[j].r
          ) {
            //debugger;
            if (
              this.bodies[j].x > body.x2 &&
              this.bodies[j].y + this.bodies[j].r > body.y1 &&
              this.bodies[j].y - this.bodies[j].r < body.y2
            )
              collidingDirections[0] = 1; //left
            else if (
              this.bodies[j].x < body.x1 &&
              this.bodies[j].y + this.bodies[j].r > body.y1 &&
              this.bodies[j].y - this.bodies[j].r < body.y2
            )
              collidingDirections[1] = 1; //right
            else if (
              this.bodies[j].y > body.y2 &&
              this.bodies[j].x + this.bodies[j].r > body.x1 &&
              this.bodies[j].x - this.bodies[j].r < body.x2
            )
              collidingDirections[2] = 1; //up
            else if (
              this.bodies[j].y < body.y1 &&
              this.bodies[j].x + this.bodies[j].r > body.x1 &&
              this.bodies[j].x - this.bodies[j].r < body.x2
            )
              collidingDirections[3] = 1; //down
          } else continue; //colliding body is rect, this is circle no collision
        } else if (body[i].type === 1 && this.bodies[j].type === 0) {
          //debugger;
          if (
            Math.sqrt(
              (this.bodies[j].x1 - body[i].x) *
                (this.bodies[j].x1 - body[i].x) +
                (this.bodies[j].y1 - body[i].y) *
                  (this.bodies[j].y1 - body[i].y)
            ) <= body[i].r || //checking if distance from all rectangle points to center of circle is smaller than radius
            Math.sqrt(
              (this.bodies[j].x1 - body[i].x) *
                (this.bodies[j].x1 - body[i].x) +
                (this.bodies[j].y2 - body[i].y) *
                  (this.bodies[j].y2 - body[i].y)
            ) <= body[i].r ||
            Math.sqrt(
              (this.bodies[j].x2 - body[i].x) *
                (this.bodies[j].x2 - body[i].x) +
                (this.bodies[j].y1 - body[i].y) *
                  (this.bodies[j].y1 - body[i].y)
            ) <= body[i].r ||
            Math.sqrt(
              (this.bodies[j].x2 - body[i].x) *
                (this.bodies[j].x2 - body[i].x) +
                (this.bodies[j].y2 - body[i].y) *
                  (this.bodies[j].y2 - body[i].y)
            ) <= body[i].r
          ) {
            //debugger;
            if (
              body.x > this.bodies[j].x2 &&
              body.y + body.r > this.bodies[j].y1 &&
              body.y - body.r < this.bodies[j].y2
            )
              collidingDirections[0] = 1; //left
            else if (
              body.x < this.bodies[j].x1 &&
              body.y + body.r > this.bodies[j].y1 &&
              body.y - body.r < this.bodies[j].y2
            )
              collidingDirections[1] = 1; //right
            else if (
              body.y > this.bodies[j].y2 &&
              body.x + body.r > this.bodies[j].x1 &&
              body.x - body.r < this.bodies[j].x2
            )
              collidingDirections[2] = 1; //up
            else if (
              body.y < this.bodies[j].y1 &&
              body.x + body.r > this.bodies[j].x1 &&
              body.x - body.r < this.bodies[j].x2
            )
              collidingDirections[3] = 1; //down
          } else continue; //colliding body is circle, this is rect no collision
        }
      }
    }
    return false;
  }
}
