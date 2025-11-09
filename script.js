//your JS code here. If required.
const output = document.getElementById("output");

// Step 1: Show initial "Loading..." row
const loadingRow = document.createElement("tr");
loadingRow.innerHTML = `<td colspan="2" class="text-center">Loading...</td>`;
output.appendChild(loadingRow);

// Utility function to generate a random delay between 1 and 3 seconds
function randomDelay() {
  return Math.random() * 2000 + 1000; // in milliseconds
}

// Utility function to create a promise that resolves after randomDelay
function createPromise(name) {
  const delay = randomDelay();
  const startTime = performance.now();
  return new Promise((resolve) => {
    setTimeout(() => {
      const endTime = performance.now();
      const timeTaken = ((endTime - startTime) / 1000).toFixed(3);
      resolve({ name, timeTaken: parseFloat(timeTaken) });
    }, delay);
  });
}

// Step 2: Create three promises
const promises = [
  createPromise("Promise 1"),
  createPromise("Promise 2"),
  createPromise("Promise 3"),
];

// Step 3: Wait for all promises to resolve
Promise.all(promises).then((results) => {
  // Remove loading row
  output.innerHTML = "";

  // Add each promise result to table
  results.forEach((result) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${result.name}</td><td>${result.timeTaken.toFixed(3)}</td>`;
    output.appendChild(row);
  });

  // Calculate total (max of all times)
  const totalTime = Math.max(...results.map((r) => r.timeTaken)).toFixed(3);
  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `<td>Total</td><td>${totalTime}</td>`;
  output.appendChild(totalRow);
});
