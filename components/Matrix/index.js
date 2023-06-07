import { useEffect, useRef, useState } from "react";

function Matrix() {
  const [matrixInterval, setMatrixInterval] = useState(0);
  const canvasMatrix = useRef();

  useEffect(() => {
    const ctx_color = canvasMatrix.current.dataset.ctx;
    const canvasEl = canvasMatrix.current;
    const ctx = canvasEl.getContext("2d");
    canvasEl.height = window.innerHeight;
    canvasEl.width = window.innerWidth;
    let matrix =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    matrix = matrix.split("");
    const font_size = 10;
    const columns = canvasEl.width / font_size;
    const drops = [];
    for (let x = 0; x < columns; x++) drops[x] = 1;
    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
      ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
      ctx.fillStyle = ctx_color;
      ctx.font = font_size + "px";
      for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)];
        ctx.fillText(text, i * font_size, drops[i] * font_size);
        if (drops[i] * font_size > canvasEl.height && Math.random() > 0.975)
          drops[i] = 0;
        drops[i]++;
      }
    }
    const interval_id = setInterval(draw, 35);
    setMatrixInterval(interval_id);

    return () => {
      clearInterval(matrixInterval);
    };
  }, []);

  return (
    <div className="bg-black absolute top-0 right-0 -z-10">
      <canvas
        id="canvas_matrix"
        data-ctx="#efb90b"
        height="100%"
        width="100%"
        data-testid="canvas_matrix"
        ref={canvasMatrix}
      ></canvas>
    </div>
  );
}

export default Matrix;
