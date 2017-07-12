import { Complex } from './complex';

export class FFT{
  private static fft_inner(n: number,stride: number,copy_flag: boolean,x: Array<Complex>,y: Array<Complex>) {
    if(n <= 1) {
      for (let q = 0; copy_flag && q < stride; q++){ y[q] = x[q]; }
      return;
    }

    const m = Math.floor(n/2);
    const theta = 2.0 * Math.PI / n;
    for (let p = 0; p < m; p++){
      const wp = new Complex(Math.cos(p * theta),-Math.sin(p * theta));
      for (let q = 0; q < stride; q++){
        const a = x[q + stride * p];
        const b = x[q + stride * (p + m)];
        y[q + stride * (2*p+0)] = a.plus(b);
        y[q + stride * (2*p+1)] = a.minus_bang(b).multi(wp);
      }
    }
    FFT.fft_inner(m, 2*stride, !copy_flag, y, x);
  }

  static fft(x: Array<Complex>, n: number) {
    FFT.fft_inner(n, 1, false, x, new Array<Complex>());
  }
}

