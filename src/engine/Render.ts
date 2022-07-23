import {Engine} from "./Engine.";

export const renderMoney = () => {
	Engine.getCanvasContext().fillStyle = "yellow";
	Engine.getCanvasContext().font = "25px Arial";
	Engine.getCanvasContext().fillText(`${Engine.getMoney()}`, 900, 60);
}

export const renderLevel = () => {
	Engine.getCanvasContext().fillStyle = "blue";
	Engine.getCanvasContext().font = "25px Arial";
	Engine.getCanvasContext().fillText("Level: " + Engine.getLvlSystem().currentLVL, 800, 120);
	Engine.getCanvasContext().fillStyle = "yellow";
}

/**
 * @description Draw a rectangle
 * @param {*} leftX the start point on x
 * @param {*} topY the start point on y
 * @param {*} width width of rectangle
 * @param {*} height height of rectangle
 * @param {*} drawColor the color of the rectangle
 */
export const colorRect = (leftX:number, topY:number, width: number, height:number, drawColor: any) => {
	Engine.getCanvasContext().fillStyle = drawColor;
	Engine.getCanvasContext().fillRect(leftX, topY, width, height);
}


/**
 * @description Draw circle
 * @param {*} centerX the center of the circle pos X
 * @param {*} centerY the center of the circle pos Y
 * @param {*} size the radius of the circle
 * @param {*} color the color of the circle
 */
export const colorCircle = (centerX: number, centerY: number, size: number, color: any) => {
	Engine.getCanvasContext().fillStyle = color;
	Engine.getCanvasContext().beginPath();
	Engine.getCanvasContext().arc(centerX, centerY, size, 0, Math.PI*2, true);
	Engine.getCanvasContext().fill();
}

//render a list of objects if the condition is true
export const renderObjectList = (list: any[], condition: boolean) => {
	if(!condition)
		return;

	for(let i = 0; i < list.length; i++) {
		list[i].render(condition);
	}
}
