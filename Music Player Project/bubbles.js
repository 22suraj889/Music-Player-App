function create_bubbles() {
    const main_container = document.querySelector(".main_container");
    const create_element = document.createElement('span');
    let size = Math.random() * 60;

    create_element.style.width = 20 + size + "px";
    create_element.style.height = 20 + size + "px";
    create_element.style.left = Math.random() * innerWidth + "px";
    create_element.style.boxShadow = `inset 0 0 10px ${random_bubbles_color()}`;
    main_container.appendChild(create_element);
    setTimeout(() => {
        create_element.remove();
    }, 4000);

}

function random_bubbles_color() {
    let random_color = ["#c2ff3d", "#ff3de8", "#3dc2ff", "#04e022", "#bc83e6", "#ebb328", "red"];
    return random_color[Math.floor(Math.random() * random_color.length)];
}
setInterval(create_bubbles, 100);