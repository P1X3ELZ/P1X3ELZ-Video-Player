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
        return (match && match[2].length === 11) ? match[2] : null;
    }

    function loadVideoToPlayer(videoId) {
        activeVideoId = videoId;
        const playerFrame = document.getElementById("main-player-frame");
        playerFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        
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

    document.getElementById("btn-yt-search").addEventListener("click", () => {
        const query = document.getElementById("yt-search-query").value.trim();
        const detectedId = parseYouTubeID(query);

        if (detectedId) {
            showActionBar(detectedId);
        } else if (query) {
            const browserFrame = document.getElementById("youtube-browser-frame");
            browserFrame.src = `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(query)}`;
            showActionBar(null);
        }
    });

    function showActionBar(videoId) {
        const actionBar = document.getElementById("browser-action-bar");
        if (videoId) {
            activeVideoId = videoId;
            actionBar.style.display = "flex";
            document.getElementById("detected-video-title").textContent = `Ready to import Video ID: ${videoId}`;
        } else {
            actionBar.style.display = "none";
        }
    }

    document.getElementById("btn-import-detected").addEventListener("click", () => {
        if (activeVideoId) {
            loadVideoToPlayer(activeVideoId);
        }
    });

    document.getElementById("btn-download-options").addEventListener("click", () => {
        if (!activeVideoId) return;
        const downloadUrl = `https://www.y2mate.com/youtube/${activeVideoId}`;
        window.open(downloadUrl, "_blank");
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
