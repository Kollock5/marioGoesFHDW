import { Entity } from "../Entity.js"
import { Vector } from "../util/Vector.js"
import { EnergyDrinkLogic } from "../properties/EnergyDrinkLogic.js"

export function EnergyDrink(pos = new Vector(0, 0)) { return new Entity(pos, new Vector(32, 32), "../res/energy_drink.png", [new EnergyDrinkLogic()]) }