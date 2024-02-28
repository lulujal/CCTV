// coding untuk pagination dan search table cctv(outodoor)
document.addEventListener('DOMContentLoaded', function() {
    const entriesSelect = document.getElementById('entries');
    const paginationUl = document.getElementById('pagination');
    paginationUl.style.zIndex = '1';
    paginationUl.style.position = 'static';
  
    entriesSelect.addEventListener('change', function() {
      fetch('/cctv')
        .then(response => response.json())
        .then(data => {
          const numPages = Math.ceil(data.length / this.value);
          paginationUl.innerHTML = ''; // Clear the pagination div
  
          const prevLi = document.createElement('li');
          prevLi.className = 'page-link';
          prevLi.textContent = 'Previous';
          prevLi.addEventListener('click', function() {
            const currentPage = parseInt(paginationUl.querySelector('.active').textContent);
            if (currentPage > 1) {
              paginationUl.children[currentPage - 1].click();
            }
          });
          paginationUl.appendChild(prevLi);
  
          for (let i = 1; i <= numPages; i++) {
            const li = document.createElement('li');
            li.className = 'page-link';
            li.textContent = i;
            li.addEventListener('click', function() {
              updateTable(data.slice((i - 1) * entriesSelect.value, i * entriesSelect.value));
              paginationUl.querySelector('.active').classList.remove('active');
              this.classList.add('active');
            });
            paginationUl.appendChild(li);
          }
  
          const nextLi = document.createElement('li');
          nextLi.className = 'page-link';
          nextLi.textContent = 'Next';
          nextLi.addEventListener('click', function() {
            const currentPage = parseInt(paginationUl.querySelector('.active').textContent);
            if (currentPage < numPages) {
              paginationUl.children[currentPage + 1].click();
            }
          });
          paginationUl.appendChild(nextLi);
  
          paginationUl.children[1].classList.add('active');
          updateTable(data.slice(0, this.value)); // Update the table with the first page
        });
    });
  
    function updateTable(data) {
      const tablebody = document.querySelector('#cctv-tbody');
      let newTableBody = '';
      data.forEach(cctv => {
        newTableBody += `
          <tr>
            <td class="id">${cctv.id}</td>
            <td class="content">${cctv.content}</td>
            <td class="nama">${cctv.nama}</td>
            <td class="type">${cctv.type}</td>
            <td class="url">${cctv.url}</td>
            <td class="lat">${cctv.lat}</td>
            <td class="lng">${cctv.lng}</td>
            <td>
            <div class="d-flex justify-content-around">
            <a class="btn btn-success btn-sm edit-button" data-bs-toggle="modal" data-bs-target="#editCctvModal" style="margin-right:5px;" >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
              </svg>
            </a>
            <a class="btn btn-danger btn-sm delete-button" data-bs-toggle="modal" data-bs-target="#deleteCctvModal" style="margin-right:5px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
              </svg>
            </a>
              </form>
              </div>
            </td>
          </tr>
        `;
      });
      tablebody.innerHTML = newTableBody;
    }
  
    entriesSelect.dispatchEvent(new Event('change')); // Trigger the change event to populate the table initially
    document.getElementById('search-cctv').addEventListener('input', function(e) {
        var input = e.target;
        var filter = input.value.toUpperCase();
        var tbody = document.getElementById('cctv-tbody');
        var trs = tbody.getElementsByTagName('tr');
      
        for (var i = 0; i < trs.length; i++) {
          var tds = trs[i].getElementsByTagName('td');
          var found = false;
          for (var j = 0; j < tds.length; j++) {
            var cellContent = tds[j].textContent || tds[j].innerText;
            if (cellContent.toUpperCase().indexOf(filter) > -1) {
              found = true;
              break;
            }
          }
          trs[i].style.display = found ? '' : 'none';
        }
      });
  });

// kode untuk add cctv(outdoor)
document.getElementById('addCctvButton').addEventListener('click', function() {
  $('#mapModal').modal('show');
});
document.getElementById('addCctvForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    var content = document.getElementById('content').value;
    var nama = document.getElementById('nama').value;
    var type = document.getElementById('type').value;
    var url = document.getElementById('url').value;
    var lat = document.getElementById('lat').value;
    var lng = document.getElementById('lng').value;
  
    var data = {
      content: content,
      nama: nama,
      type: type,
      url: url,
      lat: lat,
      lng: lng
    };
  
    fetch('/cctv', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      alert('Data successfully submitted');
      var myModalEl = document.getElementById('addCctvModal');
      var modal = bootstrap.Modal.getInstance(myModalEl);
      modal.hide();
      location.reload();
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('An error occurred');
    });
  });

//   kode untuk edit cctv(outdoor)
document.querySelector('#cctv-tbody').addEventListener('click', function(e) {
    var editButton = e.target.closest('.edit-button');
    if (editButton) {
        console.log('edit button clicked');
      var row = editButton.closest('tr');
      var id = row.querySelector('.id').textContent;
      var content = row.querySelector('.content').textContent;
      var nama = row.querySelector('.nama').textContent;
      var type = row.querySelector('.type').textContent;
      var url = row.querySelector('.url').textContent;
      var lat = row.querySelector('.lat').textContent;
      var lng = row.querySelector('.lng').textContent;
  
      document.getElementById('edit-id').value = id;
      document.getElementById('edit-content').value = content;
      document.getElementById('edit-nama').value = nama;
      document.getElementById('edit-type').value = type;
      document.getElementById('edit-url').value = url;
      document.getElementById('edit-lat').value = lat;
      document.getElementById('edit-lng').value = lng;
    }
  });

document.getElementById('editCctvForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    var id = document.getElementById('edit-id').value;
    var content = document.getElementById('edit-content').value;
    var nama = document.getElementById('edit-nama').value;
    var type = document.getElementById('edit-type').value;
    var url = document.getElementById('edit-url').value;
    var lat = document.getElementById('edit-lat').value;
    var lng = document.getElementById('edit-lng').value;
  
    var data = {
      content: content,
      nama: nama,
      type: type,
      url: url,
      lat: lat,
      lng: lng
    };
  
    fetch('/cctv/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      alert('Data successfully updated');
      var myModalEl = document.getElementById('editCctvModal');
      var modal = bootstrap.Modal.getInstance(myModalEl);
      modal.hide();
      location.reload();
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('An error occurred');
    });
  });

//   kode untuk delete cctv(outdoor)
document.querySelector('#cctv-tbody').addEventListener('click', function(e) {
    var deleteButton = e.target.closest('.delete-button');
    if (deleteButton) {
      var row = deleteButton.closest('tr');
      var id = row.querySelector('.id').textContent;
      document.getElementById('delete-id').value = id;
    }
  });

document.getElementById('deleteCctvForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    var id = document.getElementById('delete-id').value;
  
    fetch('/cctv/' + id, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      alert('Data successfully deleted');
      var myModalEl = document.getElementById('deleteCctvModal');
      var modal = bootstrap.Modal.getInstance(myModalEl);
      modal.hide();
      location.reload();
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('An error occurred');
    });
  });

  // kode untuk geocoding lokasi cctv
  let map
  let marker

  function initMap() {
    const initialPosition = {  lat:  -7.049756, lng: 110.396445 }
    map = new google.maps.Map(document.getElementById('mapModalBody'), {
      center: initialPosition,
      zoom: 16,
    })
    let area = [
        {lng: 110.3897028, lat: -7.0480879},
        {lng: 110.3894307, lat: -7.0486949},
        {lng: 110.3894629, lat: -7.0494717},
        {lng: 110.3894629, lat: -7.0500676},
        {lng: 110.3899459, lat: -7.0504826},
        {lng: 110.3905609, lat: -7.0508049},
        {lng: 110.3906231, lat: -7.0509801},
        {lng: 110.3906212, lat: -7.0512351},
        {lng: 110.3906385, lat: -7.0514444},
        {lng: 110.3906447, lat: -7.0517338},
        {lng: 110.3907174, lat: -7.0521066},
        {lng: 110.3910354, lat: -7.0524522},
        {lng: 110.3911246, lat: -7.0525770},
        {lng: 110.3911525, lat: -7.0526481},
        {lng: 110.3910314, lat: -7.0529170},
        {lng: 110.3908509, lat: -7.0531674},
        {lng: 110.3907838, lat: -7.0534267},
        {lng: 110.3909210, lat: -7.0536985},
        {lng: 110.3917732, lat: -7.0536679},
        {lng: 110.3920965, lat: -7.0535307},
        {lng: 110.3923935, lat: -7.0533421},
        {lng: 110.3925521, lat: -7.0529202},
        {lng: 110.3924919, lat: -7.0523212},
        {lng: 110.3926487, lat: -7.0521300},
        {lng: 110.3931767, lat: -7.0520680},
        {lng: 110.3934625, lat: -7.0514680},
        {lng: 110.3939396, lat: -7.0517278},
        {lng: 110.3940829, lat: -7.0517910},
        {lng: 110.3944643, lat: -7.0518149},
        {lng: 110.3946198, lat: -7.0518011},
        {lng: 110.3947459, lat: -7.0516433},
        {lng: 110.3947009, lat: -7.0508550},
        {lng: 110.3948288, lat: -7.0505781},
        {lng: 110.3949317, lat: -7.0504662},
        {lng: 110.3953330, lat: -7.0493320},
        {lng: 110.3956154, lat: -7.0494161},
        {lng: 110.3954051, lat: -7.0503978},
        {lng: 110.3955415, lat: -7.0504114},
        {lng: 110.3956742, lat: -7.0503874},
        {lng: 110.3958298, lat: -7.0503790},
        {lng: 110.3958072, lat: -7.0501141},
        {lng: 110.3961393, lat: -7.0502485},
        {lng: 110.3962466, lat: -7.0505677},
        {lng: 110.3970089, lat: -7.0505771},
        {lng: 110.3970841, lat: -7.0509496},
        {lng: 110.3978784, lat: -7.0510134},
        {lng: 110.3981789, lat: -7.0513007},
        {lng: 110.3987371, lat: -7.0518966},
        {lng: 110.3988981, lat: -7.0520030},
        {lng: 110.3988444, lat: -7.0523967},
        {lng: 110.3988551, lat: -7.0526946},
        {lng: 110.3990240, lat: -7.0530672},
        {lng: 110.3992262, lat: -7.0530959},
        {lng: 110.3993207, lat: -7.0531183},
        {lng: 110.3994146, lat: -7.0531327},
        {lng: 110.3994920, lat: -7.0531365},
        {lng: 110.3995054, lat: -7.0532654},
        {lng: 110.3995494, lat: -7.0534032},
        {lng: 110.3998342, lat: -7.0535247},
        {lng: 110.4002493, lat: -7.0535594},
        {lng: 110.4008009, lat: -7.0533154},
        {lng: 110.4013334, lat: -7.0530167},
        {lng: 110.4016769, lat: -7.0522187},
        {lng: 110.4019410, lat: -7.0522631},
        {lng: 110.4021664, lat: -7.0526568},
        {lng: 110.4032290, lat: -7.0531995},
        {lng: 110.4036261, lat: -7.0532740},
        {lng: 110.4038735, lat: -7.0533509},
        {lng: 110.4042538, lat: -7.0527118},
        {lng: 110.4046136, lat: -7.0519971},
        {lng: 110.4041521, lat: -7.0519758},
        {lng: 110.4037335, lat: -7.0518481},
        {lng: 110.4029821, lat: -7.0511139},
        {lng: 110.4022415, lat: -7.0505713},
        {lng: 110.4014150, lat: -7.0498796},
        {lng: 110.4010428, lat: -7.0494126},
        {lng: 110.4006993, lat: -7.0490242},
        {lng: 110.4001626, lat: -7.0484603},
        {lng: 110.4000606, lat: -7.0484177},
        {lng: 110.3998406, lat: -7.0487582},
        {lng: 110.3995240, lat: -7.0483804},
        {lng: 110.3987833, lat: -7.0481197},
        {lng: 110.3971591, lat: -7.0473781},
        {lng: 110.3970723, lat: -7.0473130},
        {lng: 110.3968756, lat: -7.0473498},
        {lng: 110.3965834, lat: -7.0474162},
        {lng: 110.3965011, lat: -7.0475231},
        {lng: 110.3964468, lat: -7.0476051},
        {lng: 110.3962099, lat: -7.0475699},
        {lng: 110.3960728, lat: -7.0476263},
        {lng: 110.3960599, lat: -7.0477979},
        {lng: 110.3960564, lat: -7.0479132},
        {lng: 110.3959796, lat: -7.0480148},
        {lng: 110.3958800, lat: -7.0482129},
        {lng: 110.3956780, lat: -7.0483191},
        {lng: 110.3952335, lat: -7.0483224},
        {lng: 110.3951512, lat: -7.0483095},
        {lng: 110.3951029, lat: -7.0483123},
        {lng: 110.3949435, lat: -7.0480419},
        {lng: 110.3949583, lat: -7.0480251},
        {lng: 110.3949361, lat: -7.0480043},
        {lng: 110.3949031, lat: -7.0479262},
        {lng: 110.3948290, lat: -7.0476512},
        {lng: 110.3947426, lat: -7.0473481},
        {lng: 110.3942834, lat: -7.0471648},
        {lng: 110.3940014, lat: -7.0470567},
        {lng: 110.3939221, lat: -7.0470157},
        {lng: 110.3938988, lat: -7.0467651},
        {lng: 110.3938941, lat: -7.0464715},
        {lng: 110.3932501, lat: -7.0465725},
        {lng: 110.3929334, lat: -7.0465938},
        {lng: 110.3926865, lat: -7.0466311},
        {lng: 110.3926122, lat: -7.0467545},
        {lng: 110.3926122, lat: -7.0470099},
        {lng: 110.3926336, lat: -7.0474143},
        {lng: 110.3926283, lat: -7.0478612},
        {lng: 110.3925263, lat: -7.0481166},
        {lng: 110.3922842, lat: -7.0482244},
        {lng: 110.3919091, lat: -7.0482868},
        {lng: 110.3915687, lat: -7.0482850},
        {lng: 110.3912655, lat: -7.0481801},
        {lng: 110.3909328, lat: -7.0481695},
        {lng: 110.3903478, lat: -7.0481322},
        {lng: 110.3900365, lat: -7.0480524},
        {lng: 110.3898701, lat: -7.0479673},
        {lng: 110.3897758, lat: -7.0479384},
        {lng: 110.3897085, lat: -7.0480829},
        {lng: 110.3897028, lat: -7.0480879}
    ]

    let polygon = new google.maps.Polygon({
        paths: area,
        strokeColor: "#0000FF",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#0000FF",
        fillOpacity: 0.1,
    });
    // menampilkan area unnes
    polygon.setMap(map);
    // Add a click event listener to the polygon
google.maps.event.addListener(polygon, 'click', function(event) {
  placeMarker(event.latLng);
});

function placeMarker(location) {
  if (marker) {
    marker.setMap(null);
  }
  marker = new google.maps.Marker({
    position: location,
    map: map
  });
}

    map.addListener('click', (e) => {
      placeMarkerAndPanTo(e.latLng, map)
    })
  }

  $('#mapModal').on('shown.bs.modal', function (e) {
    initMap();
  });

function placeMarkerAndPanTo(latLng, map) {
  if (marker) {
    marker.setMap(null);
  }
  marker = new google.maps.Marker({
    position: latLng,
    map: map,
  });
}

  document.getElementById('saveLocation').addEventListener('click', function() {
    if (marker) {
      const position = marker.getPosition();
      document.getElementById('lat').value = position.lat();
      document.getElementById('lng').value = position.lng();
    }
    $('#mapModal').modal('hide');
    $('#addCctvModal').modal('show');
  });
