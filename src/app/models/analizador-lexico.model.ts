export class AnalizadorLexico {

  private codFuente: string;
	private apAvance: number;
	private apInicio: number;
	private comienza: number;
	private estado: number;
	
	private lexema: string;
  private c: string;
  private finArch: boolean;

  private pr: string[] = [
    "declara",
		"fin_declara",
		"principal",
		"fin_principal",
		"dato",
		"funciones",
		"fin_funciones",
		"cadena",
		"numerico",
		"escribir",
		"escribir_enter",
		"leer",
		"itera",
		"fin_itera",
		"verdad",
		"entonces",
		"y_si_no",
		"fin_verdad",
		"y",
		"o",
		"nel",
		"div",
		"mod",
		"abs",
		"funcion",
		"fin_funcion"
  ]

  private tokens: string[] = [];

  constructor(codigoFuente: string) {
    this.codFuente = codigoFuente;
    this.apAvance = 0;
		this.apInicio = 0;
  }

  public analizarCodigo(): string[] {
    while(!this.finArch) {
			this.estado = 0;
			this.comienza = 0;
			let tok = this.token();

      if (this.esPalabraReservada(this.lexema)) {
				tok = this.lexema.toLowerCase();
			}
      if (tok != 'omite') {
				let lex = this.lexema;
				if (tok == 'cad') {
					lex = lex.substring(1, lex.length - 1);
				} else {
					lex = this.lexema;
				}
        this.tokens.push(tok);
        this.tokens.push(lex);
			}
    }
    this.tokens.push('fin');
    this.tokens.push('fin');
    return this.tokens;
  }

  private token(): string {
		do {
			switch(this.estado) {
			case 0:
				this.c = this.leerCar();
				if(this.esLetra(this.c)) {
					this.estado = 1;
				}else {
					this.estado = this.diagrama();
				}
				break;
			case 1:
				this.c = this.leerCar();
				if(this.esLetra(this.c) || this.esDigito(this.c)) {
					this.estado = 1;
				}else if(this.c == '_') {
					this.estado = 2;
				}else {
					this.estado = 3;
				}
				break;
			case 2:
				this.c = this.leerCar();
				if(this.esLetra(this.c) || this.esDigito(this.c)) {
					this.estado = 1;
				}else {
					this.estado = this.diagrama();
				}
				break;
			case 3:
				this.apAvance--;
				this.lexema = this.obtenerLexema();
				this.apInicio = this.apAvance;
				return('id');
			case 4:
				this.c = this.leerCar();
				if(this.c == '"') {
					this.estado = 5;
				}else {
					this.estado = this.diagrama();
				}
				break;
			case 5:
				this.c = this.leerCar();
				if(this.c=='"' || this.c.charCodeAt(0)==10) {
					this.estado = this.diagrama();
				}else {
					this.estado = 6;
				}
				break;
			case 6:
				this.c = this.leerCar();
				if(this.c.charCodeAt(0)==10 || this.c.charCodeAt(0)==35) {
					this.estado = this.diagrama();
				}else if(this.c == '"') {
					this.estado = 7;
				}
				break;
			case 7:
				this.lexema = this.obtenerLexema();
				this.apInicio = this.apAvance;
				return("cad");
			case 8:
				this.c = this.leerCar();
				if(this.esDigito(this.c)) {
					this.estado = 9;
				}else {
					this.estado = this.diagrama();
				}
				break;
			case 9:
				this.c = this.leerCar();
				if(this.esDigito(this.c)) {
					this.estado = 9;
				}else if(this.c == '.') {
					this.estado = 10;
				}else {
					this.estado = this.diagrama();
				}
				break;
			case 10:
				this.c = this.leerCar();
				if(this.esDigito(this.c)) {
					this.estado = 11;
				}else {
					this.estado = this.diagrama();
				}
				break;
			case 11:
				this.c = this.leerCar();
				if(this.esDigito(this.c)) {
					this.estado = 11;
				}else {
					this.estado = 12;
				}
				break;
			case 12:
				this.apAvance--;
				this.lexema = this.obtenerLexema();
				this.apInicio = this.apAvance;
				return("num");
			case 13:
				this.c = this.leerCar();
				if(this.esDigito(this.c)) {
					this.estado = 14;
				}else {
					this.estado = this.diagrama();
				}
				break;
			case 14:
				this.c = this.leerCar();
				if(this.esDigito(this.c)) {
					this.estado = 14;
				}else {
					this.estado = 15;
				}
				break;
			case 15:
				this.apAvance--;
				this.lexema = this.obtenerLexema();
				this.apInicio = this.apAvance;
				return("num");
			case 16:
				this.c = this.leerCar();
				if(this.c == '>') {
					this.estado = 17;
				}else if(this.c == '<') {
					this.estado = 20;
				}else if(this.c == '=') {
					this.estado = 25;
				}else {
					this.estado = this.diagrama();
				}
				break;
			case 17:
				this.c = this.leerCar();
				if(this.c == '=') {
					this.estado = 18;
				}else {
					this.estado = 19;
				}
				break;
			case 18:
				this.lexema = this.obtenerLexema();
				this.apInicio = this.apAvance;
				return("mai");
			case 19:
				this.apAvance--;
				this.lexema = this.obtenerLexema();
				this.apInicio = this.apAvance;
				return(">");
			case 20:
				this.c = this.leerCar();
				if(this.c == '=') {
					this.estado = 21;
				}else if(this.c == '-') {
					this.estado = 22;
				}else if(this.c == '>') {
					this.estado = 23;
				}else {
					this.estado = 24;
				}
				break;
			case 21:
				this.lexema = this.obtenerLexema();
				this.apInicio = this.apAvance;
				return("mei");
			case 22:
				this.lexema = this.obtenerLexema();
				this.apInicio = this.apAvance;
				return("opasig");
			case 23:
				this.lexema = this.obtenerLexema();
				this.apInicio = this.apAvance;
				return("dif");
			case 24:
				this.apAvance--;
				this.lexema = this.obtenerLexema();
				this.apInicio = this.apAvance;
				return("<");
			case 25:
				this.c = this.leerCar();
				if(this.c == '<') {
					this.estado = 21;
				}else if(this.c == '>') {
					this.estado = 18;
				}else {
					this.estado = 26;
				}
				break;
			case 26:
				this.apAvance--;
				this.lexema = this.obtenerLexema();
				this.apInicio = this.apAvance;
				return("=");
			case 27:
				this.c = this.leerCar();
				if(this.c==' ' || this.c.charCodeAt(0)==9 || this.c.charCodeAt(0)==10 || this.c.charCodeAt(0)==11 || this.c.charCodeAt(0)==13) {
					this.estado = 28;
				}else {
					this.estado = this.diagrama();
				}
				break;
			case 28:
				this.c = this.leerCar();
				if(this.c==' ' || this.c.charCodeAt(0)==9 || this.c.charCodeAt(0)==10 || this.c.charCodeAt(0)==11 || this.c.charCodeAt(0)==13) {
					this.estado = 28;
				}else {
					this.estado = 29;
				}
				break;
			case 29:
				this.apAvance--;
				this.lexema = this.obtenerLexema();
				this.apInicio = this.apAvance;
				return("omite");
			case 30:
				this.c = this.leerCar();
				if(this.c == '+') {
					this.estado = 31;
				}else if(this.c == '-') {
					this.estado = 32;
				}else if(this.c == '*') {
					this.estado = 35;
				}else if(this.c == '/') {
					this.estado = 36;
				}else if(this.c == ';') {
					this.estado = 40;
				}else if(this.c == '(') {
					this.estado = 41;
				}else if(this.c == ')') {
					this.estado = 42;
				}else if(this.c == ',') {
					this.estado = 43;
				}else if(this.c == '[') {
					this.estado = 44;
				}else if(this.c == ']') {
					this.estado = 45;
				}else if(this.c.charCodeAt(0) == 35) {
					this.estado = 46;
				}else {
					this.estado = this.diagrama();
				}
				break;
			case 31:
				this.lexema = this.obtenerLexema();
				this.apInicio = this.apAvance;
				return("+");
			case 32:
				this.c = this.leerCar();
				if(this.c == '>') {
					this.estado = 33;
				}else {
					this.estado = 34;
				}
				break;
			case 33:
				this.lexema = this.obtenerLexema();
				this.apInicio = this.apAvance;
				return("opdec");
			case 34:
				this.apAvance--;
				this.lexema = this.obtenerLexema();
				this.apInicio = this.apAvance;
				return("-");
			case 35:
				this.lexema = this.obtenerLexema();
				this.apInicio = this.apAvance;
				return("*");
			case 36:
				this.c = this.leerCar();
				if(this.c == '/') {
					this.estado = 37;
				}else {
					this.estado = 39;
				}
				break;
			case 37:
				this.c = this.leerCar();
				if(this.c.charCodeAt(0)==10 || this.c.charCodeAt(0)==35) {
					this.estado = 38;
				}else {
					this.estado = 37;
				}
				break;
			case 38:
				this.apAvance--;
				this.lexema = this.obtenerLexema();
				this.apInicio = this.apAvance;
				return("omite");
			case 39:
				this.apAvance--;
				this.lexema = this.obtenerLexema();
				this.apInicio = this.apAvance;
				return("/");
			case 40:
				this.lexema = this.obtenerLexema();
				this.apInicio = this.apAvance;
				return(";");
			case 41:
				this.lexema = this.obtenerLexema();
				this.apInicio = this.apAvance;
				return("(");
			case 42:
				this.lexema = this.obtenerLexema();
				this.apInicio = this.apAvance;
				return(")");
			case 43:
				this.lexema = this.obtenerLexema();
				this.apInicio = this.apAvance;
				return(",");
			case 44:
				this.lexema = this.obtenerLexema();
				this.apInicio = this.apAvance;
				return("[");
			case 45:
				this.lexema = this.obtenerLexema();
				this.apInicio = this.apAvance;
				return("]");
			case 46:
				this.lexema = this.obtenerLexema();
				this.apInicio = this.apAvance;
				return("omite");
			}
		}while(true);
	}

  private diagrama(): number {
		this.apAvance = this.apInicio;
		
		switch(this.comienza) {
		case 0:
			this.comienza = 4;
			break;
		case 4:
			this.comienza = 8;
			break;
		case 8:
			this.comienza = 13;
			break;
		case 13:
			this.comienza = 16;
			break;
		case 16:
			this.comienza = 27;
			break;
		case 27:
			this.comienza = 30;
			break;
		case 30:
			this.error();
			break;
		default:
			this.error();
		}
		return this.comienza;
	}

  private error(): void {
		console.log(`Error Lexicografico`);
	}

  private leerCar(): string {
		if(this.apAvance < this.codFuente.length) {
			return this.codFuente.charAt(this.apAvance++);
		}else {
			this.finArch = true;
			return '#';
		}
	}

  private esLetra(caracter: string): boolean {
    const car = caracter.charCodeAt(0);
		if((car>=65 && car<=90) || (car>=97 && car<=122)) {
			return true;
		}else {
			return false;
		}
	}

  private esDigito(caracter: string): boolean {
		if(caracter >= '0' && caracter <= '9') {
			return true;
		}else {
			return false;
		}
	}

  private obtenerLexema(): string {
		let lex = '';

		for(let i=this.apInicio; i<this.apAvance; i++) {
			lex = lex + this.codFuente.charAt(i)
		}
		return lex;
	}

  private esPalabraReservada(lex: string): boolean {
    return this.pr.find(p => p == lex.toLowerCase()) ? true : false;
	}

}