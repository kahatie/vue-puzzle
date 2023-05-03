<template>
  <span :class="{ valid: isValid }">Puzzle</span>
  <div id="puzzle"></div>
  <button>
</template>

<script>
import headbreaker from 'headbreaker';

export default {
  name: 'Puzzle',
  data() {
    return {
      isValid: false,
      width: 1920,
      height: 1080,
      maxPiecesCount: { x: 2, y: 2 },
    };
  },
  mounted() {
    let audio = new Audio(
      'https://flbulgarelli.github.io/headbreaker/static/connect.wav'
    );
    let background = new Image();
    background.src =
      'https://flbulgarelli.github.io/headbreaker/static/vangogh.jpg';
    background.onload = () => {
      this.generatePuzzle(background, audio);
    };
  },
  methods: {
    generatePuzzle(background, audio) {
      const piecesValidator = headbreaker.SpatialMetadata.relativePosition;
      const canvas = new headbreaker.Canvas('puzzle', {
        width: this.width,
        height: this.height,
        outline: new headbreaker.outline.Rounded(),
        image: background,
        pieceSize: 50,
        proximity: 20,
        borderFill: 10,
        strokeWidth: 2,
        lineSoftness: 0.18,
        maxPiecesCount: this.maxPiecesCount,
        fixed: true,
      });
      canvas.adjustImagesToPuzzleHeight();
      canvas.autogenerate({
        horizontalPiecesCount: this.maxPiecesCount.x,
        verticalPiecesCount: this.maxPiecesCount.y,
      });
      console.log(canvas);

      canvas.shuffleGrid();
      canvas.registerKeyboardGestures();
      canvas.draw();

      canvas.onConnect((_piece, figure, _target, targetFigure) => {
        // play sound
        audio.play();

        

        // paint borders on click
        // of conecting and conected figures
        figure.shape.stroke('yellow');
        targetFigure.shape.stroke('yellow');
        canvas.redraw();

        setTimeout(() => {
          // restore border colors
          // later
          figure.shape.stroke('black');
          targetFigure.shape.stroke('black');
          canvas.redraw();
        }, 200);
      });

      canvas.onDisconnect((it) => {
        audio.play();
        this.isValid = false;
      });

      canvas.attachSolvedValidator();
      canvas.onValid(() => {
        this.isValid = true;
      });
      // registerButtons('keyboard', keyboard);
    },
  },
};
</script>
<style scoped>
span {
  font-size: 1.3em;
  font-weight: bolder;
}
span.valid {
  color: green;
}
#puzzle {
  border: solid 1px black;
}
</style>
