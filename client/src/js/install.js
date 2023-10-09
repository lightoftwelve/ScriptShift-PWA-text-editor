document.addEventListener("DOMContentLoaded", (event) => {
  const butInstall = document.getElementById("buttonInstall");

  const isStandalone =
    window.navigator.standalone ||
    (window.matchMedia &&
      window.matchMedia("(display-mode: standalone)").matches) ||
    document.referrer.includes("android-app://");

  if (isStandalone) {
    console.log("App is in standalone mode.");
    butInstall.style.visibility = "hidden";
  } else {
    console.log("App is not in standalone mode.");
  }

  // Check if the app is running in standalone mode or if the user previously dismissed the install prompt
  if (
    window.matchMedia("(display-mode: standalone)").matches ||
    localStorage.getItem("installPromptDismissed") === "true"
  ) {
    console.log(
      "Hiding install button due to standalone mode or dismissed prompt."
    );
    butInstall.style.visibility = "hidden";
  } else {
    console.log("Install button should be visible.");
  }
  console.log(
    "installPromptDismissed value:",
    localStorage.getItem("installPromptDismissed")
  );

  if (window.matchMedia("(display-mode: standalone)").matches) {
    console.log("App is in standalone mode.");
  } else {
    console.log("App is not in standalone mode.");
  }

  let deferredPrompt; // This variable will be used to keep the event for later use

  // Before install prompt logic
  window.addEventListener("beforeinstallprompt", (event) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    event.preventDefault();

    // Check if the user previously dismissed the install prompt
    if (localStorage.getItem("installPromptDismissed") === "true") {
      return;
    }

    // Stash the event so it can be triggered later.
    deferredPrompt = event;

    // Update the UI to notify the user they can add to the home screen
    butInstall.style.display = "block";
  });

  // Click event on the install button
  butInstall.addEventListener("click", async () => {
    // Hide the user interface that shows the A2HS (add to homescreen) button
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
  });

  // Handler for the appinstalled event
  window.addEventListener("appinstalled", (event) => {
    console.log("👍", "appinstalled", event);

    // Display the Thank You modal
    const modal = document.getElementById("thankYouModal");
    modal.style.display = "block";

    // Close the modal when the X is clicked
    document.getElementById("closeModal").onclick = function () {
      modal.style.display = "none";
    };
  });
});

// Starter Code:
// const butInstall = document.getElementById('buttonInstall');
// window.addEventListener('beforeinstallprompt', (event) => {});
// butInstall.addEventListener('click', async () => {});
// window.addEventListener('appinstalled', (event) => {});
