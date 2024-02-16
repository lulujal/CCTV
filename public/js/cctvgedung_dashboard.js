// coding untuk pagination dan search table cctv(outodoor)
document.addEventListener("DOMContentLoaded", function () {
  const entriesSelect = document.getElementById("entries");
  const paginationUl = document.getElementById("pagination");

  entriesSelect.addEventListener("change", function () {
    fetch("/cctvgedung")
      .then((response) => response.json())
      .then((data) => {
        const numPages = Math.ceil(data.length / this.value);
        paginationUl.innerHTML = ""; // Clear the pagination div

        const prevLi = document.createElement("li");
        prevLi.className = "page-link";
        prevLi.textContent = "Previous";
        prevLi.addEventListener("click", function () {
          const currentPage = parseInt(
            paginationUl.querySelector(".active").textContent
          );
          if (currentPage > 1) {
            paginationUl.children[currentPage - 1].click();
          }
        });
        paginationUl.appendChild(prevLi);

        for (let i = 1; i <= numPages; i++) {
          const li = document.createElement("li");
          li.className = "page-link";
          li.textContent = i;
          li.addEventListener("click", function () {
            updateTable(
              data.slice((i - 1) * entriesSelect.value, i * entriesSelect.value)
            );
            paginationUl.querySelector(".active").classList.remove("active");
            this.classList.add("active");
          });
          paginationUl.appendChild(li);
        }

        const nextLi = document.createElement("li");
        nextLi.className = "page-link";
        nextLi.textContent = "Next";
        nextLi.addEventListener("click", function () {
          const currentPage = parseInt(
            paginationUl.querySelector(".active").textContent
          );
          if (currentPage < numPages) {
            paginationUl.children[currentPage + 1].click();
          }
        });
        paginationUl.appendChild(nextLi);

        paginationUl.children[1].classList.add("active");
        updateTable(data.slice(0, this.value)); // Update the table with the first page
      });
  });

  function updateTable(data) {
    const tablebody = document.querySelector("#denah-tbody");
    let newTableBody = "";
    data.forEach((denah) => {
      newTableBody += `
      <tr cctv-id="${denah.CctvId}" data-url1="${denah.url1}" data-url2="${denah.url2}" data-url3="${denah.url3}" data-url4="${denah.url4}" data-url5="${denah.url5}" data-url6="${denah.url6}">
            <td class="id">${denah.id}</td>
            <td class="nama">${denah.nama_gedung}</td>
            <td class="cctv-id">${denah.CctvId}</td>
            <td class="url1">${denah.url1}</td>
            <td class="url2">${denah.url2}</td>
            <td class="url3">${denah.url3}</td>
            <td class="url4">${denah.url4}</td>
            <td class="url5">${denah.url5}</td>
            <td class="url6">${denah.url6}</td>
            <td>
            <div class="d-flex justify-content-around">
            <a class="btn btn-success btn-sm edit-button" data-bs-toggle="modal" data-bs-target="#editDenahModal" style="margin-right:5px;" >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
              </svg>
            </a>
            <a class="btn btn-danger btn-sm delete-button" data-bs-toggle="modal" data-bs-target="#deleteDenahModal" style="margin-right:5px;">
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

    // kode untuk menampilkan tabel cctv room
    var rows = tablebody.getElementsByTagName('tr');
    for (var i = 0; i < rows.length; i++) {
      
      // Add a click event listener to each row
      rows[i].addEventListener('click', function() {
        var cctvId = this.getAttribute('cctv-id');

        fetch(`/cctvroom/${cctvId}`)
        .then((response) => response.json())
        .then((data) => {
          var cctvRoomTable = `
          <div class="container-table" style="margin-top: 20px; margin: 10px; background-color:#EEEDED;">
          <!-- tabel -->
          <div style="text-align:end;">
          <a href="/cctvgedung/${cctvId}" class="btn btn-sm btn-primary" style="margin: 10px 10px -10px 0px; color:#fff;">Buka Denah Gedung</a>
          <button type="button" class="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#addCctvRoomModal" style="margin-top: 10px;margin-bottom: -10px;margin-right: 10px;margin: 10px 10px -10px 0px;">Tambah CCTV Ruangan</button>
          </div>
          <div class="table-responsive" >
              <table class="table table-striped table-hover" id="cctvRoomTable">
                  <thead>
                      <tr>
                          <th>Id</th>
                          <th>Content</th>
                          <th>Nama</th>
                          <th>URL</th>
                          <th>x</th>
                          <th>y</th>
                          <th>Lantai</th>
                          <th>CctvId</th>
                          <th>Aksi</th>
                      </tr>
                  </thead>
                  <tbody id="cctvRoom-tbody">
  
                  </tbody>
              </table>
          </div>
          `;

          document.getElementById('cctvroom-table').innerHTML = cctvRoomTable;
          var cctvRoomTbody = document.getElementById('cctvRoom-tbody');
          var newCctvRoomTbody = '';
          data.forEach((cctvRoom) => {
            newCctvRoomTbody += `
            <tr>
              <td class="CctvRoom-id">${cctvRoom.id}</td>
              <td class="CctvRoom-content">${cctvRoom.content}</td>
              <td class="CctvRoom-nama">${cctvRoom.nama}</td>
              <td class="CctvRoom-url">${cctvRoom.url}</td>
              <td class="CctvRoom-x">${cctvRoom.x}</td>
              <td class="CctvRoom-y">${cctvRoom.y}</td>
              <td class="CctvRoom-lantai">${cctvRoom.lantai}</td>
              <td class="CctvRoom-CctvId">${cctvRoom.CctvId}</td>
              <td>
                <div class="d-flex justify-content-around">
                  <a class="btn btn-success btn-sm editCctvRoom-button" data-bs-toggle="modal" data-bs-target="#editCctvRoomModal" style="margin-right:5px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1
                      -.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1
                      .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                    </svg>
                  </a>
                  <a class="btn btn-danger btn-sm deleteCctvRoom-button" data-bs-toggle="modal" data-bs-target="#deleteCctvRoomModal" style="margin-right:5px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                    </svg>
                  </a>
                </div>
              </td>
            </tr>
            `;
          });
          cctvRoomTbody.innerHTML = newCctvRoomTbody;
          editCctvRoom();
          deleteCctvRoom();
        });
      });
    }
  }

  entriesSelect.dispatchEvent(new Event("change")); // Trigger the change event to populate the table initially
  document
    .getElementById("search-denah")
    .addEventListener("input", function (e) {
      var input = e.target;
      var filter = input.value.toUpperCase();
      var tbody = document.getElementById("denah-tbody");
      var trs = tbody.getElementsByTagName("tr");

      for (var i = 0; i < trs.length; i++) {
        var tds = trs[i].getElementsByTagName("td");
        var found = false;
        for (var j = 0; j < tds.length; j++) {
          var cellContent = tds[j].textContent || tds[j].innerText;
          if (cellContent.toUpperCase().indexOf(filter) > -1) {
            found = true;
            break;
          }
        }
        trs[i].style.display = found ? "" : "none";
      }
    });
});

// kode untuk add denah gedung
document
  .getElementById("addDenahForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    var nama_gedung = document.getElementById("nama").value;
    var CctvId = document.getElementById("CctvId").value;
    var url1 = document.getElementById("url1").value;
    var url2 = document.getElementById("url2").value;
    var url3 = document.getElementById("url3").value;
    var url4 = document.getElementById("url4").value;
    var url5 = document.getElementById("url5").value;
    var url6 = document.getElementById("url6").value;

    var data = {
      nama_gedung: nama_gedung,
      CctvId: CctvId,
      url1: url1,
      url2: url2,
      url3: url3,
      url4: url4,
      url5: url5,
      url6: url6,
    };

    fetch("/cctvgedung", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Data successfully submitted");
        var myModalEl = document.getElementById("addDenahModal");
        var modal = bootstrap.Modal.getInstance(myModalEl);
        modal.hide();
        location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred");
      });
  });

//   kode untuk edit denah gedung
document.querySelector("#denah-tbody").addEventListener("click", function (e) {
  var editButton = e.target.closest(".edit-button");
  if (editButton) {
    var row = editButton.closest("tr");
    var id = row.querySelector(".id").textContent;
    var nama = row.querySelector(".nama").textContent;
    var CctvId = row.querySelector(".cctv-id").textContent;
    var url1 = row.querySelector(".url1").textContent;
    var url2 = row.querySelector(".url2").textContent;
    var url3 = row.querySelector(".url3").textContent;
    var url4 = row.querySelector(".url4").textContent;
    var url5 = row.querySelector(".url5").textContent;
    var url6 = row.querySelector(".url6").textContent;

    document.getElementById("edit-id").value = id;
    document.getElementById("edit-nama").value = nama;
    document.getElementById("edit-CctvId").value = CctvId;
    document.getElementById("edit-url1").value = url1;
    document.getElementById("edit-url2").value = url2;
    document.getElementById("edit-url3").value = url3;
    document.getElementById("edit-url4").value = url4;
    document.getElementById("edit-url5").value = url5;
    document.getElementById("edit-url6").value = url6;
  }
});

document.getElementById("editDenahForm").addEventListener("submit", function (e) {
    e.preventDefault();

    var id = document.getElementById("edit-id").value;
    var nama_gedung = document.getElementById("edit-nama").value;
    var CctvId = document.getElementById("edit-CctvId").value;
    var url1 = document.getElementById("edit-url1").value;
    var url2 = document.getElementById("edit-url2").value;
    var url3 = document.getElementById("edit-url3").value;
    var url4 = document.getElementById("edit-url4").value;
    var url5 = document.getElementById("edit-url5").value;
    var url6 = document.getElementById("edit-url6").value;

    var data = {
        nama_gedung: nama_gedung,
        CctvId: CctvId,
        url1: url1,
        url2: url2,
        url3: url3,
        url4: url4,
        url5: url5,
        url6: url6,
    };

    fetch("/cctvgedung/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Data successfully updated");
        var myModalEl = document.getElementById("editDenahModal");
        var modal = bootstrap.Modal.getInstance(myModalEl);
        modal.hide();
        location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred");
      });
  });

//   kode untuk delete denah
document.querySelector("#denah-tbody").addEventListener("click", function (e) {
  var deleteButton = e.target.closest(".delete-button");
  if (deleteButton) {
    var row = deleteButton.closest("tr");
    var id = row.querySelector(".id").textContent;
    document.getElementById("delete-id").value = id;
  }
});

document
  .getElementById("deleteDenahForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    var id = document.getElementById("delete-id").value;

    fetch("/cctvgedung/" + id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Data successfully deleted");
        var myModalEl = document.getElementById("deleteDenahModal");
        var modal = bootstrap.Modal.getInstance(myModalEl);
        modal.hide();
        location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred");
      });
  });

// kode untuk add cctv room
document
  .getElementById("addCctvRoomForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    var content = document.getElementById("cctvroom-content").value;
    var nama = document.getElementById("cctvroom-nama").value;
    var url = document.getElementById("cctvroom-url").value;
    var x = document.getElementById("x").value;
    var y = document.getElementById("y").value;
    var lantai = document.getElementById("lantai").value;
    var CctvId = document.getElementById("room-cctvId").value;

    var data = {
      content: content,
      nama: nama,
      url: url,
      x: x,
      y: y,
      lantai: lantai,
      CctvId: CctvId,
    };

    fetch("/cctvroom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Data successfully submitted");
        var myModalEl = document.getElementById("addCctvRoomModal");
        var modal = bootstrap.Modal.getInstance(myModalEl);
        modal.hide();
        location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred");
      });
  });

// kode untuk edit cctv room
function editCctvRoom(){
    document.querySelector("#cctvRoom-tbody").addEventListener("click", function (e) {
      var editButton = e.target.closest(".editCctvRoom-button");
      if (editButton) {
        var row = editButton.closest("tr");
        var id = row.querySelector(".CctvRoom-id").textContent;
        var content = row.querySelector(".CctvRoom-content").textContent;
        var nama = row.querySelector(".CctvRoom-nama").textContent;
        var url = row.querySelector(".CctvRoom-url").textContent;
        var x = row.querySelector(".CctvRoom-x").textContent;
        var y = row.querySelector(".CctvRoom-y").textContent;
        var lantai = row.querySelector(".CctvRoom-lantai").textContent;
        var CctvId = row.querySelector(".CctvRoom-CctvId").textContent;

        document.getElementById("edit-room-id").value = id;
        document.getElementById("edit-cctvroom-content").value = content;
        document.getElementById("edit-cctvroom-nama").value = nama;
        document.getElementById("edit-cctvroom-url").value = url;
        document.getElementById("edit-x").value = x;
        document.getElementById("edit-y").value = y;
        document.getElementById("edit-lantai").value = lantai;
        document.getElementById("edit-room-cctvId").value = CctvId;
      }
    });

    document.getElementById("editCctvRoomForm").addEventListener("submit", function (e) {
      e.preventDefault();
  
      var id = document.getElementById("edit-room-id").value;
      var content = document.getElementById("edit-cctvroom-content").value;
      var nama = document.getElementById("edit-cctvroom-nama").value;
      var url = document.getElementById("edit-cctvroom-url").value;
      var x = document.getElementById("edit-x").value;
      var y = document.getElementById("edit-y").value;
      var lantai = document.getElementById("edit-lantai").value;
      var CctvId = document.getElementById("edit-room-cctvId").value;
  
      var data = {
          content: content,
          nama: nama,
          url: url,
          x: x,
          y: y,
          lantai: lantai,
          CctvId: CctvId,
      };
  
      fetch("/cctvroom/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          alert("Data successfully updated");
          var myModalEl = document.getElementById("editCctvRoomModal");
          var modal = bootstrap.Modal.getInstance(myModalEl);
          modal.hide();
          location.reload();
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred");
        });
    });
}

// kode untuk delete cctv room
function deleteCctvRoom(){
    document.querySelector("#cctvRoom-tbody").addEventListener("click", function (e) {
      var deleteButton = e.target.closest(".deleteCctvRoom-button");
      if (deleteButton) {
        var row = deleteButton.closest("tr");
        var id = row.querySelector(".CctvRoom-id").textContent;
        document.getElementById("delete-room-id").value = id;
      }
    });
  
    document
      .getElementById("deleteCctvRoomForm")
      .addEventListener("submit", function (e) {
        e.preventDefault();
  
        var id = document.getElementById("delete-room-id").value;
  
        fetch("/cctvroom/" + id, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
            alert("Data successfully deleted");
            var myModalEl = document.getElementById("deleteCctvRoomModal");
            var modal = bootstrap.Modal.getInstance(myModalEl);
            modal.hide();
            location.reload();
          })
          .catch((error) => {
            console.error("Error:", error);
            alert("An error occurred");
          });
      });
}

