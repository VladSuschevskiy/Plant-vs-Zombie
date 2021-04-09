document.addEventListener('DOMContentLoaded', () => {
    let currentZombieIndex = 0;
    let zombie;
    let zombieHp;
    let zombieIcon;
    let zombiesList;
    let status = document.createElement("div");
    status.classList.add("img__win");
    status.innerText = "YOU WIN!!!"
    

    const createZombie = () => {
        if (currentZombieIndex > zombies.length - 1) {
            zombiesList.append(status);
        } else {
            zombie = new Zombie();
            zombie.render();

        }
    }

    function Zombie() {
        this.type = zombies[currentZombieIndex].type;
        this.health = zombies[currentZombieIndex].health;
        this.currentHealth = zombies[currentZombieIndex].health;
        

        this.hitDamage = () => {
            this.currentHealth =  this.currentHealth - HIT_DAMAGE;
            this.updateHealth();
        };

        this.render =  () => {
            zombiesList = document.querySelector(".zombies");

            zombie = document.createElement("div");
            zombie.classList.add("zombie");

            const zombieProgress = document.createElement("div");
            zombieProgress.classList.add("zombie__progress");

            zombieHp = document.createElement("div");
            zombieHp.classList.add("zombie__hp");
            zombieHp.style.width = "100%";

            zombieIcon = document.createElement("div");
            zombieIcon.classList.add("zombie__icon");

            zombiesList.append(zombie)
            zombie.append(zombieProgress)
            zombieProgress.append(zombieHp)
            zombie.append(zombieIcon)

            zombie.addEventListener("click", () => {
                this.hitDamage();
            });

            if (zombies[currentZombieIndex].type === ZOMBIE_TYPE.SMALL) {
                zombieIcon.classList.add("zombies__small"); 
            } else if (zombies[currentZombieIndex].type === ZOMBIE_TYPE.MAD) {
                zombieIcon.classList.add("zombies__mad");
            } else if (zombies[currentZombieIndex].type === ZOMBIE_TYPE.STRONG) {
                zombieIcon.classList.add("zombies__strong");
            }
        };

        this.updateHealth = () => {
            if (this.currentHealth <= 0) {
                zombieHp.style.width = 0;
                zombieIcon.classList.add("zombies__dead");

                setTimeout(() => {
                    zombiesList.removeChild(zombie);
                    currentZombieIndex++;
                    createZombie();
                    if(currentZombieIndex <= zombies.length - 1){
                        changeStatus();
                    } 
                }, 1000)
            } else {
                zombieHp.style.width = this.currentHealth / this.health * 100 + "%";
            }
        };
    };
    createZombie();

    // let currentZombieStatus = document.querySelector(".zombies-status__current");
    // let totalZombieStatus = document.querySelector(".zombies-status__total");

    // totalZombieStatus.innerHTML = zombies.length;
    // if(zombies[currentZombieIndex].Index++) {
        
    //     currentZombieIndex+1;
       
    //     currentZombieStatus = currentZombieIndex++;
    // }
    // currentZombieStatus.innerHTML = currentZombieIndex +1;

    // status = new ChangeStatus();
    
    function changeStatus() {
        let currentElement = document.querySelector('.zombies-status__current');
        let totalElement = document.querySelector('.zombies-status__total');
    
        totalElement.innerHTML = zombies.length;
        currentElement.innerHTML = currentZombieIndex + 1;
    };
    changeStatus();
});
