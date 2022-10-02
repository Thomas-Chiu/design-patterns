// Subject
interface MO {
  request(moNumber: string): void;
}

// RealSubject
class CreateMo implements MO {
  public request(moNumber: string): void {
    console.log(`creating MO ${moNumber}`);
  }
}

// Proxy
class MoProxy implements MO {
  private mo: MO;

  constructor() {
    this.mo = new CreateMo();
  }
  public request(moNumber: string): void {
    this.preRequest();
    this.mo.request(moNumber);
    this.postRequest();
  }
  public preRequest(): void {
    console.log("check if MO is created");
  }
  public postRequest(): void {
    console.log("MO created successfully");
  }
}

// Client
const batteryMo = new MoProxy();
batteryMo.request("B400500600");
/**
  check if MO is created
  creating MO B400500600
  MO created successfully
 */
