class DiContainer {
    constructor() {
        this.services = new Map();
    }
    
    register(key, {type, value}) {
        this.services.set(key, {type, value});
    }

    filterByType(type) {
        return [...this.services]
            .filter(([key, service]) => service.type === type)
            .map(([key, service]) => ({ key, ...service }));
    }

    clearModals() {
        const modals = this.filterByType("modal");
        modals.forEach(i => {
            this.delete(i.key);
        })
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