import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { DataService } from "./data.service";

import * as Phaser from "phaser";

const SCENES = {
  FIRST: "FirstScene",
  SECOND: "SecondScene"
};

class CommonScene extends Phaser.Scene {
  back: Phaser.GameObjects.Image;
  mummy: Phaser.GameObjects.Sprite;
  loopText;

  preload() {
    this.load.image("lazur", "assets/bg/thorn_lazur.png");
    this.load.spritesheet({
      key: "mummy",
      url: "assets/sprites/metalslug_mummy37x45.png",
      frameConfig: {
        frameWidth: 37,
        frameHeight: 45,
        startFrame: 0,
        endFrame: 18
      }
    });
  }

  create() {
    this.back = this.add.image(0, 400, "lazur");
    this.back.scale = 2;

    this.mummy = this.add.sprite(100, 360, "mummy", 5);
    this.mummy.scale = 4;
    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("mummy", { start: 0, end: 18 }),
      frameRate: 10,
      repeat: -1
    });

    this.mummy.play('walk')
  }

  animationStarted() {
    this.add.text(32, 32, "Animation started", { fill: "white" });
  }

  animationLooped() {
    // if (this.anims.loopCount === 1) {
    //   this.loopText = this.add.text(32, 64, "Animation looped", {
    //     fill: "white"
    //   });
    // } else {
    //   this.loopText.text = "Animation looped x2";
    //   this.anim.loop = false;
    // }
  }

  animationStopped() {
    this.add.text(32, 64 + 32, "Animation stopped", { fill: "white" });
  }
}

class FirstScene extends CommonScene {
  update() {
    if (!this.anims.paused) {
      this.back.x -= 1;
    }
  }
}

class SecondScene extends CommonScene {
  update() {
    if (!this.anims.paused) {
      this.back.x -= 1;
    }
  }
}

class BootScene extends Phaser.Scene {
  create() {
    this.scene.add(SCENES.FIRST, FirstScene, true);
    this.scene.add(SCENES.SECOND, SecondScene, false);

    this.scene.run(SCENES.FIRST);
  }
}

interface GameInstance extends Phaser.Types.Core.GameConfig {
  instance: Phaser.Game;
}

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {
  initialize = true;
  game: GameInstance = {
    width: "100%",
    height: "100%",
    type: Phaser.AUTO,
    scene: BootScene,
    instance: null
  };

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private data: DataService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is("mobile")) {
        this.statusBar.styleLightContent();
        this.splashScreen.hide();
      }

      this.data
        .setup()
        .then(info => {
          console.log("Database setup complete");
        })
        .catch(error => console.log("Error setting up the Database: ", error));
    });
  }

  getInstance() {
    return this.game.instance;
  }

  initializeGame() {
    this.initialize = true;
  }
}
