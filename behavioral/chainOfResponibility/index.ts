// Handler
abstract class Boss {
  private superior?: Boss;
  private name: string;

  constructor(name: string) {
    this.name = name;
  }
  public setSuperior(superior: Boss) {
    this.superior = superior;
  }
  public getSuperior() {
    return this.superior;
  }
  public approve(days: number) {
    console.log(`${this.name} approved your ${days} days off`);
  }
  public reject() {
    console.log("You have been rejected");
  }
  public abstract handleRequest(days: number): void;
}

// ConcreteHandler
class TeamLeader extends Boss {
  public handleRequest(days: number): void {
    if (days < 3) {
      this.approve(days);
    } else if (this.getSuperior()) {
      this.getSuperior()?.handleRequest(days);
    } else {
      this.reject();
    }
  }
}
class DeptManager extends Boss {
  public handleRequest(days: number): void {
    if (days < 5) {
      this.approve(days);
    } else if (this.getSuperior()) {
      this.getSuperior()?.handleRequest(days);
    } else {
      this.reject();
    }
  }
}
class HrManager extends Boss {
  public handleRequest(days: number): void {
    if (days < 7) {
      this.approve(days);
    } else if (this.getSuperior()) {
      this.getSuperior()?.handleRequest(days);
    } else {
      this.reject();
    }
  }
}

// Client
const applyDayOff = (days: number) => {
  const teamLeader = new TeamLeader("Serge");
  const deptManager = new DeptManager("Jovi");
  const hrManager = new HrManager("Amy");

  teamLeader.setSuperior(deptManager);
  deptManager.setSuperior(hrManager);
  teamLeader.handleRequest(days);
};

applyDayOff(2);
applyDayOff(4);
applyDayOff(6);
applyDayOff(8);
/**
Serge approved your 2 days off
Jovi approved your 4 days off
Amy approved your 6 days off
You have been rejected
 */
