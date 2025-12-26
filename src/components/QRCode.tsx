import { useEffect, useRef } from "react";

const QRCodeComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 150;
    const moduleCount = 21;
    const moduleSize = size / moduleCount;

    // Simple QR code pattern (decorative)
    const pattern = [
      [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0,0,0,1],
      [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],
      [1,0,1,1,1,0,1,0,0,1,0,1,0,0,1,0,1,1,1,0,1],
      [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],
      [1,0,0,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
      [0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
      [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
      [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
      [0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0],
      [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
      [1,0,0,0,0,0,1,0,0,1,0,1,0,1,0,1,0,1,0,1,0],
      [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
      [1,0,1,1,1,0,1,0,0,1,0,1,0,1,0,1,0,1,0,1,0],
      [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
      [1,0,0,0,0,0,1,0,0,1,0,1,0,1,0,1,0,1,0,1,0],
      [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
    ];

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, size, size);

    // Draw primary color modules
    ctx.fillStyle = "#1e8449"; // Primary green
    pattern.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 1) {
          ctx.fillRect(x * moduleSize, y * moduleSize, moduleSize, moduleSize);
        }
      });
    });

    // Draw logo placeholder in center
    const logoSize = moduleSize * 5;
    const logoPos = (size - logoSize) / 2;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(logoPos - 2, logoPos - 2, logoSize + 4, logoSize + 4);
    
    // Draw B in center
    ctx.fillStyle = "#0e6655";
    ctx.font = "bold 24px Montserrat, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("B", size / 2, size / 2);

  }, []);

  return (
    <div className="inline-flex items-center justify-center p-4 bg-background rounded-xl">
      <canvas
        ref={canvasRef}
        width={150}
        height={150}
        className="rounded-lg"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
};

export default QRCodeComponent;
