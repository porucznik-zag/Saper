class Box {
    constructor(){
        this.id = 0;
        this.x = 0;
        this.y = 0;

        this.isBomb = false;
        this.isFlaged = false;
        this.isVisible = false;
        this.isChecked = false;
        this.isNeighbour = false;
        this.bombAround = 0;
        this.isLock = false;
    }  

    generateBomb(){
        const box = document.createElement("div");
        const firstLayer = document.createElement("div");
        const secondLayer = document.createElement("div");

        box.classList.add("box");
        box.setAttribute("id",`box-${this.id}`);

        firstLayer.classList.add("box-first-layer");
        // firstLayer.textContent = this.id;
        firstLayer.addEventListener("mouseup", boxClicked);

        secondLayer.classList.add("box-second-layer");

        if(this.isBomb == false){
            if(this.bombAround > 0){
                secondLayer.textContent = this.bombAround;
            }
        }

        this.isBomb == false ? secondLayer.classList.add("not-bomb") : secondLayer.classList.add("bomb");

        box.appendChild(firstLayer);
        box.appendChild(secondLayer);

        return box;
    }
}