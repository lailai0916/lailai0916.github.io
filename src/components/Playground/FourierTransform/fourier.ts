export interface Point {
  x: number;
  y: number;
}

export interface FourierCoefficient {
  freq: number;
  amp: number;
  phase: number;
}

function fft(real: Float64Array, imag: Float64Array, inverse = false): void {
  const size = real.length;
  for (let i = 1, j = 0; i < size; i++) {
    let bit = size / 2;
    while (j & bit) {
      j ^= bit;
      bit /= 2;
    }
    j ^= bit;
    if (i < j) {
      [real[i], real[j]] = [real[j], real[i]];
      [imag[i], imag[j]] = [imag[j], imag[i]];
    }
  }

  for (let length = 2; length <= size; length *= 2) {
    const angle = ((inverse ? 2 : -2) * Math.PI) / length;
    const stepReal = Math.cos(angle);
    const stepImag = Math.sin(angle);
    for (let start = 0; start < size; start += length) {
      let unitReal = 1;
      let unitImag = 0;
      for (let offset = 0; offset < length / 2; offset++) {
        const even = start + offset;
        const odd = even + length / 2;
        const oddReal = unitReal * real[odd] - unitImag * imag[odd];
        const oddImag = unitReal * imag[odd] + unitImag * real[odd];
        real[odd] = real[even] - oddReal;
        imag[odd] = imag[even] - oddImag;
        real[even] += oddReal;
        imag[even] += oddImag;
        const nextReal = unitReal * stepReal - unitImag * stepImag;
        unitImag = unitReal * stepImag + unitImag * stepReal;
        unitReal = nextReal;
      }
    }
  }

  if (inverse) {
    for (let i = 0; i < size; i++) {
      real[i] /= size;
      imag[i] /= size;
    }
  }
}

export function dft(points: Point[]): FourierCoefficient[] {
  const count = points.length;
  if (count === 0) return [];

  // Bluestein's convolution handles arbitrary point counts without quadratic work.
  let size = 1;
  while (size < 2 * count - 1) size *= 2;

  const real = new Float64Array(size);
  const imag = new Float64Array(size);
  const kernelReal = new Float64Array(size);
  const kernelImag = new Float64Array(size);

  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * ((i * i) % (2 * count))) / count;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    real[i] = points[i].x * cos + points[i].y * sin;
    imag[i] = points[i].y * cos - points[i].x * sin;
    kernelReal[i] = cos;
    kernelImag[i] = sin;
    if (i > 0) {
      kernelReal[size - i] = cos;
      kernelImag[size - i] = sin;
    }
  }

  fft(real, imag);
  fft(kernelReal, kernelImag);
  for (let i = 0; i < size; i++) {
    const productReal = real[i] * kernelReal[i] - imag[i] * kernelImag[i];
    imag[i] = real[i] * kernelImag[i] + imag[i] * kernelReal[i];
    real[i] = productReal;
  }
  fft(real, imag, true);

  const result: FourierCoefficient[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * ((i * i) % (2 * count))) / count;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const coefficientReal = real[i] * cos + imag[i] * sin;
    const coefficientImag = imag[i] * cos - real[i] * sin;
    result.push({
      freq: i <= count / 2 ? i : i - count,
      amp: Math.hypot(coefficientReal, coefficientImag) / count,
      phase: Math.atan2(coefficientImag, coefficientReal),
    });
  }

  return result.sort((a, b) => b.amp - a.amp);
}
