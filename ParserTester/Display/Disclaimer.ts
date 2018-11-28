import { loadPage } from "./Page";

export function disclaimerPopup() {
    const disclaimer = document.createElement("div");
    disclaimer.className = "disclaimer";
    disclaimer.innerHTML = "<h2>Parser Tester</h2><h4></h4><p>Disclaimer: </p>";
    document.body.appendChild(disclaimer);

    const ok = document.createElement("button");
    ok.textContent = "Accept";
    ok.className = "accordion";
    disclaimer.appendChild(ok);

    ok.addEventListener("click", loadPage);
}
