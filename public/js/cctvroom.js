window.onload = function() {
    const infowindow = document.getElementById('infowindow');
    const infowindowClose = document.getElementById('infowindow-close');
    const infowindowNama = document.getElementById('infowindow-nama');
    const infowindowContent = document.getElementById('infowindow-content');
    const infowindowButton = document.getElementById('infowindow-button');
  
    document.addEventListener('click', function(event) {
      const marker = event.target.closest('[id^="cctvroom-marker-"]');
      if (marker) {
        const nama = marker.dataset.nama;
        const content = marker.dataset.content;
        const url = marker.dataset.url;
  
        // update konten infowindow
        infowindowNama.textContent = nama;
        infowindowContent.textContent = content;
        infowindow.style.display = 'block';
  
        // update posisi infowindow
        const markerRect = marker.getBoundingClientRect();
        const infowindowHeight = infowindow.offsetHeight;
        const infowindowWidth = infowindow.offsetWidth;
        infowindow.style.top = `${window.scrollY + markerRect.top - infowindowHeight}px`;
        infowindow.style.left = `${window.scrollX + markerRect.left + markerRect.width / 2 - infowindowWidth / 2}px`;
        
        infowindowButton.onclick = () => {
            window.location.href = `/cctvnormal?url=${encodeURIComponent(url)}`;
        };
    } else if (infowindow) {
        // hide infowindow saat klik di luar marker
        infowindow.style.display = 'none';
      }
    });
  
    // Hideinfowindow saat tombol close diklik
    if (infowindowClose) {
      infowindowClose.addEventListener('click', function(event) {
        event.stopPropagation();
        if (infowindow) {
          infowindow.style.display = 'none';
        }
      });
    }

  }