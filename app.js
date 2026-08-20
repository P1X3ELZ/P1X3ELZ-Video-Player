// Multi-Instance Fallback Download Handler
    document.getElementById("btn-download").addEventListener("click", async () => {
        if (!activeVideoId) return;

        const downloadBtn = document.getElementById("btn-download");
        const quality = document.getElementById("download-quality").value;
        const videoUrl = `https://www.youtube.com/watch?v=${activeVideoId}`;

        // List of reliable public Cobalt API instances
        const cobaltInstances = [
            "https://api.cobalt.tools",
            "https://cobalt-api.kavin.rocks",
            "https://co.wuk.sh"
        ];

        downloadBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Processing...`;

        const requestBody = {
            url: videoUrl,
            videoQuality: quality === "audio" ? "1080" : quality,
            downloadMode: quality === "audio" ? "audio" : "auto"
        };

        let success = false;

        for (const instance of cobaltInstances) {
            try {
                const response = await fetch(`${instance}/`, {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(requestBody)
                });

                const data = await response.json();

                if (data.url) {
                    window.open(data.url, "_blank");
                    success = true;
                    break;
                }
            } catch (error) {
                // Try next instance if current one fails or blocks CORS
                continue;
            }
        }

        if (!success) {
            // Fallback direct web link if API endpoints are completely unresponsive
            window.open(`https://cobalt.tools/#${encodeURIComponent(videoUrl)}`, "_blank");
        }

        downloadBtn.innerHTML = `<i class="fa-solid fa-download"></i> Download`;
    });
