import { Entity } from "../Entity.js"
import { Vector } from "../util/Vector.js"
import { CoinLogic } from "../properties/CoinLogic.js"
import { BackgroundItem } from "../properties/BackgroundItem.js"

export function Coin(pos = new Vector(0, 0)) { return new Entity(pos, new Vector(32, 32), "../res/coin.png", [new CoinLogic()]) }