class DiContainer {
    constructor() {
        this.services = new Map();
    }
    
    register(name, instance) {
        this.services.set(name, instance);
    }
    
    delete(name) {
        if (this.services.get(name)) {
            this.services.delete(name);
        } else {
            console.log("Couldn't delete the service");
        }
    }
    
    get(name) {
        return this.services.get(name);
    }
}

export const diContainer = new DiContainer();