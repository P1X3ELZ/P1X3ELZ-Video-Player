document.addEventListener("DOMContentLoaded", () => {
    let activeVideoId = null;
    let savedLibrary = JSON.parse(localStorage.getItem("p1x3elz_library")) || [];

    const navButtons = document.querySelectorAll(".nav-btn");
    const views = document.querySelectorAll(".view-panel");

    navButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetView = btn.id.replace("tab-", "view-");
            
            navButtons.forEach(b => b.classList.remove("active"));
            views.forEach(v => v.classList.remove("active"));

            btn.classList.add("active");
            document.getElementById(targetView).classList.add("active");
        });
    });

    function parseYouTubeID(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        if (match && match[2].length === 11) {
            return match[2];
        }
        if (url.length === 11 && !url.includes(" ")) {
            return url;
        }
        return null;
    }

    function loadVideoToPlayer(videoId) {
        activeVideoId = videoId;
        const playerFrame = document.getElementById("main-player-frame");
        playerFrame.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`;
        
        document.getElementById("player-video-title").textContent = `P1X3ELZ Video Player Stream - ID: ${videoId}`;

        document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".view-panel").forEach(v => v.classList.remove("active"));

        document.getElementById("view-player").classList.add("active");
    }

    document.getElementById("btn-load-link").addEventListener("click", () => {
        const inputVal = document.getElementById("youtube-url-input").value.trim();
        const videoId = parseYouTubeID(inputVal);

        if (videoId) {
            loadVideoToPlayer(videoId);
        } else {
            alert("Please enter a valid YouTube URL or Video ID.");
        }
    });

    // Direct, Ad-Free Download via Cobalt API
    document.getElementById("btn-download").addEventListener("click", async () => {
        if (!activeVideoId) return;

        const downloadBtn = document.getElementById("btn-download");
        const quality = document.getElementById("download-quality").value;
        const videoUrl = `https://www.youtube.com/watch?v=${activeVideoId}`;

        downloadBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Processing...`;

        try {
            const response = await fetch("https://api.cobalt.tools/api/json", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    url: videoUrl,
                    vQuality: quality === "audio" ? "720" : quality,
                    isAudioOnly: quality === "audio"
                })
            });

            const data = await response.json();

            if (data.url) {
                window.open(data.url, "_blank");
            } else {
                alert("Could not generate direct download link. Try another quality.");
            }
        } catch (error) {
            alert("Download service busy. Please try again.");
        } finally {
            downloadBtn.innerHTML = `<i class="fa-solid fa-download"></i> Download`;
        }
    });

    document.getElementById("btn-save-library").addEventListener("click", () => {
        if (!activeVideoId) return;

        if (!savedLibrary.includes(activeVideoId)) {
            savedLibrary.push(activeVideoId);
            localStorage.setItem("p1x3elz_library", JSON.stringify(savedLibrary));
            renderLibrary();
            alert("Saved to P1X3ELZ Video Player Library!");
        } else {
            alert("Video already in your library.");
        }
    });

    function renderLibrary() {
        const container = document.getElementById("library-items");
        container.innerHTML = "";

        if (savedLibrary.length === 0) {
            container.innerHTML = `<p class="empty-msg">No imported videos yet.</p>`;
            return;
        }

        savedLibrary.forEach(id => {
            const card = document.createElement("div");
            card.className = "library-card";
            card.innerHTML = `
                <img src="https://img.youtube.com/vi/${id}/mqdefault.jpg" alt="Thumbnail">
                <h4>Video ID: ${id}</h4>
            `;
            card.addEventListener("click", () => loadVideoToPlayer(id));
            container.appendChild(card);
        });
    }

    renderLibrary();
});
