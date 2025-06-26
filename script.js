BUTTON_ID = {
  // 移動キー
  14: "Left",
  13: "Down",
  15: "Right",
  12: "Up",
  // ABXY
  0: "A",
  1: "B",
  2: "X",
  3: "Y",
  // LR
  4: "LB",
  6: "LT",
  10: "LS",
  5: "RB",
  7: "RT",
  11: "RS",
  // その他
  8: "Select",
  9: "Start",
};

class ButtonHandler {
  constructor(mapping) {
    this.mapping = mapping;

    window.addEventListener("gamepadconnected", (event) => {
      const gamepad = event.gamepad;
      const padId = gamepad.id;
      console.log(padId);
      this.bind();
    });
  }

  bind() {
    const refresh = () => {
      const gamepads = navigator.getGamepads();
      if (!gamepads) return;

      for (let i = 0; i < gamepads.length; i++) {
        const gamepad = gamepads[i];
        if (!gamepad) continue;

        for (let j = 0; j < gamepad.buttons.length; j++) {
          const button = gamepad.buttons[j];
          const key = BUTTON_ID[j] || '';
          const buttonDivId = this.mapping[key];

          // ボタンが押されているものはマッピングされてたらActiveにする
          if (button.pressed) {
            // jに当たるIDをActiveにする
            console.log(`${j}:${key} pressed.`);
            if (!buttonDivId) continue;
            document.getElementById(buttonDivId).classList.add("active");
            continue;
          }

          // 押されていないものはactiveを取る
          if (!buttonDivId) continue;
          document.getElementById(buttonDivId).classList.remove("active");
        }
      }

      requestAnimationFrame(refresh);
    };
    refresh();
  }
}