// Implementor
interface Country {
  getLimit(): string;
}

// ConcreteImplementor
class Japan implements Country {
  private limit: number;

  constructor(limit: number) {
    this.limit = limit;
  }
  public getLimit(): string {
    return `JP: ${this.limit} km/h`;
  }
}

// Abstraction
abstract class BikeModel {
  protected country: Country;

  constructor(country: Country) {
    this.country = country;
  }
  public abstract showLimit(): void;
}

// RefinedAbstraction
class TownieGo extends BikeModel {
  public showLimit(): void {
    console.log(`Townie Go ${this.country.getLimit()}`);
  }
}
class Carrera extends BikeModel {
  public showLimit(): void {
    console.log(`Carrera ${this.country.getLimit()}`);
  }
}

// Client
class JpBike {
  public static showBike(): void {
    const jp = new Japan(22);
    const townieGo = new TownieGo(jp);
    const carrera = new Carrera(jp);

    townieGo.showLimit();
    carrera.showLimit();
  }
}

JpBike.showBike();
/**
  Townie Go JP: 22 km/h
  Carrera JP: 22 km/h
 */
