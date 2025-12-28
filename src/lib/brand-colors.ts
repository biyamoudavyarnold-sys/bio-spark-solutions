type RGB = { r: number; g: number; b: number };

type HSL = { h: number; s: number; l: number };

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

function rgbToHsl({ r, g, b }: RGB): HSL {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;

  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === rn) h = ((gn - bn) / delta) % 6;
    else if (max === gn) h = (bn - rn) / delta + 2;
    else h = (rn - gn) / delta + 4;
    h *= 60;
    if (h < 0) h += 360;
  }

  const l = (max + min) / 2;
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  return { h, s: s * 100, l: l * 100 };
}

function toHslVar(hsl: HSL) {
  return `${Math.round(hsl.h)} ${Math.round(hsl.s)}% ${Math.round(hsl.l)}%`;
}

function adjust(hsl: HSL, opts: { sDelta?: number; lDelta?: number }): HSL {
  return {
    h: hsl.h,
    s: clamp(hsl.s + (opts.sDelta ?? 0), 0, 100),
    l: clamp(hsl.l + (opts.lDelta ?? 0), 0, 100),
  };
}

function isNearWhite({ r, g, b }: RGB) {
  return r > 245 && g > 245 && b > 245;
}

function pickDominantRGB(
  data: Uint8ClampedArray,
  size: number,
  predicate: (rgb: RGB, hsl: HSL, a: number) => boolean
): RGB | null {
  // Quantize to 4-level per channel (64 buckets) for stable “dominant” detection.
  // Then compute the average of pixels inside the best bucket.
  const buckets = new Map<number, { count: number; sumR: number; sumG: number; sumB: number }>();

  for (let i = 0; i < size; i += 4) {
    const a = data[i + 3] / 255;
    if (a < 0.85) continue;

    const rgb = { r: data[i], g: data[i + 1], b: data[i + 2] };
    if (isNearWhite(rgb)) continue;

    const hsl = rgbToHsl(rgb);
    if (!predicate(rgb, hsl, a)) continue;

    const key = ((rgb.r >> 2) << 16) | ((rgb.g >> 2) << 8) | (rgb.b >> 2);
    const entry = buckets.get(key) ?? { count: 0, sumR: 0, sumG: 0, sumB: 0 };
    entry.count += 1;
    entry.sumR += rgb.r;
    entry.sumG += rgb.g;
    entry.sumB += rgb.b;
    buckets.set(key, entry);
  }

  let best: { key: number; count: number } | null = null;
  for (const [key, v] of buckets.entries()) {
    if (!best || v.count > best.count) best = { key, count: v.count };
  }

  if (!best) return null;
  const v = buckets.get(best.key)!;
  return {
    r: Math.round(v.sumR / v.count),
    g: Math.round(v.sumG / v.count),
    b: Math.round(v.sumB / v.count),
  };
}

export async function applyBrandColorsFromLogo(logoUrl: string) {
  try {
    const img = new Image();
    img.decoding = "async";
    img.src = logoUrl;

    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Logo load failed"));
    });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const target = 96;
    canvas.width = target;
    canvas.height = target;
    ctx.drawImage(img, 0, 0, target, target);

    const imageData = ctx.getImageData(0, 0, target, target);
    const data = imageData.data;

    const greenRGB = pickDominantRGB(data, data.length, (_rgb, hsl) => {
      const h = hsl.h;
      return hsl.s > 30 && hsl.l > 10 && hsl.l < 70 && h >= 85 && h <= 170;
    });

    const blueRGB = pickDominantRGB(data, data.length, (_rgb, hsl) => {
      const h = hsl.h;
      return hsl.s > 30 && hsl.l > 10 && hsl.l < 75 && h >= 185 && h <= 255;
    });

    if (!greenRGB || !blueRGB) return;

    const green = rgbToHsl(greenRGB);
    const blue = rgbToHsl(blueRGB);

    const root = document.documentElement;

    const primary = adjust(green, { sDelta: +5, lDelta: -6 }); // a bit darker & richer
    const primaryLight = adjust(primary, { sDelta: -6, lDelta: +12 });
    const primaryDark = adjust(primary, { sDelta: +6, lDelta: -12 });

    const secondary = adjust(blue, { sDelta: +6, lDelta: -8 });
    const secondaryLight = adjust(secondary, { sDelta: -8, lDelta: +12 });
    const secondaryDark = adjust(secondary, { sDelta: +8, lDelta: -12 });

    root.style.setProperty("--primary", toHslVar(primary));
    root.style.setProperty("--primary-light", toHslVar(primaryLight));
    root.style.setProperty("--primary-dark", toHslVar(primaryDark));
    root.style.setProperty("--ring", toHslVar(primary));

    root.style.setProperty("--secondary", toHslVar(secondary));
    root.style.setProperty("--secondary-light", toHslVar(secondaryLight));
    root.style.setProperty("--secondary-dark", toHslVar(secondaryDark));

    // Keep sidebar aligned with brand.
    root.style.setProperty("--sidebar-primary", toHslVar(primary));
    root.style.setProperty("--sidebar-ring", toHslVar(primary));
  } catch {
    // Silently ignore: the CSS defaults will still apply.
  }
}
