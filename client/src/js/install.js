document.addEventListener("DOMContentLoaded", (event) => {
  const butInstall = document.getElementById("buttonInstall");

  // Function to determine if app is in standalone mode
  const isStandalone = () => {
    return (
      window.navigator.standalone ||
      (window.matchMedia &&
        window.matchMedia("(display-mode: standalone)").matches) ||
      document.referrer.includes("android-app://")
    );
  };

  // Logic to decide install button visibility
  if (
    isStandalone() ||
    localStorage.getItem("installPromptDismissed") === "true"
  ) {
    butInstall.style.visibility = "hidden";
    console.log(
      "Hiding install button due to standalone mode or dismissed prompt."
    );
  } else {
    console.log("Install button should be visible.");
  }

  console.log(
    "installPromptDismissed value:",
    localStorage.getItem("installPromptDismissed")
  );

  // Variable to keep the event for later use
  let deferredPrompt;

  // Handler for 'beforeinstallprompt' event
  const handleBeforeInstallPrompt = (event) => {
    event.preventDefault();

    if (localStorage.getItem("installPromptDismissed") === "true") {
      return;
    }

    deferredPrompt = event;
    butInstall.style.display = "block";
  };

  // Handler for install button click event
  const handleInstallButtonClick = async () => {
    butInstall.style.display = "none";

    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
          localStorage.setItem("installPromptDismissed", "true");
        } else {
          console.log("User dismissed the install prompt");
        }

        deferredPrompt = null;
      });
    }
  };

  // Handler for 'appinstalled' event
  const handleAppInstalled = (event) => {
    console.log("👍", "appinstalled", event);

    const modal = document.getElementById("thankYouModal");
    modal.style.display = "block";

    document.getElementById("closeModal").onclick = function () {
      modal.style.display = "none";
    };
  };

  // Setting up the listeners
  window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  butInstall.addEventListener("click", handleInstallButtonClick);
  window.addEventListener("appinstalled", handleAppInstalled);
});

// Starter Code:
// const butInstall = document.getElementById('buttonInstall');
// window.addEventListener('beforeinstallprompt', (event) => {});
// butInstall.addEventListener('click', async () => {});
// window.addEventListener('appinstalled', (event) => {});
