export default class filterOption {
    constructor() {}

    getOption(filterOption, category) {
        const li = document.createElement("li");
        li.classList.add(
            "px-[10px]",
            "py-[7px]",
            "hover:bg-[#FFD15B]",
            "cursor-pointer",
            category
        );
        li.setAttribute("id", filterOption);
        li.setAttribute("tabindex", 0);
        li.innerHTML = filterOption;
        return li;
    }

    getSelectedOption(selectedFilterOption) {
        const div = document.createElement("div");
        const p = document.createElement("p");
        const button = document.createElement("button");
        const i = document.createElement("i");

        div.classList.add(
            "filtersResult_item",
            "flex",
            "items-center",
            "px-[10px]",
            "py-[17px]",
            "sm:px-[16px]",
            "bg-[#FFD15B]",
            "w-fit",
            "rounded-[11px]",
            "mx-[5px]",
            "mb-[5px]"
        );
        p.classList.add("mr-[10px]", "md:mr-[60px]");
        i.classList.add("fa-solid", "fa-xmark");

        p.innerText = selectedFilterOption;

        button.appendChild(i);
        div.appendChild(p);
        div.appendChild(button);

        return div;
    }
}
