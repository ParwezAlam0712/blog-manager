const notificationBtn =
    document.getElementById("notificationBtn");

const notificationPanel =
    document.getElementById("notificationPanel");

notificationBtn?.addEventListener("click", () => {

    notificationPanel.classList.toggle("active");

});