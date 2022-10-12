import {Engine} from "../Engine.";

export const renderMoney = () => {
	Engine.getCanvasContext().fillStyle = "yellow";
	Engine.getCanvasContext().font = "25px Arial";
	Engine.getCanvasContext().fillText(`${Engine.getMoney()}`, 900, 60);
}

export const renderLevel = () => {
	Engine.getCanvasContext().fillStyle = "blue";
	Engine.getCanvasContext().font = "25px Arial";
	Engine.getCanvasContext().fillText(Engine.getLvlSystem().getCurrentLevelText(), 800, 120);
	Engine.getCanvasContext().fillStyle = "yellow";
}

export const colorRect = (leftX:number, topY:number, width: number, height:number, drawColor: any) => {
	Engine.getCanvasContext().fillStyle = drawColor;
	Engine.getCanvasContext().fillRect(leftX, topY, width, height);
}

export const colorCircle = (centerX: number, centerY: number, size: number, color: any) => {
	Engine.getCanvasContext().fillStyle = color;
	Engine.getCanvasContext().beginPath();
	Engine.getCanvasContext().arc(centerX, centerY, size, 0, Math.PI*2, true);
	Engine.getCanvasContext().fill();
}

export const renderObjectList = (list: any[], condition: boolean): void => {
	if(!condition) {
		return;
	}

	for (let i = 0; i < list.length; i++) {
		list[i].render(condition);
	}
}
