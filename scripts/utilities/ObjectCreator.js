import { GameObject } from "../objects/GameObject.js";
import { CollisionBody } from "../physics/CollisionBody.js";
import { Animation } from "./Animation.js";

export class ObjectCreator {
  create(
    objectData = {},
    textures = [],
    colisionBodyShape = 0,
    imageWidth,
    imageHeight,
    imagesCount,
    animationData = [
      {
        framelist: "",
        frameListHeight,
        frameListWidth,
        frameWidth,
        frameHeight,
        duration,
        frameX,
        frameY,
        startFrame: 0,
        isRotating: false,
        isInfinit: true,
      },
    ]
  ) {
    let object = new GameObject(objectData);
    let images = [];
    for (let i = 0; i < imagesCount; i++) {
      images[i] = {};
      images[i].image = document.createElement("canvas");
      images[i].image.width = imageWidth || object.data.width;
      images[i].image.height = imageHeight || object.data.height;
      images[i].context = images[i].image.getContext("2d");
    }
    textures = textures.map(
      (el, i) =>
        new Animation({
          ...animationData[i],
          framelist: el,
        })
    );
    object.setImage(images, textures);
    if (object.isCollidable)
      object.collider = new CollisionBody(
        colisionBodyShape || {
          type: 0,
          x1: object.x,
          y1: object.y,
          x2: object.x + object.width,
          y2: object.y + object.height,
        }
      );
    return object;
  }
}
