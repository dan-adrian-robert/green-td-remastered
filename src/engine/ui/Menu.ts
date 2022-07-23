//Menu Constructor

import {Engine} from "../Engine.";

export class Menu {
	diff: number;
	chosen: number;
	bgImg: any;
	opImg: any;
	diffImg: any;
	boImg: any;
	goImg: any;

	bgSw: number;
	bgSh: number;

	opSw: number;
	opSh: number;

	boSw: number;
	boSh: number;

	goSw: number;
	goSh: number;

	menuOptions: any[];
	gameOverOptions: any[];
	difficultyOptions: any[];

	optionSelected:number;
	gameOverOptionSelected:number;
	selectedDifficulty:number;

	buttonPoz:any[];
	diffPoz:any[];
	gameOverButtons:any[];
	selectedButton: string


	constructor (imageBg: any, image_bg_width: number, image_bg_height: number,
				 imageOp: any, image_op_width: number, image_op_height: number,
				 imageBo: any, image_bo_width: number, image_bo_height: number,
				 imageGameOver: any, image_go_width: number, image_go_height: number) {
		this.diff = 2;
		this.chosen = 0;

		//background image
		this.bgImg = imageBg;

		//Option Image
		this.opImg = imageOp;

		//Difficulty option image
		this.diffImg = imageOp;

		//Border Image
		this.boImg = imageBo;

		//Game Over Image
		this.goImg = imageGameOver;

		//sizes for background image
		this.bgSw = image_bg_width;
		this.bgSh = image_bg_height;

		//sizes for option image
		this.opSw = image_op_width;
		this.opSh = image_op_height;

		//sizes for border image
		this.boSw = image_bo_width;
		this.boSh = image_bo_height;

		//sizes for game over image
		this.goSw = image_go_width;
		this.goSh = image_go_height;

		this.menuOptions = ['Start','Difficulty'];
		this.gameOverOptions = ['To Menu'];
		this.difficultyOptions = ['Easy', 'Medium', 'Hard'];

		this.optionSelected = -1;
		this.gameOverOptionSelected = -1;
		this.selectedDifficulty = -1;

		this.buttonPoz = [];
		this.diffPoz = [];
		this.gameOverButtons = [];
		this.selectedButton = "None"

		this.init();
	}

	updateSelectedOption(direction: any) {
		if(direction === 1) {
			this.optionSelected += 1;
			this.optionSelected %= this.menuOptions.length;
		}else if(direction === -1){
			this.optionSelected -= 1;
			if(this.optionSelected < 0 ){
				this.optionSelected = this.menuOptions.length - 1;
			}
		}
	}

	getMenuButtons () {
		return this.buttonPoz;
	}

	getSelectedOption() {
		return this.menuOptions[this.optionSelected];
	}

	getOption(index: number) {
		if(index > 0 && index < this.menuOptions.length)
			return this.menuOptions[index];
		else
			return this.menuOptions[0];

	}

	getDifficultyOption(index : number) {
		if(index > 0 && index < this.difficultyOptions.length)
			return this.difficultyOptions[index];
		else
			return this.difficultyOptions[0];
	}

	getCurrentDifficulty() {
		return this.difficultyOptions[this.selectedDifficulty];
	}

	getGameOverButtons (index: number) {
		if(index > 0 && index < this.gameOverOptions.length)
			return this.gameOverOptions[index];
		else
			return this.gameOverOptions[0];
	}

	isSelected(index: number) {
		return index === this.optionSelected;
	}

	getSelectedDifficulty() {
		return this.selectedDifficulty;
	}

	isGoSelected(index: number) {
		return (index === this.gameOverOptionSelected)
	}

	init() {
		//set the text align for the menu options
		let x = Engine.getCanvas().width  / 100 * 65;
		let y = Engine.getCanvas().height / 100 * 35;

		//populate buttons positions for the start menu
		for(let i = 0; i < this.menuOptions.length; i++) {
			this.buttonPoz.push({'x':x-8,
								 'y':y - 30 + 75 * i,
								 'sizeX':150,
								 'sizeY':50 });
		}

		for(let i = 0; i < this.difficultyOptions.length; i++) {
			this.diffPoz.push({'x':x-8,
								 'y':y - 30 + 75 * i,
								 'sizeX':150,
								 'sizeY':50 });
		}

		//set the text align for the game over menu options
		x = Engine.getCanvas().width  / 100 * 35;
		y = Engine.getCanvas().height / 100 * 75;

		//populate buttons positions for the game over menu
		for(let i = 0; i < this.gameOverOptions.length; i++) {
			this.gameOverButtons.push({'x':x-8,
								  	   'y':y - 30 + 75 * i,
								  	   'sizeX':120,
								  	   'sizeY':50 });
		}
	}

	setDifficulty(index: number) {
		this.selectedDifficulty = index;
	}

	render() {
		const c = Engine.getCanvasContext();
		c.font = '25pt Calibri';
		const bx = Engine.getBorder().sx;
		const by = Engine.getBorder().sy;

		c.drawImage(this.bgImg,
					0 ,0, this.bgSw, this.bgSh, 
					bx, by, Engine.getCanvas().width - 2 * bx, Engine.getCanvas().height - 2 * by);

		//draw each menu option
		for(let i = 0; i < this.buttonPoz.length; i++) {
			const x = this.buttonPoz[i].x;
			const y = this.buttonPoz[i].y;
			const sizeX = this.buttonPoz[i].sizeX;
			const sizeY = this.buttonPoz[i].sizeY;

			c.drawImage(this.opImg,
				0 ,0,this.opSw, this.opSh, 
				x, y, sizeX, sizeY);

			if(this.isSelected(i)) {
				c.fillStyle = 'red'; 
				c.fillText(this.getOption(i), x + 15, y + 30);
			}
			else {
				c.fillStyle = 'white'; 
				c.fillText(this.getOption(i), x + 15, y + 30);
			}
		}
	}

	isDifficultySelected(index: number) {
		return ( this.selectedDifficulty === index);
	}

	renderDifficulty() {
		const c = Engine.getCanvasContext();
		c.font = '25pt Calibri';//set the font
		const bx = Engine.getBorder().sx;
		const by = Engine.getBorder().sy;
		
		c.drawImage(this.bgImg,
					0 ,0, this.bgSw, this.bgSh, 
					bx, by, Engine.getCanvas().width - 2 * bx, Engine.getCanvas().height - 2 * by);

		for(let i = 0; i < this.difficultyOptions.length; i++) {
			const x = this.diffPoz[i].x;
			const y = this.diffPoz[i].y;
			const sizeX = this.diffPoz[i].sizeX;
			const sizeY = this.diffPoz[i].sizeY;

			c.drawImage(this.opImg,
				0 ,0,this.opSw, this.opSh, 
				x, y, sizeX, sizeY);

			if(this.isDifficultySelected(i)) {
				c.fillStyle = 'red'; 
				c.fillText(this.difficultyOptions[i], x + 15, y + 30); 
			}
			else {
				c.fillStyle = 'white'; 
				c.fillText(this.difficultyOptions[i], x + 15, y + 30);
			}
		}
	}

	renderGameOverMenu() {
		const c = Engine.getCanvasContext();
		const bx = Engine.getBorder().sx;
		const by = Engine.getBorder().sy;
		c.drawImage(this.goImg,
					0 ,0, this.goSw, this.goSh,
					bx, by, Engine.getCanvas().width - 2 * bx , Engine.getCanvas().height - 2 * by);

		for(let i = 0; i < this.gameOverButtons.length; i++) {
			const x = this.gameOverButtons[i].x;
			const y = this.gameOverButtons[i].y;
			const sizeX = this.gameOverButtons[i].sizeX;
			const sizeY = this.gameOverButtons[i].sizeY;

			//draw the game over background image
			c.drawImage(this.opImg,
					    0 , 0, this.opSw, this.opSh,
					    x, y, sizeX, sizeY);

			c.font = '25px Calibri';

			if(this.isGoSelected(i)) {
				c.fillStyle = 'red';
				c.fillText(this.getGameOverButtons(i), x + 15, y + 30);
			} else {
				c.fillStyle = 'white';
				c.fillText(this.getGameOverButtons(i), x + 15, y + 30);
			}
		}
	}
}
