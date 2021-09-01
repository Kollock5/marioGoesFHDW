import { Entity } from "../Entity.js";
import { Gravity } from "../properties/Gravity.js";
import { Physics } from "../properties/Physics.js";
import { Player } from "../properties/Player.js";
import { AlternatingMovement } from "../properties/AlternatingMovement.js";
import { Vector } from "./Vector.js";
import { Camera } from "../properties/Camera.js";
import { Goal } from "../properties/Goal.js";
import { MovementAnimation } from "../properties/MovementAnimation.js";
import { SlimeAi } from "../properties/SlimeAi.js";
import { TurtleAi } from "../properties/TurtleAi.js";
import { CanonAi } from "../properties/CanonAi.js";
import { MonkeyAi } from "../properties/MonkeyAi.js";

export var jsonConverter = {
    toJson: function(entities) {
        let json = `{ "entities": [ `
        entities.forEach(function(entity, i, arr) {
            json = json + entity.toJson()
            if (i < arr.length - 1) {
                json = json + `, `
            } else {
                json = json + ` `
            }
        });
        json = json + `] }`
        return json
    },

    fromJson: function(json) {
        let data = JSON.parse(json)
        let entities = []
        data.entities.forEach(entity => {
            entities.push(new Entity(
                this.newVector(entity.pos),
                this.newVector(entity.size),
                entity.imgSrc,
                this.getProperties(entity.properties),
                this.newVector(entity.velocity),
                this.newVector(entity.acceleration),
                entity.movable
            ))
        });
        return entities
    },

    newVector(vec) {
        return new Vector(vec.x, vec.y)
    },

    getProperties: function(properties) {
        let propertyList = []
        properties.forEach(property => {
            switch (property.type) {
                case "Gravity":
                    propertyList.push(new Gravity)
                    break;
                case "Physics":
                    propertyList.push(new Physics)
                    break;
                case "Player":
                    propertyList.push(new Player)
                    break;
                case "AlternatingMovement":
                    propertyList.push(new AlternatingMovement)
                    break;
                case "Camera":
                    propertyList.push(new Camera)
                    break;
                case "Goal":
                    propertyList.push(new Goal)
                    break;
                case "MovementAnimation":
                    propertyList.push(new MovementAnimation)
                    break;
                case "SlimeAi":
                    propertyList.push(new SlimeAi)
                    break;
                case "TurtleAi":
                    propertyList.push(new TurtleAi)
                    break;
                case "CanonAi":
                    propertyList.push(new CanonAi)
                    break;
                case "MonkeyAi":
                    propertyList.push(new MonkeyAi)
                    break;
                default:
                    break;
            }
        });
        return propertyList
    }
}