import { Entity } from "../Entity.js";
import { Gravity } from "../properties/Gravity.js";
import { Physics } from "../properties/Physics.js";
import { Player } from "../properties/Player.js";
import { AlternatingMovement } from "../properties/AlternatingMovement.js";
import { Vector } from "./Vector.js";
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
                default:
                    break;
            }
        });
        return propertyList
    }
}