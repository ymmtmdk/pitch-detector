export class Complex{
  real: number;
  imag: number;

  constructor(r:number, i:number){
    this.real = r;
    this.imag = i;
  }

  multi_f(f:number):Complex{
    return new Complex(this.real*f, this.imag*f);
  }

  multi_f_bang(f:number):Complex{
    this.real *= f;
    this.imag *= f;
    return this;
  }

  multi(c:Complex):Complex{
    return new Complex(this.real*c.real-this.imag*c.imag, this.real*c.imag+this.imag*c.real);
  }

  multi_bang(c:Complex):Complex{
    this.real = this.real*c.real-this.imag*c.imag;
    this.imag = this.real*c.imag+this.imag*c.real;
    return this;
  }

  minus(c:Complex):Complex{
    return new Complex(this.real-c.real, this.imag-c.imag);
  }

  minus_bang(c:Complex):Complex{
    this.real-=c.real;
    this.imag-=c.imag;
    return this;
  }

  plus(c:Complex):Complex{
    return new Complex(this.real+c.real, this.imag+c.imag);
  }

  plus_bang(c:Complex):Complex{
    this.real+=c.real;
    this.imag+=c.imag;
    return this;
  }

  exp():Complex{
    var expreal = Math.exp(this.real);
    return new Complex(expreal * Math.cos(this.imag), expreal * Math.sin(this.imag));
  }

  exp_bang():Complex{
    var expreal = Math.exp(this.real);
    this.real = expreal * Math.cos(this.imag);
    this.imag = expreal * Math.sin(this.imag);
    return this;
  }

  abs2():Complex{
    return new Complex(this.real*this.real + this.imag*this.imag, 0);
  }
}

