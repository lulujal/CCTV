
document.addEventListener('DOMContentLoaded', function() {
    const entriesSelect = document.getElementById('entries');
    const paginationUl = document.getElementById('pagination');
    paginationUl.style.zIndex = '1';
    paginationUl.style.position = 'static';
  
    entriesSelect.addEventListener('change', function() {
      fetch('/admin')
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
      const tablebody = document.querySelector('#user-tbody');
      let newTableBody = '';
      data.forEach((user) => {
        newTableBody += `
          <tr>
            <td class="id">${user.id}</td>
            <td class="username">${user.username}</td>
            <td class="password">${user.password}</td>
            <td class="role">${user.role}</td>
            <td>
            <div class="d-flex justify-content-around">
            <a class="btn btn-success btn-sm edit-button" data-bs-toggle="modal" data-bs-target="#editUserModal" style="margin-right:5px;" >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
              </svg>
            </a>
            <a class="btn btn-danger btn-sm delete-button" data-bs-toggle="modal" data-bs-target="#deleteUserModal" style="margin-right:5px;">
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
    document.getElementById('search-user').addEventListener('input', function(e) {
        var input = e.target;
        var filter = input.value.toUpperCase();
        var tbody = document.getElementById('user-tbody');
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

  // kode untuk add user
    document.getElementById('addUserForm').addEventListener('submit', function(e) {
      e.preventDefault(); 
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        var role = document.getElementById('role').value;
    
      var data = {
        username: username,
        password: password,
        role: role,
      };
    
      fetch('/admin', {
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
        var myModalEl = document.getElementById('addUserModal');
        var modal = bootstrap.Modal.getInstance(myModalEl);
        modal.hide();
        location.reload();
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred');
      });
    });

    // kode untuk edit user
    document.querySelector('#user-tbody').addEventListener('click', function(e) {
        var editButton = e.target.closest('.edit-button');
        if (editButton) {
          var row = editButton.closest('tr');
          var id = row.querySelector('.id').textContent;
          var username = row.querySelector('.username').textContent;
          var password = row.querySelector('.password').textContent;
          var role = row.querySelector('.role').textContent;

          document.getElementById('edit-UserId').value = id;
          document.getElementById('edit-username').value = username;
          document.getElementById('edit-password').value = password;
          document.getElementById('edit-role').value = role;
        }
    });

    document.getElementById('editUserForm').addEventListener('submit', function(e) {
        e.preventDefault();
        var id = document.getElementById('edit-UserId').value;
        var username = document.getElementById('edit-username').value;
        var password = document.getElementById('edit-password').value;
        var role = document.getElementById('edit-role').value;
    
        var data = {
            username: username,
            password: password,
            role: role,
        };
    
        fetch(`/admin/${id}`, {
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
            var myModalEl = document.getElementById('editUserModal');
            var modal = bootstrap.Modal.getInstance(myModalEl);
            modal.hide();
            location.reload();
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('An error occurred');
        });
    })

    // kode untuk delete user
    document.querySelector('#user-tbody').addEventListener('click', function(e) {
        var deleteButton = e.target.closest('.delete-button');
        if (deleteButton) {
          var row = deleteButton.closest('tr');
          var id = row.querySelector('.id').textContent;
          document.getElementById('delete-UserId').value = id;
        }
    });

    document.getElementById('deleteUserForm').addEventListener('submit', function(e) {
        e.preventDefault();
        var id = document.getElementById('delete-UserId').value;
    
        fetch(`/admin/${id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Data successfully deleted');
            var myModalEl = document.getElementById('deleteUserModal');
            var modal = bootstrap.Modal.getInstance(myModalEl);
            modal.hide();
            location.reload();
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('An error occurred');
        });
    });