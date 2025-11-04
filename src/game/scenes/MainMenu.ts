import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class MainMenu extends Scene {
    background: GameObjects.Image;
    logo: GameObjects.Image;
    logoTween: Phaser.Tweens.Tween | null;
    nameFormContainer: HTMLFormElement | null = null;
    nameInput: HTMLInputElement | null = null;
    nameInputContainer: HTMLDivElement | null = null;
    submitButton: HTMLButtonElement | null = null;
    playerName: string = '';
    handleKeyPress?: (e: KeyboardEvent) => void;

    constructor() {
        super('MainMenu');
    }

    preload() {
        this.load.image('input-bg', './assets/entry_of_name.png');
        this.load.image('button-bg', './assets/start_button.png');
        this.load.audio('menuTheme', 'assets/audio/themeMenu.m4a');
        this.load.image('leaderboardIcon', './assets/leaderboard.png');

    }

    create() {
        this.background = this.add.image(512, 384, 'background');
        this.logo = this.add.image(512, 250, 'logo').setDepth(10);
        this.logoTween = this.tweens.add({
            targets: this.logo,
            y: this.logo.y + 15,
            duration: 1500,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });

        this.createNameInput();
        this.loadPlayerName();
        this.events.on('shutdown', this.handleShutdown, this);
        EventBus.emit('current-scene-ready', this);

        if (!this.sound.get('menuTheme')) {
            this.sound.play('menuTheme', { loop: true, volume: 0.7 });
        }
    }

    stopBackgroundMusic() {
        if (this.sound.get('menuTheme')) {
            this.sound.stopByKey('menuTheme');
        }
    }

    createNameInput() {
    this.nameFormContainer = document.createElement('form');
    this.nameInputContainer = document.createElement('div');
    this.nameInputContainer.classList.add('name-input-container');

    this.nameInput = document.createElement('input');
    this.nameInput.autocomplete = 'off';
    this.nameInput.required = true;
    this.nameInput.type = 'text';
    this.nameInput.placeholder = 'Enter your name';
    this.nameInput.id = 'player-name-input';
    this.nameInput.maxLength = 10;
    this.nameInput.minLength = 3;

    this.submitButton = document.createElement('button');
    this.submitButton.textContent = 'Start Game';
    this.submitButton.classList.add('submit-button');

        const inputTexture = this.textures.get('input-bg');
        const buttonTexture = this.textures.get('button-bg');

        const inputAspectRatio = inputTexture.source[0].height / inputTexture.source[0].width;
        if (this.nameInput) {
            this.nameInput.style.width = `300px`;
            this.nameInput.style.height = `${Math.round(300 * inputAspectRatio)}px`;
        }

        const buttonAspectRatio = buttonTexture.source[0].height / buttonTexture.source[0].width;
        if (this.submitButton) {
            this.submitButton.style.width = `300px`;
            this.submitButton.style.height = `${Math.round(300 * buttonAspectRatio)}px`;
        }

        const triggerStart = () => {
            const value = this.nameInput?.value.trim() ?? '';
            if (!value) {
                return;
            }
            this.savePlayerName(value);
            this.removeInputElements();
            this.changeScene();
        };

        if (this.submitButton) {
            this.submitButton.addEventListener('click', (e) => {
                e.preventDefault();
                triggerStart();
            });
        }

        this.handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                triggerStart();
            }
        };

        if (this.nameInput && this.handleKeyPress) {
            this.nameInput.addEventListener('keypress', this.handleKeyPress);
        }

        if (this.nameInputContainer && this.nameInput && this.submitButton && this.nameFormContainer) {
            this.nameInputContainer.appendChild(this.nameInput);
            this.nameInputContainer.appendChild(this.submitButton);
            this.nameFormContainer.appendChild(this.nameInputContainer);
            document.body.appendChild(this.nameFormContainer);
        }

        if (this.playerName && this.nameInput) {
            this.nameInput.value = this.playerName;
        }
    }

    savePlayerName(providedName?: string) {
        const name = (providedName ?? this.nameInput?.value ?? '').trim();
        if (name) {
            this.playerName = name;
            localStorage.setItem('playerName', name);

            this.scene.restart();
        }
    }

    loadPlayerName() {
        const savedName = localStorage.getItem('playerName');
        if (savedName) {
            this.playerName = savedName;
        }
    }

    handleShutdown() {
        if (this.nameFormContainer?.parentNode) {
            this.nameFormContainer.parentNode.removeChild(this.nameFormContainer);
        }
    }

    removeInputElements() {
        if (this.nameInput && this.handleKeyPress) {
            this.nameInput.removeEventListener('keypress', this.handleKeyPress);
        }

        if (this.nameFormContainer?.parentNode) {
            this.nameFormContainer.parentNode.removeChild(this.nameFormContainer);
        }

        this.nameFormContainer = null;
        this.nameInputContainer = null;
        this.nameInput = null;
        this.submitButton = null;
        this.handleKeyPress = undefined;
    }

    changeScene() {
        if (this.logoTween) {
            this.logoTween.stop();
            this.logoTween = null;
        }
        this.stopBackgroundMusic();
        this.removeInputElements();
        this.scene.start('Game');
    }
}
