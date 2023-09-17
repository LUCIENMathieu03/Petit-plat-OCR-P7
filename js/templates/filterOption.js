export default class filterOption {
    constructor() {}

    getOption(filterOption) {
        const li = document.createElement("li");
        li.classList.add("px-[10px]", "py-[7px]", "hover:bg-[#FFD15B]");
        li.innerHTML = filterOption;
        return li;
    }
}
