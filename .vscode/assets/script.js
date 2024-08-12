document.addEventListener('DOMContentLoaded', () => {
  const searchHistory = document.getElementById('search-history');
  const deleteModal = document.getElementById('delete-modal');
  let itemToDelete = null;

  // Function to add search items to the history
  function addSearchItem(itemText) {
    const listItem = document.createElement('li');
    listItem.classList.add('flex', 'justify-between', 'items-center', 'bg-blue-500', 'text-white', 'p-2', 'rounded');
    listItem.innerHTML = `
      <span>${itemText}</span>
      <button class="delete-item">
        <i class="fas fa-trash-alt"></i>
      </button>
    `;
    searchHistory.appendChild(listItem);

    // Attach delete event listener
    listItem.querySelector('.delete-item').addEventListener('click', () => {
      itemToDelete = listItem;
      openModal();
    });
  }

  // Function to open the modal
  function openModal() {
    deleteModal.classList.remove('hidden');
  }

  // Function to close the modal
  function closeModal() {
    deleteModal.classList.add('hidden');
    itemToDelete = null;
  }

  // Add event listeners to modal buttons
  document.getElementById('cancel-delete').addEventListener('click', closeModal);

  document.getElementById('confirm-delete').addEventListener('click', () => {
    if (itemToDelete) {
      searchHistory.removeChild(itemToDelete);
      closeModal();
    }
  });

  // Add search form submit event listener
  document.getElementById('search-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value.trim();
    if (searchText !== '') {
      const source = document.querySelector('input[name="radioSource"]:checked').value;
      addSearchItem(`${searchText} (${source})`);
      searchInput.value = '';
    }
  });
});