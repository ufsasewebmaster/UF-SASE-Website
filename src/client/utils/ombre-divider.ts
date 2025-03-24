export function applyOmbreDivider(): void {
  const style = document.createElement("style");
  style.innerHTML = `
      .ombre-divider {
        width: 100%;
        height: 4px; 
        background: linear-gradient(to right, rgba(255, 255, 255, 0), #5DBB46, #1E78C5, rgba(255, 255, 255, 0)); 
        margin: 20px 0; 
        border: none;
}
  `;
  document.head.appendChild(style);

  document.querySelectorAll("hr").forEach((divider) => {
    const newDivider = document.createElement("div");
    newDivider.classList.add("ombre-divider");
    divider.replaceWith(newDivider);
  });
}
