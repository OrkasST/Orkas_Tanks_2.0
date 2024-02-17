import { GameObject } from "../objects/GameObject.js";

export class ObjectCreator {
  create(objectData = {}, textures = [], colisionBodyShape = 0) {
    return new GameObject(objectData);
  }
}
