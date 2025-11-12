class DiContainer {
    constructor() {
        this.services = new Map();
    }
    
    register(name, instance) {
        this.services.set(name, instance);
    }
    
    get(name) {
        return this.services.get(name);
    }
}

export const diContainer = new DiContainer();